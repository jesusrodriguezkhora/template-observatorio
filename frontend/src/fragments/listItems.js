import {
  getLookupRow,
  getRefSourceKey,
  toIdList,
  validateRefTarget,
} from "../columns/helpers";

export function toListValueDef(fragment) {
  return {
    field: fragment.field,
    label: fragment.subtitle ?? fragment.field,
    type: "ref",
    entity: fragment.entity,
    catalog: fragment.catalog,
  };
}

function getBadge(fragment, row, index) {
  if (fragment.numbering) {
    const { prefix = "", start = 1 } = fragment.numbering;
    return `${prefix}${start + index}`;
  }
  return fragment.badge ? row?.[fragment.badge] : null;
}

function getInlineItems(fragment, record) {
  const rows = Array.isArray(record[fragment.field])
    ? record[fragment.field]
    : [];
  return rows.map((row, index) => ({
    id: String(row?.id ?? index),
    badge: getBadge(fragment, row, index),
    text: row?.[fragment.text] ?? "",
    background: null,
    color: null,
  }));
}

export function getListItems(fragment, record, lookups) {
  const sourceKey = getRefSourceKey(fragment);
  if (!sourceKey) {
    return getInlineItems(fragment, record);
  }
  const source = lookups[sourceKey];
  const ids = [...new Set(toIdList(record[fragment.field]).map(String))];

  return ids.map((id, index) => {
    const row = getLookupRow(lookups, sourceKey, id);
    const colorFields = source?.colors;
    return {
      id,
      badge: getBadge(fragment, row, index),
      text: row ? row[fragment.text ?? source.displayField] : id,
      background: colorFields ? row?.[colorFields.background] : null,
      color: colorFields ? row?.[colorFields.text] : null,
    };
  });
}

export function isListEmpty(fragment, record) {
  return toIdList(record[fragment.field]).length === 0;
}

export function validateList(fragment) {
  const errors = validateRefTarget(fragment);
  if (!getRefSourceKey(fragment) && fragment.text === undefined) {
    errors.push(
      'sin "entity" ni "catalog", la lista necesita "text" (campo de cada elemento)',
    );
  }
  for (const option of ["badge", "text"]) {
    if (
      fragment[option] !== undefined &&
      typeof fragment[option] !== "string"
    ) {
      errors.push(`"${option}" debe ser el nombre de un campo`);
    }
  }
  if (fragment.numbering !== undefined) {
    errors.push(...validateNumbering(fragment));
  }
  return errors;
}

function validateNumbering(fragment) {
  const { numbering } = fragment;
  if (numbering === null || typeof numbering !== "object") {
    return ['"numbering" debe ser un objeto { prefix, start }'];
  }
  const errors = [];
  if (fragment.badge !== undefined) {
    errors.push('usa "badge" o "numbering", no los dos');
  }
  if (numbering.prefix !== undefined && typeof numbering.prefix !== "string") {
    errors.push('"numbering.prefix" debe ser un texto');
  }
  if (numbering.start !== undefined && !Number.isInteger(numbering.start)) {
    errors.push('"numbering.start" debe ser un número entero');
  }
  return errors;
}