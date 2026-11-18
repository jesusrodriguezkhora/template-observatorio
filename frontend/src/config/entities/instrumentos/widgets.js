export const widgets = {
  identificacion: {
    title: "Identificación",
    fragments: [
      { type: "info", subtitle: "Tipo de instrumento", field: "tipo" },
      { type: "info", subtitle: "Expediente", field: "expediente" },
    ],
  },
  fechas: {
    title: "Fechas",
    fragments: [{ type: "info", subtitle: "Fecha de firma", field: "fecha_firma" }],
  },
};