from datetime import timedelta

from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.auth.tokens import hash_token, new_token, utc_now
from app.config import get_settings
from app.models import Sesion, Usuario


def create_session(db: Session, user: Usuario) -> str:
    token = new_token()
    hours = get_settings().session_hours
    db.execute(delete(Sesion).where(Sesion.expira_en <= utc_now()))
    db.add(
        Sesion(
            token_hash=hash_token(token),
            usuario_id=user.id,
            expira_en=utc_now() + timedelta(hours=hours),
        )
    )
    user.ultimo_acceso = utc_now()
    db.commit()
    return token


def get_session_user(db: Session, token: str | None) -> Usuario | None:
    if not token:
        return None
    statement = (
        select(Usuario)
        .join(Sesion, Sesion.usuario_id == Usuario.id)
        .where(
            Sesion.token_hash == hash_token(token),
            Sesion.expira_en > utc_now(),
            Usuario.activo.is_(True),
        )
    )
    return db.scalar(statement)


def delete_session(db: Session, token: str | None) -> None:
    if token:
        db.execute(delete(Sesion).where(Sesion.token_hash == hash_token(token)))
        db.commit()


def delete_user_sessions(db: Session, user: Usuario) -> None:
    db.execute(delete(Sesion).where(Sesion.usuario_id == user.id))