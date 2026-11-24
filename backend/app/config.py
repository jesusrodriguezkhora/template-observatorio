from functools import lru_cache
from typing import Annotated

from pydantic import field_validator
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

    @field_validator("cors_origins", "roles", mode="before")
    @classmethod
    def split_csv(cls, value):
        if isinstance(value, str):
            return [item.strip() for item in value.split(",") if item.strip()]
        return value

    @property
    def is_sqlite(self) -> bool:
        return self.database_url.startswith("sqlite")


@lru_cache
def get_settings() -> Settings:
    return Settings()