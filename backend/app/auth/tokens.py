import hashlib
import secrets
from datetime import UTC, datetime


def new_token() -> str:
    return secrets.token_urlsafe(32)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def utc_now() -> datetime:
    return datetime.now(UTC).replace(tzinfo=None)