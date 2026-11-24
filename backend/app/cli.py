"""Gestión de usuarios desde la terminal.

Uso (desde backend/):
    python -m app.cli crear-usuario --email admin@ayto.es --nombre "Ana" --rol administracion
"""

import argparse
import getpass
import sys

from sqlalchemy import func, select

from app.auth.passwords import MIN_PASSWORD_LENGTH, hash_password
from app.config import get_settings
from app.db import SessionLocal
from app.models import Usuario


def _ask_password() -> str:
    password = getpass.getpass("Contraseña: ")
    if len(password) < MIN_PASSWORD_LENGTH:
        raise SystemExit(
            f"La contraseña debe tener al menos {MIN_PASSWORD_LENGTH} caracteres."
        )
    if getpass.getpass("Repite la contraseña: ") != password:
        raise SystemExit("Las contraseñas no coinciden.")
    return password


def create_user(email: str, nombre: str, rol: str) -> int:
    roles = get_settings().roles
    if rol not in roles:
        raise SystemExit(f"Rol desconocido: {rol}. Roles válidos: {', '.join(roles)}")

    email = email.strip().lower()
    with SessionLocal() as db:
        exists = db.scalar(select(Usuario.id).where(func.lower(Usuario.email) == email))
        if exists:
            raise SystemExit(f"Ya existe un usuario con el correo {email}.")
        db.add(
            Usuario(
                email=email,
                nombre=nombre.strip(),
                rol=rol,
                password_hash=hash_password(_ask_password()),
            )
        )
        db.commit()
    print(f"Usuario {email} creado con rol {rol}.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(prog="python -m app.cli")
    commands = parser.add_subparsers(dest="command", required=True)

    create = commands.add_parser("crear-usuario", help="Crea un usuario")
    create.add_argument("--email", required=True)
    create.add_argument("--nombre", required=True)
    create.add_argument("--rol", required=True)

    args = parser.parse_args()
    if args.command == "crear-usuario":
        return create_user(args.email, args.nombre, args.rol)
    return 1


if __name__ == "__main__":
    sys.exit(main())