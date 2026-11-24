from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, Response, BackgroundTasks
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.auth.dependencies import CurrentUser, get_session_token
from app.auth.passwords import verify_password
from app.auth.sessions import create_session, delete_session
from app.config import get_settings
from app.db import get_session
from app.models import Usuario
from app.schemas.auth import LoginIn, SessionOut, PasswordResetConfirmIn, PasswordResetIn
from app.auth.password_reset import confirm_reset, create_reset
from app.mail import send_mail

router = APIRouter(prefix="/auth", tags=["auth"])

SessionDep = Annotated[Session, Depends(get_session)]
INVALID_CREDENTIALS = "Correo o contraseña incorrectos"


def _set_session_cookie(response: Response, token: str) -> None:
    settings = get_settings()
    response.set_cookie(
        key=settings.session_cookie_name,
        value=token,
        max_age=settings.session_hours * 3600,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        path="/",
    )


@router.post("/login", response_model=SessionOut)
def login(data: LoginIn, response: Response, db: SessionDep):
    email = data.email.strip().lower()
    user = db.scalar(select(Usuario).where(func.lower(Usuario.email) == email))
    password_hash = user.password_hash if user and user.activo else None
    if not verify_password(data.password, password_hash):
        raise HTTPException(status_code=401, detail=INVALID_CREDENTIALS)

    _set_session_cookie(response, create_session(db, user))
    return {"user": user}


@router.post("/logout", status_code=204)
def logout(request: Request, response: Response, db: SessionDep) -> None:
    delete_session(db, get_session_token(request))
    settings = get_settings()
    response.delete_cookie(
        key=settings.session_cookie_name,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        path="/",
    )


@router.get("/me", response_model=SessionOut)
def me(user: CurrentUser):
    return {"user": user}


@router.post("/password-reset", status_code=202)
def request_password_reset(
    data: PasswordResetIn, background: BackgroundTasks, db: SessionDep
) -> None:
    message = create_reset(db, data.email)
    if message is not None:
        background.add_task(send_mail, message)


@router.post("/password-reset/confirm", status_code=204)
def confirm_password_reset(data: PasswordResetConfirmIn, db: SessionDep) -> None:
    if not confirm_reset(db, data.token, data.password):
        raise HTTPException(
            status_code=400, detail="El enlace no es válido o ha caducado"
        )