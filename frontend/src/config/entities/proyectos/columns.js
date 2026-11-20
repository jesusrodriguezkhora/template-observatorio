export const columns = [
  { field: "id", label: "ID", searchable: true },
  { field: "nombre", label: "Nombre del proyecto", type: "link", searchable: true },
  { field: "fecha_inicio", label: "Fecha de inicio", type: "date", searchable: false },
  { field: "presupuesto_concedido", label: "Presupuesto concedido", type: "currency", compact: true },
];