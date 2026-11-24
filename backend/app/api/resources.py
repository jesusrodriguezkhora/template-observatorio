from dataclasses import dataclass, field

from sqlalchemy.orm import InstrumentedAttribute, selectinload
from sqlalchemy.orm.interfaces import LoaderOption

from app.models import Area, Base, Proyecto, Subtema, Tema
from app.schemas.catalogos import AreaOut, SubtemaOut, TemaOut
from app.schemas.proyectos import ProyectoDetalleOut, ProyectoOut
from app.schemas.types import ApiModel


@dataclass(frozen=True)
class Resource:
    model: type[Base]
    schema: type[ApiModel]
    detail_schema: type[ApiModel] | None = None
    filters: dict[str, InstrumentedAttribute] = field(default_factory=dict)
    order_by: tuple[InstrumentedAttribute, ...] = ()
    detail_options: tuple[LoaderOption, ...] = ()


RESOURCES: dict[str, Resource] = {
    "areas": Resource(model=Area, schema=AreaOut, order_by=(Area.nombre,)),
    "temas": Resource(model=Tema, schema=TemaOut, order_by=(Tema.nombre,)),
    "subtemas": Resource(
        model=Subtema,
        schema=SubtemaOut,
        filters={"tema": Subtema.tema_id},
        order_by=(Subtema.nombre,),
    ),
    "proyectos": Resource(
        model=Proyecto,
        schema=ProyectoOut,
        detail_schema=ProyectoDetalleOut,
        filters={"area": Proyecto.area_id},
        order_by=(Proyecto.id,),
        detail_options=(selectinload(Proyecto.objetivos),),
    ),
}