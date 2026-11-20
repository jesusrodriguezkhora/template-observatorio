export const ROLES = Object.freeze({
  ADMINISTRACION: "administracion",
  CONSULTA: "consulta",
});

export const SUPER_ROLE = ROLES.ADMINISTRACION;

export const ROLE_LABELS = Object.freeze({
  [ROLES.ADMINISTRACION]: "Administración",
  [ROLES.CONSULTA]: "Consulta",
});