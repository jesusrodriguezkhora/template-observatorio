import { COLUMN_TYPES } from "../columns";

function validateRelatedParts(parts) {
  const errors = [];
  if (!parts.entity) {
    errors.push('"parts" de registros relacionados necesita "entity"');
  }
  if ((parts.value === undefined) === (parts.groupBy === undefined)) {
    errors.push(
      '"parts" necesita "value" (sumar) o "groupBy" (contar), uno de los dos',
    );
  }
  if (parts.groups !== undefined) {
    if (!parts.groupBy) {
      errors.push('"groups" solo tiene sentido con "groupBy"');
    } else if (!Array.isArray(parts.groups)) {
      errors.push('"groups" debe ser una lista');
    } else {
      parts.groups.forEach((group, index) => {
        const value = typeof group === "string" ? group : group?.value;
        if (typeof value !== "string" || value === "") {
          errors.push(
            `grupo ${index + 1}: debe ser un texto o { value, label, color }`,
          );
        }
      });
    }
  }
  return errors;
}

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
    return validateRelatedParts(parts);
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