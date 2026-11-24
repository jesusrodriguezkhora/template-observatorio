from datetime import timedelta
from urllib.parse import urlencode

from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from app.auth.passwords import hash_password
from app.auth.sessions import delete_user_sessions
from app.auth.tokens import hash_token, new_token, utc_now
from app.config import get_settings
from app.mail import Message
from app.mail.templates import password_reset
from app.models import RestablecimientoContrasena, Usuario

RESET_PATH = "/restablecer-contrasena"


def _recently_requested(db: Session, user: Usuario) -> bool:
    cooldown = timedelta(minutes=get_settings().password_reset_cooldown_minutes)
    last = db.scalar(
        select(func.max(RestablecimientoContrasena.creado_en)).where(
            RestablecimientoContrasena.usuario_id == user.id
        )
    )
    return last is not None and last > utc_now() - cooldown


def create_reset(db: Session, email: str) -> Message | None:
    settings = get_settings()
    user = db.scalar(
        select(Usuario).where(
            func.lower(Usuario.email) == email.strip().lower(),
            Usuario.activo.is_(True),
        )
    )
    if user is None or _recently_requested(db, user):
        return None

    db.execute(
        delete(RestablecimientoContrasena).where(
            RestablecimientoContrasena.usuario_id == user.id
        )
    )
    token = new_token()
    db.add(
        RestablecimientoContrasena(
            token_hash=hash_token(token),
            usuario_id=user.id,
            creado_en=utc_now(),
            expira_en=utc_now() + timedelta(minutes=settings.password_reset_minutes),
        )
    )
    db.commit()

    link = (
        f"{settings.frontend_url.rstrip('/')}{RESET_PATH}?{urlencode({'token': token})}"
    )
    return password_reset(
        user.email, user.nombre, link, settings.password_reset_minutes
    )


def confirm_reset(db: Session, token: str, password: str) -> bool:
    reset = db.scalar(
        select(RestablecimientoContrasena)
        .join(Usuario, Usuario.id == RestablecimientoContrasena.usuario_id)
        .where(
            RestablecimientoContrasena.token_hash == hash_token(token),
            RestablecimientoContrasena.usado_en.is_(None),
            RestablecimientoContrasena.expira_en > utc_now(),
            Usuario.activo.is_(True),
        )
    )
    if reset is None:
        return False

    user = db.get(Usuario, reset.usuario_id)
    user.password_hash = hash_password(password)
    reset.usado_en = utc_now()
    delete_user_sessions(db, user)
    db.commit()
    return True