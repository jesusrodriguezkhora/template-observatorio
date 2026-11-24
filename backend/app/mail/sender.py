import logging
from functools import lru_cache

from app.config import get_settings
from app.mail.base import Mailer, Message
from app.mail.console import ConsoleMailer
from app.mail.noreply import NoreplyMailer

logger = logging.getLogger("app.mail")


def _noreply() -> Mailer:
    settings = get_settings()
    return NoreplyMailer(settings.noreply_api_url, settings.mail_timeout_seconds)


MAILERS = {
    "console": ConsoleMailer,
    "noreply": _noreply,
}


@lru_cache
def get_mailer() -> Mailer:
    return MAILERS[get_settings().mail_backend]()


def send_mail(message: Message) -> bool:
    try:
        get_mailer().send(message)
        return True
    except Exception:
        logger.exception("No se pudo enviar el correo a %s", message.to)
        return False