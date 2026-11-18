import { isEmptyValue } from "../columns/helpers";

export function isRowEmpty(row, record) {
  return row.field ? isEmptyValue(record[row.field]) : isEmptyValue(row.text);
}

export function getVisibleRows(fragment, record, canAccess) {
  return fragment.rows
    .map((row, index) => ({ row, key: `row-${index}` }))
    .filter(({ row }) => canAccess(row.roles))
    .filter(({ row }) => !(row.hideIfEmpty && isRowEmpty(row, record)));
}

export function validateRows(rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return ['"rows" debe ser una lista con al menos una fila'];
  }
  return rows.flatMap((row, index) => {
    const where = `fila ${index + 1}`;
    const errors = [];
    if (!row.label) {
      errors.push(`${where}: falta "label"`);
    }
    if (row.field === undefined && row.text === undefined) {
      errors.push(`${where}: necesita la opción "field" o "text"`);
    }
    return errors;
  });
}