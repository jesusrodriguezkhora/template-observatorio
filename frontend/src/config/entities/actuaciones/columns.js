export const columns = [
  { field: "id", label: "ID", searchable: true},
  { field: "nombre", label: "Nombre de la actuación", type: "link", searchable: true},
  { field: "proyecto_id", label: "Proyecto", type: "ref", entity: "proyectos", searchable: true},
];