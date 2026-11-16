export const tabs = [
  {
    key: "detalle",
    label: "Detalle",
    type: "fields",
    fields: [{ field: "nombre", label: "Nombre" }],
  },
  { key: "instrumentos", label: "Instrumentos jurídicos", type: "related", entity: "instrumentos" },
];