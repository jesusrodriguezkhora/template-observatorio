import { getEntity } from "../entities/registry";
import { loadRelatedRows } from "../entities/queries";
import { getFieldParts, getRowParts } from "./distribution";

export function hasFieldParts(chart) {
  return Array.isArray(chart.parts);
}

export function getChartFieldParts(chart, record) {
  return getFieldParts(chart.parts, record);
}

export async function loadChartRowParts(chart, entity, record) {
  const rows = await loadRelatedRows(entity.key, record.id, chart.parts.entity);
  const { displayField } = getEntity(chart.parts.entity);
  return getRowParts(chart.parts, rows, displayField);
}