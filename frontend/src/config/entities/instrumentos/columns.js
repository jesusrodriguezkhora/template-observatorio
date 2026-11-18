export const columns = [
  { field: "id", label: "ID", searchable: true },
  { field: "nombre", label: "Nombre del instrumento", type: "link", searchable: true },
  { field: "importe", label: "Importe", type: "currency" },
  { field: "actuacion_id", label: "Actuación", type: "ref", entity: "actuaciones", searchable: true },
];