from collections.abc import Sequence
from typing import Annotated

from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.auth.sessions import get_session_user
from app.config import get_settings
from app.db import get_session
from app.models import Usuario


def get_session_token(request: Request) -> str | None:
    return request.cookies.get(get_settings().session_cookie_name)


def get_current_user(
    request: Request, db: Annotated[Session, Depends(get_session)]
) -> Usuario:
    user = get_session_user(db, get_session_token(request))
    if user is None:
        raise HTTPException(status_code=401, detail="Sesión no iniciada o caducada")
    return user


CurrentUser = Annotated[Usuario, Depends(get_current_user)]

def require_roles(roles: Sequence[str]):
    def check_role(user: CurrentUser) -> Usuario:
        if roles and user.rol != get_settings().super_role and user.rol not in roles:
            raise HTTPException(
                status_code=403, detail="No tienes permiso para este recurso"
            )
        return user

    return check_role