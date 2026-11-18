export const widgets = {
  cabecera: {
    fragments: [
      {
        type: "title",
        image: "imagen",
        overline: "id",
        overlineLabel: "ID proyecto",
        title: ["nombre_corto", "nombre"],
        subtitle: "programa",
      },
    ],
  },
  responsable: {
    title: "Responsable y coordinación",
    fragments: [
      { type: "info", subtitle: "Área coordinadora", field: "area_coordinadora" },
      { type: "info", subtitle: "Responsable del proyecto", field: "responsable" },
    ],
  },
  informacion: {
    title: "Información general",
    fragments: [
      { type: "info", subtitle: "Programa / plan", field: "programa" },
      { type: "info", subtitle: "Descripción", field: "descripcion" },
    ],
  },
  presupuesto: {
    title: "Presupuesto",
    fragments: [
      { type: "info", subtitle: "Solicitado", field: "presupuesto_solicitado", valueType: "currency" },
      { type: "info", subtitle: "Concedido", field: "presupuesto_concedido", valueType: "currency" },
    ],
  },
  fechas: {
    title: "Fechas y resolución",
    fragments: [
      {
        type: "keyvalue",
        rows: [
          { label: "Fecha de inicio", field: "fecha_inicio", valueType: "date" },
          { label: "Fecha de fin", field: "fecha_fin", valueType: "date" },
        ],
      },
    ],
  },
  financiacion: {
    title: "Financiación",
    fragments: [
      {
        type: "keyvalue",
        rows: [
          { label: "Presupuesto solicitado", field: "presupuesto_solicitado", valueType: "currency" },
          {
            label: "Presupuesto concedido",
            field: "presupuesto_concedido",
            valueType: "currency",
            color: "primary.main",
          },
          { label: "FEDER concedido", field: "feder_concedido", valueType: "currency" },
          {
            label: "Ejecutado (pagado)",
            field: "presupuesto_ejecutado",
            valueType: "currency",
            color: "success.main",
          },
        ],
      },
      {
        type: "keyvalue",
        rows: [
          {
            label: "Pendiente de justificar",
            field: "pendiente_justificar",
            valueType: "currency",
            color: "error.main",
            hideIfEmpty: true,
          },
        ],
      },
    ],
  },
};