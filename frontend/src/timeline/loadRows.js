import { getEntity } from "../entities/registry";
import { loadRelatedRows } from "../entities/queries";
import { buildTimeline, getFieldRows, getRelatedRows } from "./timeline";

export function hasFieldRows(fragment) {
  return Array.isArray(fragment.rows);
}

export function getTimelineRowsKey(fragment) {
  const { entity, start, end } = fragment.rows;
  return `${entity}/${start}/${end}`;
}

export function getTimelineFieldRows(fragment, record) {
  return getFieldRows(fragment.rows, record);
}

export async function loadTimelineRelatedRows(fragment, entity, record) {
  const rows = await loadRelatedRows(
    entity.key,
    record.id,
    fragment.rows.entity,
  );
  const { displayField } = getEntity(fragment.rows.entity);
  return getRelatedRows(fragment.rows, rows, displayField);
}

export function isTimelineEmpty(fragment, record) {
  if (!hasFieldRows(fragment)) {
    return false;
  }
  return buildTimeline(getTimelineFieldRows(fragment, record)) === null;
}