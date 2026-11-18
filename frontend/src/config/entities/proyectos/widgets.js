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
      { type: "info", subtitle: "Área coordinadora", field: "area", valueType: "ref", catalog: "areas" },
      { type: "info", subtitle: "Responsable del proyecto", field: "responsable" },
    ],
  },
  informacion: {
    title: "Información general",
    fragments: [
      { type: "info", subtitle: "Programa / plan", field: "programa" },
      { type: "info", subtitle: "Descripción", field: "descripcion" },
      { type: "info", subtitle: "Temas", field: "temas", valueType: "chips", catalog: "temas" },
      { type: "info", subtitle: "Subtemas", field: "subtemas", valueType: "chips", catalog: "subtemas", hideIfEmpty: true },
    ],
  },
  presupuesto: {
    title: "Presupuesto",
    fragments: [
      { type: "info", subtitle: "Solicitado", field: "presupuesto_solicitado", valueType: "currency" },
      { type: "info", subtitle: "Concedido", field: "presupuesto_concedido", valueType: "currency" },
      { type: "info", subtitle: "Ejecución (gasto pagado)", field: "porcentaje_ejecucion", valueType: "percent" },
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
          { label: "Presupuesto concedido", field: "presupuesto_concedido", valueType: "currency", color: "primary.main" },
          { label: "FEDER concedido", field: "feder_concedido", valueType: "currency" },
          { label: "Ejecutado (pagado)", field: "presupuesto_ejecutado", valueType: "currency", color: "success.main" },
          { label: "IVA financiable", field: "iva_financiable", valueType: "boolean" },
        ],
      },
      {
        type: "keyvalue",
        rows: [
          { label: "Pendiente de justificar", field: "pendiente_justificar", valueType: "currency", color: "error.main", hideIfEmpty: true },
        ],
      },
      {
        type: "keyvalue",
        rows: [
          { label: "% Cofinanciación", field: "porcentaje_cofinanciacion", valueType: "percent" },
          { label: "% Ejecución", field: "porcentaje_ejecucion", valueType: "percent" },
        ],
      },
    ],
  },
};