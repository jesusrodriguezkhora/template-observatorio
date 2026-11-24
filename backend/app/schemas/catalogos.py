from pydantic import Field

from app.schemas.types import ApiModel


class AreaOut(ApiModel):
    id: str
    nombre: str
    responsable: str


class TemaOut(ApiModel):
    id: str
    nombre: str
    color_fondo: str | None
    color_texto: str | None


class SubtemaOut(TemaOut):
    tema: str = Field(validation_alias="tema_id")