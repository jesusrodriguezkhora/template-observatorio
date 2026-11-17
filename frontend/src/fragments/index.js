import InfoFragment from "./InfoFragment";
import { isEmptyValue } from "../columns/helpers";
import { toValueDef } from "./helpers";

export const FRAGMENT_TYPES = Object.freeze({
  info: {
    Fragment: InfoFragment,
    requiresOneOf: ["field", "text"],
    valueDefs: (fragment) => (fragment.field ? [toValueDef(fragment)] : []),
    isEmpty: (fragment, record) =>
      fragment.field ? isEmptyValue(record[fragment.field]) : isEmptyValue(fragment.text),
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