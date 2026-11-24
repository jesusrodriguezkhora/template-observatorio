import { MUNICIPALITY } from "./municipality";

export const LOGIN_CONFIG = Object.freeze({
  imageHeight: 88,
  imageWidth: 88,
  imageRadius: 2,
  cardWidth: 440,
  backgroundTint: 0.16,
  footer: MUNICIPALITY.name,
  passwordMinLength: 10,
  login: {
    title: "¡Hola de nuevo!",
    subtitle: `Inicia sesión en el ${MUNICIPALITY.observatoryTitle.toLowerCase()} para continuar`,
    emailLabel: "Correo electrónico",
    emailPlaceholder: "nombre@ejemplo.es",
    passwordLabel: "Contraseña",
    showPassword: "Mostrar",
    hidePassword: "Ocultar",
    submit: "Entrar",
    submitting: "Entrando…",
    forgotPassword: "¿Has olvidado tu contraseña?",
  },
  reset: {
    title: "Recupera tu contraseña",
    subtitle:
      "Escribe tu correo y te enviaremos un enlace para crear una contraseña nueva",
    submit: "Enviar enlace",
    submitting: "Enviando…",
    success:
      "Si el correo está registrado, recibirás en unos minutos un enlace para restablecer tu contraseña. Revisa también la carpeta de correo no deseado.",
    backToLogin: "Volver a iniciar sesión",
  },
  confirm: {
    title: "Crea una contraseña nueva",
    subtitle: "Elige una contraseña que no uses en otros sitios",
    passwordLabel: "Contraseña nueva",
    repeatLabel: "Repite la contraseña",
    submit: "Guardar contraseña",
    submitting: "Guardando…",
    success:
      "Tu contraseña se ha cambiado. Por seguridad, se han cerrado todas tus sesiones abiertas.",
    goToLogin: "Iniciar sesión",
    requestNewLink: "Pedir un enlace nuevo",
  },
  errors: {
    emailRequired: "Introduce tu correo electrónico",
    emailInvalid: "Introduce un correo electrónico válido",
    passwordRequired: "Introduce tu contraseña",
    unexpected: "No se ha podido iniciar sesión. Inténtalo de nuevo más tarde.",
    resetUnexpected: "No se ha podido enviar la solicitud. Inténtalo de nuevo más tarde.",
    passwordTooShort: "La contraseña debe tener al menos {min} caracteres",
    passwordMismatch: "Las contraseñas no coinciden",
    linkInvalid: "El enlace no es válido o ha caducado. Pide uno nuevo para cambiar tu contraseña.",
    confirmUnexpected: "No se ha podido cambiar la contraseña. Inténtalo de nuevo más tarde.",
  },
});