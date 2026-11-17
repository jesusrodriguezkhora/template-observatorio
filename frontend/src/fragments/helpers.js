export function toValueDef(fragment) {
  return { ...fragment, type: fragment.valueType, label: fragment.subtitle ?? fragment.field };
}