from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, ControlColumns, hex_color, max_length


class Tema(ControlColumns, Base):
    __tablename__ = "temas"
    __table_args__ = (
        max_length("id", 5),
        max_length("nombre", 60),
        hex_color("color_fondo"),
        hex_color("color_texto"),
    )

    id: Mapped[str] = mapped_column(String, primary_key=True)
    nombre: Mapped[str]
    color_fondo: Mapped[str | None]
    color_texto: Mapped[str | None]


class Subtema(ControlColumns, Base):
    __tablename__ = "subtemas"
    __table_args__ = (
        max_length("id", 5),
        max_length("nombre", 60),
        hex_color("color_fondo"),
        hex_color("color_texto"),
    )

    id: Mapped[str] = mapped_column(String, primary_key=True)
    tema_id: Mapped[str] = mapped_column(
        "tema", ForeignKey("temas.id", ondelete="RESTRICT"), index=True
    )
    nombre: Mapped[str]
    color_fondo: Mapped[str | None]
    color_texto: Mapped[str | None]

    tema: Mapped[Tema] = relationship()


class Area(ControlColumns, Base):
    __tablename__ = "areas"
    __table_args__ = (
        max_length("id", 5),
        max_length("nombre", 100),
        max_length("responsable", 100),
    )

    id: Mapped[str] = mapped_column(String, primary_key=True)
    nombre: Mapped[str]
    responsable: Mapped[str]