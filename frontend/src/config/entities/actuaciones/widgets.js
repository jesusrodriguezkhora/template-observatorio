export const widgets = {
  general: {
    title: "Información general",
    fragments: [
      { type: "info", subtitle: "Ubicación", field: "ubicacion" },
      { type: "info", subtitle: "Descripción", field: "descripcion" },
    ],
  },
  fechas: {
    title: "Fechas previstas",
    fragments: [
      { type: "info", subtitle: "Fecha de inicio", field: "fecha_inicio" },
      { type: "info", subtitle: "Fecha de fin", field: "fecha_fin" },
    ],
  },
};