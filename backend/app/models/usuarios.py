from datetime import datetime

from sqlalchemy import ForeignKey, Index, func
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, boolean, utc_now


class Usuario(Base):
    __tablename__ = "usuarios"
    __table_args__ = (
        Index("uq_usuarios_email", func.lower("email"), unique=True),
        boolean("activo"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str]
    nombre: Mapped[str]
    password_hash: Mapped[str]
    rol: Mapped[str]
    activo: Mapped[bool] = mapped_column(default=True)
    creado_en: Mapped[datetime] = mapped_column(default=utc_now)
    ultimo_acceso: Mapped[datetime | None]


class Sesion(Base):
    __tablename__ = "sesiones"

    token_hash: Mapped[str] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(
        "usuario", ForeignKey("usuarios.id", ondelete="CASCADE"), index=True
    )
    creada_en: Mapped[datetime] = mapped_column(default=utc_now)
    expira_en: Mapped[datetime]


class RestablecimientoContrasena(Base):
    __tablename__ = "restablecimientos_contrasena"

    token_hash: Mapped[str] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(
        "usuario", ForeignKey("usuarios.id", ondelete="CASCADE"), index=True
    )
    creado_en: Mapped[datetime] = mapped_column(default=utc_now)
    expira_en: Mapped[datetime]
    usado_en: Mapped[datetime | None]