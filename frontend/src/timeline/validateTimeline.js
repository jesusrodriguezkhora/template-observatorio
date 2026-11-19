function isFieldName(value) {
  return typeof value === "string" && value !== "";
}

function validateFieldRows(rows) {
  if (rows.length === 0) {
    return ['"rows" no puede estar vacío'];
  }
  return rows.flatMap((row, index) =>
    isFieldName(row?.label) && isFieldName(row?.start) && isFieldName(row?.end)
      ? []
      : [`fila ${index + 1}: necesita "label", "start" y "end"`],
  );
}

function validateRelatedRows(rows) {
  const errors = [];
  if (!isFieldName(rows.entity)) {
    errors.push('"rows" de registros relacionados necesita "entity"');
  }
  if (!isFieldName(rows.start) || !isFieldName(rows.end)) {
    errors.push('"rows" necesita los campos "start" y "end"');
  }
  if (rows.label !== undefined && !isFieldName(rows.label)) {
    errors.push('"rows.label" debe ser el nombre de un campo');
  }
  return errors;
}

function validateRows(rows) {
  if (rows === undefined) {
    return [];
  }
  if (Array.isArray(rows)) {
    return validateFieldRows(rows);
  }
  if (rows !== null && typeof rows === "object") {
    return validateRelatedRows(rows);
  }
  return [
    '"rows" debe ser una lista de { label, start, end } o { entity, start, end }',
  ];
}

export function validateTimeline(fragment) {
  const errors = validateRows(fragment.rows);
  if (
    fragment.showToday !== undefined &&
    typeof fragment.showToday !== "boolean"
  ) {
    errors.push('"showToday" debe ser true o false');
  }
  return errors;
}