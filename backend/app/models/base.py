from datetime import UTC, datetime

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, MetaData
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

NAMING_CONVENTION = {
    "pk": "pk_%(table_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ix": "ix_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
}


class Base(DeclarativeBase):
    metadata = MetaData(naming_convention=NAMING_CONVENTION)


def utc_now() -> datetime:
    return datetime.now(UTC)


class ControlColumns:
    actualizado_en: Mapped[datetime] = mapped_column(
        DateTime, default=utc_now, onupdate=utc_now
    )
    actualizado_por: Mapped[int | None] = mapped_column(
        ForeignKey("usuarios.id", ondelete="SET NULL")
    )


def max_length(column: str, length: int) -> CheckConstraint:
    return CheckConstraint(f"length({column}) <= {length}", name=f"{column}_max_length")


def not_negative(column: str) -> CheckConstraint:
    return CheckConstraint(f"{column} >= 0", name=f"{column}_not_negative")


def one_of(column: str, values: tuple[str, ...]) -> CheckConstraint:
    options = ", ".join(f"'{value}'" for value in values)
    return CheckConstraint(f"{column} IN ({options})", name=f"{column}_one_of")


def iso_date(column: str) -> CheckConstraint:
    return CheckConstraint(
        f"{column} = date({column})", name=f"{column}_iso_date"
    ).ddl_if(dialect="sqlite")


def hex_color(column: str) -> CheckConstraint:
    pattern = "#" + "[0-9A-Fa-f]" * 6
    return CheckConstraint(
        f"{column} GLOB '{pattern}'", name=f"{column}_hex_color"
    ).ddl_if(dialect="sqlite")


def boolean(column: str) -> CheckConstraint:
    return CheckConstraint(f"{column} IN (0, 1)", name=f"{column}_boolean").ddl_if(
        dialect="sqlite"
    )