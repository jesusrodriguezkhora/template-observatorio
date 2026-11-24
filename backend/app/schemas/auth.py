from pydantic import BaseModel, Field

from app.auth.passwords import MIN_PASSWORD_LENGTH
from app.schemas.types import ApiModel


class LoginIn(BaseModel):
    email: str = Field(min_length=3, max_length=254)
    password: str = Field(min_length=1, max_length=1024)


class UserOut(ApiModel):
    id: int
    nombre: str
    email: str
    role: str = Field(validation_alias="rol")


class SessionOut(BaseModel):
    user: UserOut

class PasswordResetIn(BaseModel):
    email: str = Field(min_length=3, max_length=254)


class PasswordResetConfirmIn(BaseModel):
    token: str = Field(min_length=10, max_length=200)
    password: str = Field(min_length=MIN_PASSWORD_LENGTH, max_length=1024)