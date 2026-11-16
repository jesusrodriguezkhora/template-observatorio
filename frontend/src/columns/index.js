import TextCell from "./TextCell";
import LinkCell from "./LinkCell";
import RefCell from "./RefCell";

export const COLUMN_TYPES = Object.freeze({
  text: { Cell: TextCell },
  link: { Cell: LinkCell },
  ref: {
    Cell: RefCell,
    requires: ["entity"],
    lookupEntity: (column) => column.entity,
  },
});

export function getColumnType(type) {
  const columnType = COLUMN_TYPES[type];
  if (!columnType) {
    throw new Error(`Tipo de columna desconocido: "${type}"`);
  }
  return columnType;
}