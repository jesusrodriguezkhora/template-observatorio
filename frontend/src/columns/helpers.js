export function getRefLabel(value, column, lookups) {
  return lookups[column.entity]?.[String(value)] ?? value;
}