export const widgets = {
  identificacion: {
    title: "Identificación",
    fragments: [
      { type: "info", subtitle: "Tipo de instrumento", field: "tipo" },
      { type: "info", subtitle: "Expediente", field: "expediente" },
      { type: "info", subtitle: "Importe", field: "importe", valueType: "currency" },
    ],
  },
  fechas: {
    title: "Fechas",
    fragments: [{ type: "info", subtitle: "Fecha de firma", field: "fecha_firma", valueType: "date", valueType: "date" }],
  },
};