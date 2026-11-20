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
    nombre: "Gestión",
    email: "gestion@ejemplo.es",
    role: ROLES.GESTION,
    password: "observatorio",
  },
  {
    id: 3,
    nombre: "Político",
    email: "politico@ejemplo.es",
    role: ROLES.POLITICO,
    password: "observatorio",
  },
];