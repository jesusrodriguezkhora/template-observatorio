import { FRAGMENT_TYPES } from "../fragments";
import { missingOptions, validateValueDefs } from "../entities/validationHelpers";

export function validateWidgetCatalog(catalog, where, byKey) {
  if (catalog === undefined) {
    return [];
  }
  if (catalog === null || typeof catalog !== "object" || Array.isArray(catalog)) {
    return [`${where}: "widgets" debe ser un objeto { clave: widget }`];
  }

  const errors = [];
  for (const [key, widget] of Object.entries(catalog)) {
    const widgetWhere = `${where}, widget "${key}"`;

    if (!Array.isArray(widget.fragments) || widget.fragments.length === 0) {
      errors.push(`${widgetWhere}: no tiene fragmentos`);
      continue;
    }

    widget.fragments.forEach((fragment, index) => {
      errors.push(...validateFragment(fragment, `${widgetWhere}, fragmento ${index + 1}`, byKey));
    });
  }
  return errors;
}

function validateFragment(fragment, where, byKey) {
  const fragmentType = FRAGMENT_TYPES[fragment.type];
  if (!fragmentType) {
    return [`${where}: el tipo "${fragment.type}" no existe`];
  }

  const errors = missingOptions(fragment, fragmentType, `${where}: el tipo "${fragment.type}"`);

  if (fragment.hideIfEmpty && !fragmentType.isEmpty) {
    errors.push(`${where}: el tipo "${fragment.type}" no admite hideIfEmpty`);
  }

  errors.push(...(fragmentType.validate?.(fragment) ?? []).map((message) => `${where}: ${message}`));

  const valueDefs = fragmentType.valueDefs?.(fragment) ?? [];
  errors.push(...validateValueDefs(valueDefs, `${where}, campo`, byKey, false));

  return errors;
}

export function validateGrids(grids, catalog, where) {
  if (grids === undefined) {
    return [];
  }
  if (!Array.isArray(grids) || grids.length === 0) {
    return [`${where}: no tiene grids`];
  }
  if (!catalog) {
    return [`${where}: la entidad no tiene catálogo de widgets`];
  }

  const errors = [];
  grids.forEach((grid, gridIndex) => {
    const gridWhere = `${where}, grid ${gridIndex + 1}`;

    if (!Array.isArray(grid.columns) || grid.columns.length === 0) {
      errors.push(`${gridWhere}: no tiene columnas`);
      return;
    }

    grid.columns.forEach((column, columnIndex) => {
      const columnWhere = `${gridWhere}, columna ${columnIndex + 1}`;

      if (column.size !== undefined && !(typeof column.size === "number" && column.size > 0)) {
        errors.push(`${columnWhere}: "size" debe ser un número mayor que 0`);
      }
      if (!Array.isArray(column.widgets) || column.widgets.length === 0) {
        errors.push(`${columnWhere}: no tiene widgets`);
        return;
      }

      const seen = new Set();
      for (const widgetKey of column.widgets) {
        if (seen.has(widgetKey)) {
          errors.push(`${columnWhere}: el widget "${widgetKey}" está repetido`);
        }
        seen.add(widgetKey);

        if (!Object.hasOwn(catalog, widgetKey)) {
          errors.push(`${columnWhere}: el widget "${widgetKey}" no existe en el catálogo`);
        }
      }
    });
  });
  return errors;
}