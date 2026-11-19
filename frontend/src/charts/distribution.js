import { isEmptyValue } from "../columns/helpers";
import { LOCALE_CONFIG } from "../config/locale";

export const REMAINDER_KEY = "__remainder";

export function toNumber(value) {
  if (isEmptyValue(value)) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function getFieldParts(parts, record) {
  return parts.map((part, index) => ({
    key: part.field,
    label: part.label,
    value: toNumber(record[part.field]),
    color: part.color ?? null,
    slot: index,
  }));
}

export function getRowParts(parts, rows, displayField) {
  return rows.map((row, index) => ({
    key: String(row.id),
    label: row[parts.label ?? displayField],
    value: toNumber(row[parts.value]),
    color: (parts.color && row[parts.color]) || null,
    slot: index,
  }));
}

export function buildDistribution(parts, totalValue, options = {}) {
  const assigned = parts.reduce(
    (sum, part) => sum + Math.max(part.value ?? 0, 0),
    0,
  );
  const total = totalValue ?? assigned;

  if (total <= 0) {
    return null;
  }

  const tolerance = total * 1e-9;
  const remainder = total - assigned;
  const items = parts.map((part) => ({
    ...part,
    share: Math.max(part.value ?? 0, 0) / total,
  }));

  if (options.remainderLabel && remainder > tolerance) {
    items.push({
      key: REMAINDER_KEY,
      label: options.remainderLabel,
      value: remainder,
      color: options.remainderColor ?? null,
      slot: null,
      share: remainder / total,
      isRemainder: true,
    });
  }

  return { total, assigned, items, overflow: remainder < -tolerance };
}

export function foldParts(parts, maxParts, otherLabel) {
  if (parts.length <= maxParts) {
    return parts;
  }
  const kept = parts.slice(0, maxParts - 1);
  const folded = parts.slice(maxParts - 1);
  const otherValue = folded.reduce(
    (sum, part) => sum + Math.max(part.value ?? 0, 0),
    0,
  );
  return [
    ...kept,
    {
      key: "__other",
      label: otherLabel,
      value: otherValue,
      color: null,
      slot: maxParts - 1,
    },
  ];
}

function normalizeGroup(group) {
  if (typeof group === "string") {
    return { value: group, label: group, color: null };
  }
  return {
    value: group.value,
    label: group.label ?? group.value,
    color: group.color ?? null,
  };
}

export function getGroupedParts(parts, rows, emptyLabel) {
  const counts = new Map();
  for (const row of rows) {
    const raw = row[parts.groupBy];
    const value = isEmptyValue(raw) ? emptyLabel : String(raw).trim();
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  const declared = (parts.groups ?? []).map(normalizeGroup);
  const declaredValues = new Set(declared.map((group) => group.value));
  const extra = [...counts.keys()]
    .filter((value) => !declaredValues.has(value))
    .sort((a, b) => a.localeCompare(b, LOCALE_CONFIG.locale))
    .map((value) => ({ value, label: value, color: null }));

  return [...declared, ...extra].map((group, index) => ({
    key: `group:${group.value}`,
    label: group.label,
    value: counts.get(group.value) ?? 0,
    color: group.color,
    slot: index,
  }));
}