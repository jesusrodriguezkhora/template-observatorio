from pwdlib import PasswordHash

_hasher = PasswordHash.recommended()

# Hash de una contraseña cualquiera, para gastar el mismo tiempo cuando el usuario no existe y no revelar qué correos están dados de alta.
_DUMMY_HASH = _hasher.hash("contraseña-inexistente")


def hash_password(password: str) -> str:
    return _hasher.hash(password)


def verify_password(password: str, password_hash: str | None) -> bool:
    if password_hash is None:
        _hasher.verify(password, _DUMMY_HASH)
        return False
    return _hasher.verify(password, password_hash)