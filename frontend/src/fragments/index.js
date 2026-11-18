import InfoFragment from "./InfoFragment";
import { isEmptyValue } from "../columns/helpers";
import { toValueDef } from "./helpers";
import TitleFragment from "./TitleFragment";
import { resolveSlot, slotValueDefs, validateSlot } from "./slots";
import KeyValueFragment from "./KeyValueFragment";
import { isRowEmpty, validateRows } from "./keyvalueRows";

const TITLE_SLOTS = ["image", "overline", "title", "subtitle"];

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