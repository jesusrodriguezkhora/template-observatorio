import InfoFragment from "./InfoFragment";
import { getRefSourceKey, isEmptyValue } from "../columns/helpers";
import { toValueDef } from "./helpers";
import TitleFragment from "./TitleFragment";
import { resolveSlot, slotValueDefs, validateSlot } from "./slots";
import KeyValueFragment from "./KeyValueFragment";
import { isRowEmpty, validateRows } from "./keyvalueRows";
import ListFragment from "./ListFragment";
import { isListEmpty, toListValueDef, validateList } from "./listItems";
import ChartFragment from "./ChartFragment";
import { CHART_TYPES } from "../charts";

const TITLE_SLOTS = ["image", "overline", "title", "subtitle"];

function validateChartFragment(fragment) {
  if (fragment.chart === undefined) {
    return [];
  }
  const chartType = CHART_TYPES[fragment.chart];
  if (!chartType) {
    return [`el tipo de gráfico "${fragment.chart}" no existe`];
  }
  const missing = (chartType.requires ?? [])
    .filter((option) => fragment[option] === undefined)
    .map(
      (option) =>
        `el gráfico "${fragment.chart}" necesita la opción "${option}"`,
    );
  return [...missing, ...(chartType.validate?.(fragment) ?? [])];
}

export const FRAGMENT_TYPES = Object.freeze({
  info: {
    Fragment: InfoFragment,
    requiresOneOf: ["field", "text"],
    valueDefs: (fragment) => (fragment.field ? [toValueDef(fragment)] : []),
    isEmpty: (fragment, record) =>
      fragment.field ? isEmptyValue(record[fragment.field]) : isEmptyValue(fragment.text),
  },
  title: {
    Fragment: TitleFragment,
    requires: ["title"],
    valueDefs: (fragment) =>
      TITLE_SLOTS.flatMap((name) => slotValueDefs(fragment[name])),
    isEmpty: (fragment, record) =>
      TITLE_SLOTS.every((name) => resolveSlot(fragment[name], record) === null),
    validate: (fragment) =>
      TITLE_SLOTS.flatMap((name) => validateSlot(fragment[name], name)),
  },
  keyvalue: {
    Fragment: KeyValueFragment,
    requires: ["rows"],
    valueDefs: (fragment) =>
      (fragment.rows ?? []).filter((row) => row.field).map(toValueDef),
    isEmpty: (fragment, record) =>
      fragment.rows.every((row) => isRowEmpty(row, record)),
    validate: (fragment) =>
      fragment.rows === undefined ? [] : validateRows(fragment.rows),
  },
  list: {
    Fragment: ListFragment,
    requires: ["field"],
    requiresOneOf: ["entity", "catalog"],
    valueDefs: (fragment) =>
      fragment.field && getRefSourceKey(fragment)
        ? [toListValueDef(fragment)]
        : [],
    isEmpty: isListEmpty,
    validate: validateList,
  },
  chart: {
    Fragment: ChartFragment,
    requires: ["chart"],
    isEmpty: (fragment, record) =>
      CHART_TYPES[fragment.chart]?.isEmpty?.(fragment, record) ?? false,
    validate: validateChartFragment,
  },
});

export function getFragmentType(type) {
  const fragmentType = FRAGMENT_TYPES[type];
  if (!fragmentType) {
    throw new Error(`Tipo de fragmento desconocido: "${type}"`);
  }
  return fragmentType;
}

export function getFragmentValueDefs(fragments) {
  return fragments.flatMap((fragment) => getFragmentType(fragment.type).valueDefs?.(fragment) ?? []);
}