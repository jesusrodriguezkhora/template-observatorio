from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.resources import RESOURCES, Resource
from app.auth.dependencies import require_roles
from app.config import get_settings
from app.db import get_session

SessionDep = Annotated[Session, Depends(get_session)]


def _filter_conditions(resource: Resource, request: Request) -> list:
    unknown = set(request.query_params) - set(resource.filters)
    if unknown:
        allowed = ", ".join(sorted(resource.filters)) or "ninguno"
        raise HTTPException(
            status_code=400,
            detail=f"Filtros no permitidos: {', '.join(sorted(unknown))}. "
            f"Permitidos: {allowed}",
        )
    return [
        resource.filters[name].in_(request.query_params.getlist(name))
        for name in request.query_params
    ]


def _list_endpoint(resource: Resource):
    def list_rows(request: Request, session: SessionDep):
        statement = (
            select(resource.model)
            .where(*_filter_conditions(resource, request))
            .order_by(*resource.order_by)
        )
        return session.scalars(statement).all()

    return list_rows


def _detail_endpoint(name: str, resource: Resource):
    def get_row(id: str, session: SessionDep):
        row = session.get(resource.model, id, options=resource.detail_options)
        if row is None:
            raise HTTPException(status_code=404, detail=f"{name}/{id} no existe")
        return row

    return get_row

def _check_roles(name: str, resource: Resource) -> None:
    unknown = set(resource.roles) - set(get_settings().roles)
    if unknown:
        raise RuntimeError(f"Recurso {name}: roles desconocidos {sorted(unknown)}")

def build_router() -> APIRouter:
    router = APIRouter()
    for name, resource in RESOURCES.items():
        _check_roles(name, resource)
        guard = [Depends(require_roles(resource.roles))]
        router.add_api_route(
            f"/{name}",
            _list_endpoint(resource),
            methods=["GET"],
            response_model=list[resource.schema],
            name=f"list_{name}",
            tags=[name],
            dependencies=guard,
        )
        router.add_api_route(
            f"/{name}/{{id}}",
            _detail_endpoint(name, resource),
            methods=["GET"],
            response_model=resource.detail_schema or resource.schema,
            name=f"get_{name}",
            tags=[name],
            dependencies=guard,
        )
    return router