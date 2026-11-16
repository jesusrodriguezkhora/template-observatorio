export function validateEntities(definitions) {
  const errors = [];
  const byKey = new Map();

  for (const entity of definitions) {
    if (byKey.has(entity.key)) {
      errors.push(`La clave "${entity.key}" está repetida`);
    }
    byKey.set(entity.key, entity);
  }

  for (const entity of definitions) {
    const where = `Entidad "${entity.key}"`;

    if (!entity.displayField) {
      errors.push(`${where}: falta displayField`);
    }

    if (entity.parent && !byKey.has(entity.parent.entity)) {
      errors.push(`${where}: su padre "${entity.parent.entity}" no existe`);
    }

    const visited = new Set([entity.key]);
    let current = entity;
    while (current?.parent) {
      const parentKey = current.parent.entity;
      if (visited.has(parentKey)) {
        errors.push(`${where}: hay un ciclo en la jerarquía de padres`);
        break;
      }
      visited.add(parentKey);
      current = byKey.get(parentKey);
    }

    const tabKeys = new Set();
    for (const tab of entity.detail?.tabs ?? []) {
      if (tabKeys.has(tab.key)) {
        errors.push(`${where}: la pestaña "${tab.key}" está repetida`);
      }
      tabKeys.add(tab.key);

      if (tab.type === "related") {
        const target = byKey.get(tab.entity);
        if (!target) {
          errors.push(`${where}, pestaña "${tab.key}": la entidad "${tab.entity}" no existe`);
        } else if (!descendsFrom(target, entity.key, byKey)) {
          errors.push(
            `${where}, pestaña "${tab.key}": "${tab.entity}" no cuelga de "${entity.key}"`,
          );
        }
      }
    }
  }

  return errors;
}

function descendsFrom(entity, ancestorKey, byKey) {
  const visited = new Set();
  let current = entity;
  while (current?.parent) {
    const parentKey = current.parent.entity;
    if (parentKey === ancestorKey) {
      return true;
    }
    if (visited.has(parentKey)) {
      return false;
    }
    visited.add(parentKey);
    current = byKey.get(parentKey);
  }
  return false;
}