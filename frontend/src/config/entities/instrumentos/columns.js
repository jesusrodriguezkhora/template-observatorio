export const columns = [
  { field: "nombre", label: "Nombre del instrumento", type: "link" },
  { field: "actuacion_id", label: "Actuación", type: "ref", entity: "actuaciones" },
];