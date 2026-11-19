import { COLUMN_TYPES } from "../columns";

function validateParts(parts) {
  if (Array.isArray(parts)) {
    if (parts.length === 0) {
      return ['"parts" no puede estar vacío'];
    }
    return parts.flatMap((part, index) =>
      !part.label || !part.field
        ? [`parte ${index + 1}: necesita "label" y "field"`]
        : [],
    );
  }
  if (parts && typeof parts === "object") {
    return !parts.entity || !parts.value
      ? ['"parts" de registros relacionados necesita "entity" y "value"']
      : [];
  }
  return ['"parts" debe ser una lista de campos o { entity, value }'];
}

export function validateDistribution(chart) {
  const errors = chart.parts === undefined ? [] : validateParts(chart.parts);
  if (chart.total !== undefined && typeof chart.total !== "string") {
    errors.push('"total" debe ser el nombre de un campo');
  }
  if (
    chart.valueType !== undefined &&
    !COLUMN_TYPES[chart.valueType]?.numeric
  ) {
    errors.push(
      `"valueType" debe ser un tipo numérico (number, currency o percent)`,
    );
  }
  if (
    chart.showValues !== undefined &&
    !["percent", "value", true, false].includes(chart.showValues)
  ) {
    errors.push('"showValues" debe ser "percent" o "value"');
  }
  return errors;
}