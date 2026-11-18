export const widgets = {
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
    title: "Fechas",
    fragments: [
      { type: "info", subtitle: "Fecha de inicio", field: "fecha_inicio", valueType: "date" },
      { type: "info", subtitle: "Fecha de fin", field: "fecha_fin", valueType: "date" },
    ],
  },
};