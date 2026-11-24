from typing import Annotated

from pydantic import BaseModel, BeforeValidator, ConfigDict


def cents_to_euros(value: int | None) -> float | None:
    return None if value is None else value / 100


Euros = Annotated[float | None, BeforeValidator(cents_to_euros)]


class ApiModel(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)