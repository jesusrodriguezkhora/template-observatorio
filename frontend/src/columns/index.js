import TextCell from "./TextCell";
import LinkCell from "./LinkCell";
import RefCell from "./RefCell";
import { getRefLabel } from "./helpers";

export const DEFAULT_COLUMN_TYPE = "text";

export const COLUMN_TYPES = Object.freeze({
  text: { Cell: TextCell },
  link: { Cell: LinkCell },
  ref: {
    Cell: RefCell,
    requires: ["entity"],
    lookupEntity: (column) => column.entity,
    toText: getRefLabel,
  },
});

export function getColumnText(column, row, lookups) {
  const value = row[column.field];
  const { toText } = getColumnType(column.type);
  return toText ? toText(value, column, lookups) : value;
}

export function getColumnType(type = DEFAULT_COLUMN_TYPE) {
  const columnType = COLUMN_TYPES[type];
  if (!columnType) {
    throw new Error(`Tipo de columna desconocido: "${type}"`);
  }
  return columnType;
}