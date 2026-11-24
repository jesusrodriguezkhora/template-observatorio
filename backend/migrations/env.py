import warnings

from alembic import context
from sqlalchemy import create_engine, pool, text

from app.config import get_settings
from app.db import ensure_sqlite_folder
from app.models import Base

settings = get_settings()

# Los índices sobre expresiones (uq_usuarios_email) no se pueden comparar en
# SQLite; se crean a mano en la migración, así que el aviso no aporta nada.
warnings.filterwarnings("ignore", message=".*expression-based index.*")
target_metadata = Base.metadata


def _options() -> dict:
    return {
        "target_metadata": target_metadata,
        "render_as_batch": settings.is_sqlite,
        "compare_type": True,
    }


def _check_foreign_keys(connection) -> None:
    violations = connection.execute(text("PRAGMA foreign_key_check")).all()
    if violations:
        raise RuntimeError(f"La migración deja claves foráneas rotas: {violations}")


def run_migrations_offline() -> None:
    context.configure(
        url=settings.database_url,
        literal_binds=True,
        **_options(),
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    if settings.is_sqlite:
        ensure_sqlite_folder(settings.database_url)
    engine = create_engine(settings.database_url, poolclass=pool.NullPool)

    with engine.connect() as connection:
        context.configure(connection=connection, **_options())
        with context.begin_transaction():
            context.run_migrations()
            if settings.is_sqlite:
                _check_foreign_keys(connection)


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()