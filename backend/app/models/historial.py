from datetime import datetime
from typing import Any

from sqlalchemy import JSON, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, one_of, utc_now

ESTADOS_IMPORTACION = ("previsualizada", "aplicada", "descartada", "fallida")
ORIGENES_CAMBIO = ("excel", "app")


class Importacion(Base):
    __tablename__ = "importaciones"
    __table_args__ = (one_of("estado", ESTADOS_IMPORTACION),)

    id: Mapped[int] = mapped_column(primary_key=True)
    fichero: Mapped[str]
    clave_objeto: Mapped[str | None]
    estado: Mapped[str] = mapped_column(default="previsualizada")
    resumen: Mapped[dict[str, Any] | None] = mapped_column(JSON)
    version_base: Mapped[datetime | None]
    creada_por: Mapped[int | None] = mapped_column(
        ForeignKey("usuarios.id", ondelete="SET NULL")
    )
    creada_en: Mapped[datetime] = mapped_column(default=utc_now)
    aplicada_en: Mapped[datetime | None]


class Cambio(Base):
    __tablename__ = "cambios"
    __table_args__ = (
        one_of("origen", ORIGENES_CAMBIO),
        Index("ix_cambios_registro", "tabla", "registro"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    tabla: Mapped[str]
    registro: Mapped[str]
    campo: Mapped[str]
    valor_anterior: Mapped[str | None]
    valor_nuevo: Mapped[str | None]
    origen: Mapped[str]
    importacion_id: Mapped[int | None] = mapped_column(
        "importacion", ForeignKey("importaciones.id", ondelete="SET NULL")
    )
    usuario_id: Mapped[int | None] = mapped_column(
        "usuario", ForeignKey("usuarios.id", ondelete="SET NULL")
    )
    fecha: Mapped[datetime] = mapped_column(default=utc_now)