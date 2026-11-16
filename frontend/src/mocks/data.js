export const MOCK_DB = Object.freeze({
  proyectos: [
    { id: 1, nombre: "Rehabilitación del casco histórico" },
    { id: 2, nombre: "Plan de movilidad sostenible" },
    { id: 3, nombre: "Digitalización de servicios municipales" },
  ],
  actuaciones: [
    { id: 1, nombre: "Peatonalización de la calle Mayor", proyecto_id: 1 },
    { id: 2, nombre: "Restauración de fachadas protegidas", proyecto_id: 1 },
    { id: 3, nombre: "Carril bici perimetral", proyecto_id: 2 },
    { id: 4, nombre: "Ampliación de la red de autobuses", proyecto_id: 2 },
    { id: 5, nombre: "Aparcamientos disuasorios", proyecto_id: 2 },
  ],
  instrumentos: [
    { id: 1, nombre: "Contrato de obras de pavimentación", actuacion_id: 1 },
    { id: 2, nombre: "Convenio con la Diputación Provincial", actuacion_id: 1 },
    { id: 3, nombre: "Subvención a propietarios de inmuebles", actuacion_id: 2 },
    { id: 4, nombre: "Licitación de redacción del proyecto", actuacion_id: 3 },
    { id: 5, nombre: "Contrato de suministro de marquesinas", actuacion_id: 4 },
    { id: 6, nombre: "Encargo a medio propio", actuacion_id: 4 },
  ],
});