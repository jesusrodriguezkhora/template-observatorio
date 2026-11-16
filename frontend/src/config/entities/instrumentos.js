export const instrumentos = {
  key: "instrumentos",
  labels: { singular: "Instrumento jurídico", plural: "Instrumentos jurídicos" },
  displayField: "nombre",
  parent: { entity: "actuaciones", field: "actuacion_id" },
  browser: null,
  detail: {
    tabs: [
      {
        key: "detalle",
        label: "Detalle",
        type: "fields",
        fields: [{ field: "nombre", label: "Nombre" }],
      },
    ],
  },
};