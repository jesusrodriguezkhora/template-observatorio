export const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export const API_RESOURCES = new Set([
  "areas",
  "temas",
  "subtemas",
  "proyectos",
]);