import TextCell from "./TextCell";
import LinkCell from "./LinkCell";
import RefCell from "./RefCell";
import DateCell from "./DateCell";
import CurrencyCell from "./CurrencyCell";
import {
  getRefLabel,
  getRefSourceKey,
  toIdList,
  validateRefTarget,
} from "./helpers";
import PercentCell from "./PercentCell";
import BooleanCell from "./BooleanCell";
import ChipsCell from "./ChipsCell";
import {
  formatBoolean,
  formatCurrency,
  formatDate,
  formatPercent,
} from "./formatters";
import { LOCALE_CONFIG } from "../config/locale";

export const DEFAULT_COLUMN_TYPE = "text";

export const COLUMN_TYPES = Object.freeze({
  text: { Cell: TextCell },
  link: { Cell: LinkCell },
  ref: {
    Cell: RefCell,
    requiresOneOf: ["entity", "catalog"],
    lookupSource: getRefSourceKey,
    toText: getRefLabel,
    validate: validateRefTarget,
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
  percent: {
    Cell: PercentCell,
    toText: formatPercent,
    align: "right",
    validate: (column) =>
      column.decimals !== undefined &&
      !(Number.isInteger(column.decimals) && column.decimals >= 0 && column.decimals <= 20)
        ? ['"decimals" debe ser un número entero entre 0 y 20']
        : [],
  },
  boolean: {
    Cell: BooleanCell,
    toText: formatBoolean,
  },
  chips: {
    Cell: ChipsCell,
    requiresOneOf: ["entity", "catalog"],
    lookupSource: getRefSourceKey,
    toText: (value, column, lookups) =>
      toIdList(value)
        .map((id) => getRefLabel(id, column, lookups))
        .join(", "),
    validate: validateRefTarget,
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