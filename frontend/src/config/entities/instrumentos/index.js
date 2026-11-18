import { columns } from "./columns";
import { tabs } from "./tabs";
import { widgets } from "./widgets";

export const instrumentos = {
  key: "instrumentos",
  labels: { singular: "Instrumento jurídico", plural: "Instrumentos jurídicos" },
  displayField: "nombre",
  parent: { entity: "actuaciones", field: "actuacion_id" },
  columns,
  widgets,
  browser: {},
  detail: { tabs },
};