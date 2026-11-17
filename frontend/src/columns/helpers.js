export function isEmptyValue(value) {
  return value === null || value === undefined || value === "";
}

export function getRefLabel(value, column, lookups) {
  return lookups[column.entity]?.[String(value)] ?? value;
}