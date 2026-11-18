export function validateCatalogs(catalogs, entitiesByKey) {
  const errors = [];
  const seen = new Set();

  for (const catalog of catalogs) {
    const where = `Catálogo "${catalog.key}"`;

    if (!catalog.key) {
      errors.push("Hay un catálogo sin key");
      continue;
    }
    if (seen.has(catalog.key)) {
      errors.push(`${where}: la clave está repetida`);
    }
    seen.add(catalog.key);

    if (entitiesByKey.has(catalog.key)) {
      errors.push(`${where}: ya existe una entidad con esa clave`);
    }
    if (!catalog.displayField) {
      errors.push(`${where}: falta displayField`);
    }
    if (catalog.linkField !== undefined && typeof catalog.linkField !== "string") {
      errors.push(`${where}: "linkField" debe ser el nombre de un campo`);
    }
    if (catalog.colors !== undefined) {
      const { background, text } = catalog.colors ?? {};
      if (typeof background !== "string" || typeof text !== "string") {
        errors.push(`${where}: "colors" debe ser { background: "campo", text: "campo" }`);
      }
    }
  }

  return errors;
}