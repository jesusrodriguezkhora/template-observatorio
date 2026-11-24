from functools import lru_cache
from typing import Annotated, Literal

from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Observatorio de proyectos"
    environment: str = "development"
    database_url: str = "sqlite:///data/observatorio.db"
    cors_origins: Annotated[list[str], NoDecode] = ["http://localhost:5173"]

    roles: Annotated[list[str], NoDecode] = ["administracion", "gestion", "politico"]
    super_role: str = "administracion"

    session_cookie_name: str = "observatorio_session"
    session_hours: int = 12
    cookie_secure: bool = True

    frontend_url: str = "http://localhost:5173"
    password_reset_minutes: int = 60
    password_reset_cooldown_minutes: int = 2

    mail_backend: Literal["console", "noreply"] = "console"
    noreply_api_url: str | None = None
    mail_timeout_seconds: float = 10

    @field_validator("cors_origins", "roles", mode="before")
    @classmethod
    def split_csv(cls, value):
        if isinstance(value, str):
            return [item.strip() for item in value.split(",") if item.strip()]
        return value

    @model_validator(mode="after")
    def check_mail(self):
        if self.mail_backend == "noreply" and not self.noreply_api_url:
            raise ValueError("MAIL_BACKEND=noreply necesita NOREPLY_API_URL")
        return self

    @property
    def is_sqlite(self) -> bool:
        return self.database_url.startswith("sqlite")


@lru_cache
def get_settings() -> Settings:
    return Settings()