export const tabs = [
    {
    key: "detalle",
    label: "Detalle",
    type: "grid",
    grids: [
      {
        columns: [
          { size: 2, widgets: ["general"] },
          { size: 1, widgets: ["fechas"] },
        ],
      },
    ],
  },
  { key: "instrumentos", label: "Instrumentos jurídicos", type: "related", entity: "instrumentos" },
];