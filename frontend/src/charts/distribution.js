import { isEmptyValue } from "../columns/helpers";

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