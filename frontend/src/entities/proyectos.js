export const proyectos = {
  key: "proyectos",
  labels: { singular: "Proyecto", plural: "Proyectos" },
  displayField: "nombre",
  parent: null,
  browser: {
    columns: [{ field: "nombre", label: "Nombre del proyecto" }],
    searchFields: ["nombre"],
  },
  detail: {
    tabs: [
      { key: "detalle", label: "Detalle", type: "fields", fields: [{ field: "nombre", label: "Nombre" }] },
      { key: "actuaciones", label: "Actuaciones", type: "related", entity: "actuaciones" },
      { key: "instrumentos", label: "Instrumentos jurídicos", type: "related", entity: "instrumentos" },
    ],
  },
};