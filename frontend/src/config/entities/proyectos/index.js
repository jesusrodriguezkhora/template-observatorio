import { columns } from "./columns";
import { tabs } from "./tabs";
import { widgets } from "./widgets";

export const proyectos = {
  key: "proyectos",
  labels: { singular: "Proyecto", plural: "Proyectos" },
  displayField: "nombre",
  parent: null,
  columns,
  widgets,
  browser: {},
  detail: { tabs },
};