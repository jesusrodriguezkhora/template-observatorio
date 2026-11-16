import { columns } from "./columns";
import { tabs } from "./tabs";

export const instrumentos = {
  key: "instrumentos",
  labels: { singular: "Instrumento jurídico", plural: "Instrumentos jurídicos" },
  displayField: "nombre",
  parent: { entity: "actuaciones", field: "actuacion_id" },
  columns,
  browser: null,
  detail: { tabs },
};