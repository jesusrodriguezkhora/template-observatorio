import { CHART_CONFIG } from "../config/charts";
import { getEntity } from "../entities/registry";
import { loadRelatedRows } from "../entities/queries";
import { getFieldParts, getGroupedParts, getRowParts } from "./distribution";

export function hasFieldParts(chart) {
  return Array.isArray(chart.parts);
}

export function getChartFieldParts(chart, record) {
  return getFieldParts(chart.parts, record);
}

export function getRowPartsKey(chart) {
  const { entity, value, groupBy } = chart.parts;
  return groupBy ? `${entity}/group:${groupBy}` : `${entity}/${value}`;
}

export async function loadChartRowParts(chart, entity, record) {
  const rows = await loadRelatedRows(entity.key, record.id, chart.parts.entity);
  if (chart.parts.groupBy) {
    const emptyLabel = chart.parts.emptyLabel ?? CHART_CONFIG.emptyGroupLabel;
    return getGroupedParts(chart.parts, rows, emptyLabel);
  }
  const { displayField } = getEntity(chart.parts.entity);
  return getRowParts(chart.parts, rows, displayField);
}