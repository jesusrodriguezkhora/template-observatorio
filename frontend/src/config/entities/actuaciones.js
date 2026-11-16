export const actuaciones = {
  key: "actuaciones",
  labels: { singular: "Actuación", plural: "Actuaciones" },
  displayField: "nombre",
  parent: { entity: "proyectos", field: "proyecto_id" },
  browser: {
    columns: [
      { field: "nombre", label: "Nombre de la actuación" },
      { field: "proyecto_id", label: "Proyecto", ref: "proyectos" },
    ],
    searchFields: ["nombre"],
  },
  detail: {
    tabs: [
      {
        key: "detalle",
        label: "Detalle",
        type: "fields",
        fields: [{ field: "nombre", label: "Nombre" }],
      },
      { key: "instrumentos", label: "Instrumentos jurídicos", type: "related", entity: "instrumentos" },
    ],
  },
};