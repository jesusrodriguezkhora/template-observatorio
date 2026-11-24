from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class Message:
    to: str
    subject: str
    html: str


class Mailer(Protocol):
    def send(self, message: Message) -> None: ...