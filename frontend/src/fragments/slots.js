import { isEmptyValue } from "../columns/helpers";

export function normalizeSlot(slot) {
  if (slot === undefined || slot === null) {
    return null;
  }
  if (typeof slot === "string") {
    return { fields: [slot] };
  }
  if (Array.isArray(slot)) {
    return { fields: slot };
  }
  return slot;
}

export function resolveSlot(slot, record) {
  const normalized = normalizeSlot(slot);
  if (!normalized) {
    return null;
  }
  const field = normalized.fields?.find(
    (candidate) => !isEmptyValue(record[candidate]),
  );
  if (!field) {
    return null;
  }
  return {
    ...normalized,
    field,
    type: normalized.valueType,
    label: normalized.label ?? field,
  };
}

export function slotValueDefs(slot) {
  const normalized = normalizeSlot(slot);
  if (!normalized?.valueType) {
    return [];
  }
  return (normalized.fields ?? []).map((field) => ({
    ...normalized,
    field,
    type: normalized.valueType,
    label: normalized.label ?? field,
  }));
}

export function validateSlot(slot, name) {
  if (slot === undefined) {
    return [];
  }
  const normalized = normalizeSlot(slot);
  const fields = normalized?.fields;
  if (
    !Array.isArray(fields) ||
    fields.length === 0 ||
    fields.some((field) => typeof field !== "string")
  ) {
    return [
      `"${name}" debe ser un campo, una lista de campos o { fields: [...] }`,
    ];
  }
  return [];
}