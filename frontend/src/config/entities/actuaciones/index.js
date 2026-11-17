import { columns } from "./columns";
import { tabs } from "./tabs";

export const actuaciones = {
  key: "actuaciones",
  labels: { singular: "Actuación", plural: "Actuaciones" },
  displayField: "nombre",
  parent: { entity: "proyectos", field: "proyecto_id" },
  columns,
  browser: {},
  detail: { tabs },
};