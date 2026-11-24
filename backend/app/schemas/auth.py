from pydantic import BaseModel, Field

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