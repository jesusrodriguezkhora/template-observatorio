from datetime import date

from sqlalchemy import CheckConstraint, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import (
    Base,
    ControlColumns,
    boolean,
    iso_date,
    max_length,
    not_negative,
)
from app.models.catalogos import Area

IMPORTES = (
    "presupuesto_solicitado",
    "presupuesto_concedido",
    "feder_concedido",
    "presupuesto_adjudicado",
    "presupuesto_ejecutado",
    "presupuesto_declarado",
    "pendiente_justificar",
)


class Proyecto(ControlColumns, Base):
    __tablename__ = "proyectos"
    __table_args__ = (
        max_length("id", 10),
        max_length("nombre", 200),
        max_length("nombre_corto", 50),
        max_length("programa", 150),
        max_length("descripcion", 2000),
        max_length("convocatoria", 10),
        CheckConstraint(
            "porcentaje_cofinanciacion BETWEEN 0 AND 100",
            name="porcentaje_cofinanciacion_range",
        ),
        *(not_negative(importe) for importe in IMPORTES),
        boolean("iva_financiable"),
        iso_date("fecha_inicio"),
        iso_date("fecha_fin"),
        iso_date("fecha_resolucion"),
        CheckConstraint("fecha_fin >= fecha_inicio", name="fechas_ordenadas"),
    )

    id: Mapped[str] = mapped_column(String, primary_key=True)
    nombre: Mapped[str]
    nombre_corto: Mapped[str | None]
    programa: Mapped[str]
    descripcion: Mapped[str]
    area_id: Mapped[str | None] = mapped_column(
        "area", ForeignKey("areas.id", ondelete="RESTRICT"), index=True
    )
    convocatoria: Mapped[str | None]
    porcentaje_cofinanciacion: Mapped[float | None]

    # Importes en céntimos de euro.
    presupuesto_solicitado: Mapped[int | None]
    presupuesto_concedido: Mapped[int | None]
    feder_concedido: Mapped[int | None]

    # Importes calculados (no se cargan del Excel), en céntimos de euro.
    presupuesto_adjudicado: Mapped[int | None]
    presupuesto_ejecutado: Mapped[int | None]
    presupuesto_declarado: Mapped[int | None]
    pendiente_justificar: Mapped[int | None]

    iva_financiable: Mapped[bool]
    fecha_inicio: Mapped[date]
    fecha_fin: Mapped[date]
    fecha_resolucion: Mapped[date | None]

    area: Mapped[Area | None] = relationship()
    objetivos: Mapped[list["ObjetivoProyecto"]] = relationship(
        back_populates="proyecto",
        order_by="ObjetivoProyecto.orden",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


class ObjetivoProyecto(ControlColumns, Base):
    __tablename__ = "objetivos_proyecto"
    __table_args__ = (
        max_length("id", 10),
        max_length("descripcion", 1000),
        CheckConstraint("orden >= 1", name="orden_positive"),
    )

    proyecto_id: Mapped[str] = mapped_column(
        "proyecto",
        ForeignKey("proyectos.id", ondelete="CASCADE"),
        primary_key=True,
    )
    id: Mapped[str] = mapped_column(String, primary_key=True)
    descripcion: Mapped[str]
    orden: Mapped[int]

    proyecto: Mapped[Proyecto] = relationship(back_populates="objetivos")