import { MUNICIPALITY } from "./municipality";

export const LOGIN_CONFIG = Object.freeze({
  imageSize: 88,
  imageRadius: 2,
  cardWidth: 440,
  backgroundTint: 0.16,
  footer: MUNICIPALITY.name,
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
  errors: {
    emailRequired: "Introduce tu correo electrónico",
    emailInvalid: "Introduce un correo electrónico válido",
    passwordRequired: "Introduce tu contraseña",
    unexpected: "No se ha podido iniciar sesión. Inténtalo de nuevo más tarde.",
    resetUnexpected: "No se ha podido enviar la solicitud. Inténtalo de nuevo más tarde.",
  },
});