from datetime import date

from pydantic import Field, computed_field

from app.schemas.types import ApiModel, Euros


class ObjetivoProyectoOut(ApiModel):
    id: str
    descripcion: str
    orden: int


class ProyectoOut(ApiModel):
    id: str
    nombre: str
    nombre_corto: str | None
    programa: str
    descripcion: str
    area: str | None = Field(validation_alias="area_id")
    convocatoria: str | None
    porcentaje_cofinanciacion: float | None
    presupuesto_solicitado: Euros
    presupuesto_concedido: Euros
    feder_concedido: Euros
    presupuesto_adjudicado: Euros
    presupuesto_ejecutado: Euros
    presupuesto_declarado: Euros
    pendiente_justificar: Euros
    iva_financiable: bool
    fecha_inicio: date
    fecha_fin: date
    fecha_resolucion: date | None

    @computed_field
    @property
    def porcentaje_ejecucion(self) -> float | None:
        if not self.presupuesto_concedido or self.presupuesto_ejecutado is None:
            return None
        ratio = self.presupuesto_ejecutado / self.presupuesto_concedido * 100
        return round(ratio, 2)


class ProyectoDetalleOut(ProyectoOut):
    objetivos: list[ObjetivoProyectoOut]