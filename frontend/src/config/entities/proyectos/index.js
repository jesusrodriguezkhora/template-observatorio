import { columns } from "./columns";
import { tabs } from "./tabs";

export const proyectos = {
  key: "proyectos",
  labels: { singular: "Proyecto", plural: "Proyectos" },
  displayField: "nombre",
  parent: null,
  columns,
  browser: { searchFields: ["nombre"] },
  detail: { tabs },
};