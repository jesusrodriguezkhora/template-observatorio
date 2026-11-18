import { getDetailPath } from "../entities/paths";

export function isEmptyValue(value) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

function parseJsonArray(text) {
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function toIdList(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (isEmptyValue(value)) {
    return [];
  }
  if (typeof value === "string") {
    const text = value.trim();
    const fromJson = text.startsWith("[") ? parseJsonArray(text) : null;
    if (fromJson) {
      return fromJson;
    }
    return text
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return [value];
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

export function getRefTarget(value, column, lookups) {
  if (column.entity) {
    return { to: getDetailPath(column.entity, value) };
  }
  const source = lookups[column.catalog];
  const href = source?.linkField
    ? getLookupRow(lookups, column.catalog, value)?.[source.linkField]
    : null;
  return href ? { href } : null;
}

export function validateRefTarget(column) {
  return column.entity !== undefined && column.catalog !== undefined
    ? ['usa "entity" o "catalog", no los dos']
    : [];
}