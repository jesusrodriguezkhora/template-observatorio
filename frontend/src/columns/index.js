import TextCell from "./TextCell";
import LinkCell from "./LinkCell";
import RefCell from "./RefCell";
import DateCell from "./DateCell";
import CurrencyCell from "./CurrencyCell";
import { getRefLabel } from "./helpers";
import { formatCurrency, formatDate } from "./formatters";
import { LOCALE_CONFIG } from "../config/locale";

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
  date: {
    Cell: DateCell,
    toText: formatDate,
    validate: (column) =>
      column.format && !Object.hasOwn(LOCALE_CONFIG.dateFormats, column.format)
        ? [`el formato de fecha "${column.format}" no existe en config/locale.js`]
        : [],
  },
  currency: {
    Cell: CurrencyCell,
    toText: formatCurrency,
    align: "right",
  },
});

export function getColumnText(column, row, lookups) {
  const value = row[column.field];
  const { toText } = getColumnType(column.type);
  return toText ? toText(value, column, lookups) : value;
}

export function getColumnAlign(column) {
  return column.align ?? getColumnType(column.type).align;
}

export function getColumnType(type = DEFAULT_COLUMN_TYPE) {
  const columnType = COLUMN_TYPES[type];
  if (!columnType) {
    throw new Error(`Tipo de columna desconocido: "${type}"`);
  }
  return columnType;
}