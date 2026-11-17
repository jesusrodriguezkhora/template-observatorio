import FieldsTab from "./FieldsTab";
import RelatedTab from "./RelatedTab";
import GridTab from "./GridTab";
import { getFragmentValueDefs } from "../fragments";
import { getGridWidgets } from "../widgets/visibility";

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
  grid: {
    Panel: GridTab,
    requires: ["grids"],
    widgetGrids: (tab) => tab.grids,
    valueDefs: (tab, entity) =>
      getFragmentValueDefs(
        getGridWidgets(tab.grids, entity.widgets).flatMap((widget) => widget.fragments),
      ),
  },
});

export function getTabType(type) {
  const tabType = TAB_TYPES[type];
  if (!tabType) {
    throw new Error(`Tipo de pestaña desconocido: "${type}"`);
  }
  return tabType;
}

export function getTabValueDefs(entity) {
  return entity.detail.tabs.flatMap((tab) => getTabType(tab.type).valueDefs?.(tab, entity) ?? []);
}