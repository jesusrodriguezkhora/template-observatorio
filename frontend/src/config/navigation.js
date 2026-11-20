import { ROLES } from "./roles";

export const HOME_PATH = "/proyectos";
export const LOGIN_PATH = "/login";

export const NAV_ITEMS = Object.freeze([
  { key: "dashboard", label: "Dashboard", path: "/dashboard", enabled: false },
  { key: "convocatorias", label: "Convocatorias", path: "/convocatorias", enabled: false },
  { key: "proyectos", label: "Proyectos", path: "/proyectos", enabled: true },
  { key: "actuaciones", label: "Actuaciones", path: "/actuaciones", enabled: true },
  { key: "instrumentos", label: "Instrumentos Jurídicos", path: "/instrumentos", enabled: true },
  { key: "indicadores", label: "Indicadores", path: "/indicadores", enabled: false, roles: [ROLES.ADMINISTRACION] },
]);