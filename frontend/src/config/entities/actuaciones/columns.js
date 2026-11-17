export const columns = [
  { field: "id", label: "ID"},
  { field: "nombre", label: "Nombre de la actuación", type: "link" },
  { field: "proyecto_id", label: "Proyecto", type: "ref", entity: "proyectos" },
];