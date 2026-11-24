from datetime import datetime

from sqlalchemy import CheckConstraint, ForeignKey, Index, text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, boolean, one_of, utc_now

TIPOS_DOCUMENTO = ("foto", "documento")
ESTADOS_DOCUMENTO = ("pendiente", "subido")

positive_size = CheckConstraint("tamano_bytes > 0", name="tamano_bytes_positive")


class Documento(Base):
    __tablename__ = "documentos"
    __table_args__ = (
        one_of("tipo", TIPOS_DOCUMENTO),
        one_of("estado", ESTADOS_DOCUMENTO),
        boolean("es_portada"),
        positive_size,
        Index("ix_documentos_registro", "entidad", "registro"),
        Index(
            "uq_documentos_portada",
            "entidad",
            "registro",
            unique=True,
            sqlite_where=text("es_portada = 1"),
            postgresql_where=text("es_portada"),
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    entidad: Mapped[str]
    registro: Mapped[str]
    tipo: Mapped[str]
    nombre: Mapped[str]
    clave_objeto: Mapped[str] = mapped_column(unique=True)
    mime: Mapped[str]
    tamano_bytes: Mapped[int]
    es_portada: Mapped[bool] = mapped_column(default=False)
    estado: Mapped[str] = mapped_column(default="pendiente")
    subido_por: Mapped[int | None] = mapped_column(
        ForeignKey("usuarios.id", ondelete="SET NULL")
    )
    subido_en: Mapped[datetime] = mapped_column(default=utc_now)