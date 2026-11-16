import FieldsTab from "./FieldsTab";
import RelatedTab from "./RelatedTab";

export const TAB_TYPES = Object.freeze({
  fields: {
    Panel: FieldsTab,
    requires: ["fields"],
    valueDefs: (tab) => tab.fields,
  },
  related: {
    Panel: RelatedTab,
    requires: ["entity"],
    relatedEntity: (tab) => tab.entity,
  },
});

export function getTabType(type) {
  const tabType = TAB_TYPES[type];
  if (!tabType) {
    throw new Error(`Tipo de pestaña desconocido: "${type}"`);
  }
  return tabType;
}

export function getTabValueDefs(tabs) {
  return tabs.flatMap((tab) => getTabType(tab.type).valueDefs?.(tab) ?? []);
}