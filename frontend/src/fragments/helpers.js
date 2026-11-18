export function toValueDef(fragment) {
  return { ...fragment, type: fragment.valueType, label: fragment.label ?? fragment.subtitle ?? fragment.field, };
}