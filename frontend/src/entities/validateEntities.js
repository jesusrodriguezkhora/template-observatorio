import { COLUMN_TYPES } from "../columns";


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

    errors.push(...validateColumns(entity, where, byKey));

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

function validateColumns(entity, where, byKey) {
  const errors = [];

  if (!Array.isArray(entity.columns) || entity.columns.length === 0) {
    errors.push(`${where}: no tiene columnas`);
    return errors;
  }

  const seenFields = new Set();
  for (const column of entity.columns) {
    const columnWhere = `${where}, columna "${column.field}"`;

    if (!column.field || !column.label) {
      errors.push(`${where}: hay una columna sin field o sin label`);
    }
    if (seenFields.has(column.field)) {
      errors.push(`${columnWhere}: está repetida`);
    }
    seenFields.add(column.field);

    const columnType = COLUMN_TYPES[column.type];
    if (!columnType) {
      errors.push(`${columnWhere}: el tipo "${column.type}" no existe`);
      continue;
    }

    for (const option of columnType.requires ?? []) {
      if (column[option] === undefined) {
        errors.push(`${columnWhere}: el tipo "${column.type}" necesita la opción "${option}"`);
      }
    }

    const lookupKey = columnType.lookupEntity?.(column);
    if (lookupKey && !byKey.has(lookupKey)) {
      errors.push(`${columnWhere}: la entidad "${lookupKey}" no existe`);
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