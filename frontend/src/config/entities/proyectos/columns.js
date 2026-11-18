export const columns = [
  { field: "id", label: "ID", searchable: true },
  { field: "nombre", label: "Nombre del proyecto", type: "link", searchable: true },
  { field: "temas", label: "Temas", type: "chips", catalog: "temas", searchable: true },
  { field: "presupuesto_concedido", label: "Presupuesto concedido", type: "currency", compact: true },
];