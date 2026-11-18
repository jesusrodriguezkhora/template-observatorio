export const tabs = [
  {
    key: "detalle",
    label: "Detalle",
    type: "grid",
    grids: [
      {
        columns: [
          { size: 1, widgets: ["responsable", "fechas"] },
          { size: 2, widgets: ["informacion"] },
          { size: 1, widgets: ["presupuesto"] },
        ],
      },
    ],
  },
  { key: "actuaciones", label: "Actuaciones", type: "related", entity: "actuaciones" },
  { key: "instrumentos", label: "Instrumentos jurídicos", type: "related", entity: "instrumentos" },
];