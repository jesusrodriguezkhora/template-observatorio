import { ROLES } from "../config/roles";

export const MOCK_USERS = [
  {
    id: 1,
    nombre: "Administración",
    email: "admin@ejemplo.es",
    role: ROLES.ADMINISTRACION,
    password: "observatorio",
  },
  {
    id: 2,
    nombre: "Usuario de consulta",
    email: "consulta@ejemplo.es",
    role: ROLES.CONSULTA,
    password: "observatorio",
  },
];