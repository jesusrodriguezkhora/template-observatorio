export const ROLES = Object.freeze({
  ADMINISTRACION: "administracion",
  GESTION: "gestion",
  POLITICO: "politico"
});

export const SUPER_ROLE = ROLES.ADMINISTRACION;

export const ROLE_LABELS = Object.freeze({
  [ROLES.ADMINISTRACION]: "Administración",
  [ROLES.GESTION]: "Gestión",
  [ROLES.POLITICO]: "Político",
});