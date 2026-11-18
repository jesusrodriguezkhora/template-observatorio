export function isEmptyValue(value) {
  return value === null || value === undefined || value === "";
}

export function getRefSourceKey(column) {
  return column.entity ?? column.catalog;
}

export function getLookupRow(lookups, sourceKey, value) {
  return lookups[sourceKey]?.rows[String(value)] ?? null;
}

export function getRefLabel(value, column, lookups) {
  const sourceKey = getRefSourceKey(column);
  const row = getLookupRow(lookups, sourceKey, value);
  return row ? row[lookups[sourceKey].displayField] : value;
}