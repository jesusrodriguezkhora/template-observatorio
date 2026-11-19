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

export function getListItems(fragment, record, lookups) {
  const sourceKey = getRefSourceKey(fragment);
  const source = lookups[sourceKey];
  const ids = [...new Set(toIdList(record[fragment.field]).map(String))];

  return ids.map((id) => {
    const row = getLookupRow(lookups, sourceKey, id);
    const colorFields = source?.colors;
    return {
      id,
      badge: fragment.badge ? row?.[fragment.badge] : null,
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
  for (const option of ["badge", "text"]) {
    if (
      fragment[option] !== undefined &&
      typeof fragment[option] !== "string"
    ) {
      errors.push(`"${option}" debe ser el nombre de un campo`);
    }
  }
  return errors;
}