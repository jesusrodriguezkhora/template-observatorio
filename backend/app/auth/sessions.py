import hashlib
import secrets
from datetime import UTC, datetime, timedelta

from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.config import get_settings
from app.models import Sesion, Usuario


def _hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def _now() -> datetime:
    return datetime.now(UTC).replace(tzinfo=None)


def create_session(db: Session, user: Usuario) -> str:
    token = secrets.token_urlsafe(32)
    hours = get_settings().session_hours
    db.execute(delete(Sesion).where(Sesion.expira_en <= _now()))
    db.add(
        Sesion(
            token_hash=_hash_token(token),
            usuario_id=user.id,
            expira_en=_now() + timedelta(hours=hours),
        )
    )
    user.ultimo_acceso = _now()
    db.commit()
    return token


def get_session_user(db: Session, token: str | None) -> Usuario | None:
    if not token:
        return None
    statement = (
        select(Usuario)
        .join(Sesion, Sesion.usuario_id == Usuario.id)
        .where(
            Sesion.token_hash == _hash_token(token),
            Sesion.expira_en > _now(),
            Usuario.activo.is_(True),
        )
    )
    return db.scalar(statement)


def delete_session(db: Session, token: str | None) -> None:
    if token:
        db.execute(delete(Sesion).where(Sesion.token_hash == _hash_token(token)))
        db.commit()