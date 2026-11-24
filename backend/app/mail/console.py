import logging

from app.mail.base import Message

logger = logging.getLogger("app.mail")


class ConsoleMailer:
    def send(self, message: Message) -> None:
        logger.warning(
            "Correo (no enviado, MAIL_BACKEND=console)\n"
            "Para: %s\nAsunto: %s\n%s",
            message.to,
            message.subject,
            message.html,
        )