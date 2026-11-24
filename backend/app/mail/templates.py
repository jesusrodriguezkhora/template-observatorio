from html import escape

from app.config import get_settings
from app.mail.base import Message


def password_reset(to: str, nombre: str, link: str, minutes: int) -> Message:
    app_name = escape(get_settings().app_name)
    return Message(
        to=to,
        subject=f"{get_settings().app_name}: restablece tu contraseña",
        html=f"""\
<p>Hola, {escape(nombre)}:</p>
<p>Hemos recibido una solicitud para restablecer tu contraseña en
<strong>{app_name}</strong>.</p>
<p><a href="{escape(link)}">Crear una contraseña nueva</a></p>
<p>El enlace caduca en {minutes} minutos y solo se puede usar una vez.</p>
<p>Si no lo has pedido tú, ignora este correo: tu contraseña no cambiará.</p>
""",
    )