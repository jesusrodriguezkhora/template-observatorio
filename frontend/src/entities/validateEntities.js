import { TAB_TYPES } from "../tabs";
import { validateGrids, validateWidgetCatalog } from "../widgets/validateWidgets";
import { missingOptions, validateValueDefs } from "./validationHelpers";
import { validateCatalogs } from "./validateCatalogs";

export function validateEntities(definitions, catalogs = []) {
  const errors = [];
  const byKey = new Map();

  for (const entity of definitions) {
    if (byKey.has(entity.key)) {
      errors.push(`La clave "${entity.key}" está repetida`);
    }
    byKey.set(entity.key, entity);
  }

  errors.push(...validateCatalogs(catalogs, byKey));
  const sourceKeys = new Set([...byKey.keys(), ...catalogs.map((catalog) => catalog.key)]);

  for (const entity of definitions) {
    const where = `Entidad "${entity.key}"`;

    if (!entity.displayField) {
      errors.push(`${where}: falta displayField`);
    }

    errors.push(...validateParent(entity, where, byKey));

    if (!Array.isArray(entity.columns) || entity.columns.length === 0) {
      errors.push(`${where}: no tiene columnas`);
    } else {
      errors.push(...validateValueDefs(entity.columns, `${where}, columna`, sourceKeys, true));
    }

    errors.push(...validateWidgetCatalog(entity.widgets, where, sourceKeys));
    errors.push(...validateTabs(entity, where, byKey, sourceKeys));
  }

  return errors;
}

export function assertValidEntities(definitions, catalogs) {
  const errors = validateEntities(definitions, catalogs);
  if (errors.length > 0) {
    throw new Error(`Configuración de entidades inválida:\n- ${errors.join("\n- ")}`);
  }
}

function validateParent(entity, where, byKey) {
  const errors = [];

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

  return errors;
}


function validateTabs(entity, where, byKey, sourceKeys) {
  const errors = [];
  const tabs = entity.detail?.tabs;

  if (!Array.isArray(tabs) || tabs.length === 0) {
    errors.push(`${where}: no tiene pestañas`);
    return errors;
  }

  const seenKeys = new Set();
  for (const tab of tabs) {
    const tabWhere = `${where}, pestaña "${tab.key}"`;

    if (seenKeys.has(tab.key)) {
      errors.push(`${tabWhere}: está repetida`);
    }
    seenKeys.add(tab.key);

    const tabType = TAB_TYPES[tab.type];
    if (!tabType) {
      errors.push(`${tabWhere}: el tipo "${tab.type}" no existe`);
      continue;
    }

    errors.push(...missingOptions(tab, tabType, `${tabWhere}: el tipo "${tab.type}"`));

    if (tabType.widgetGrids) {
      errors.push(...validateGrids(tabType.widgetGrids(tab), entity.widgets, tabWhere));
    } else if (tabType.valueDefs) {
      const valueDefs = tabType.valueDefs(tab, entity);
      if (Array.isArray(valueDefs)) {
        errors.push(...validateValueDefs(valueDefs, `${tabWhere}, campo`, sourceKeys, false));
      }
    }

    const relatedKey = tabType.relatedEntity?.(tab);
    if (relatedKey) {
      const target = byKey.get(relatedKey);
      if (!target) {
        errors.push(`${tabWhere}: la entidad "${relatedKey}" no existe`);
      } else if (!descendsFrom(target, entity.key, byKey)) {
        errors.push(`${tabWhere}: "${relatedKey}" no cuelga de "${entity.key}"`);
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
