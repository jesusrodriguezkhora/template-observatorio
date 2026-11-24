import json
import urllib.request

from app.mail.base import Message


class NoreplyMailer:
    def __init__(self, api_url: str, timeout: float) -> None:
        self.api_url = api_url
        self.timeout = timeout

    def send(self, message: Message) -> None:
        payload = {
            "to_email_address": message.to,
            "subject": message.subject,
            "html_body": message.html,
            "attachments": [],
        }
        request = urllib.request.Request(
            self.api_url,
            data=json.dumps(payload).encode(),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(request, timeout=self.timeout) as response:
            if response.status >= 300:
                raise RuntimeError(f"Noreply respondió {response.status}")