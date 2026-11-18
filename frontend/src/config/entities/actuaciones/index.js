import { columns } from "./columns";
import { tabs } from "./tabs";
import { widgets } from "./widgets";

export const actuaciones = {
  key: "actuaciones",
  labels: { singular: "Actuación", plural: "Actuaciones" },
  displayField: "nombre",
  parent: { entity: "proyectos", field: "proyecto_id" },
  columns,
  widgets,
  browser: {},
  detail: { tabs },
};