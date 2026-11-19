import { isEmptyValue } from "../columns/helpers";

const DAY = 24 * 60 * 60 * 1000;
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

export function toTime(value) {
  if (isEmptyValue(value)) {
    return null;
  }
  const match = typeof value === "string" ? DATE_ONLY.exec(value) : null;
  const time = match
    ? Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value).getTime();
  return Number.isFinite(time) ? time : null;
}

function yearStart(year) {
  return Date.UTC(year, 0, 1);
}

export function getFieldRows(rows, record) {
  return rows.map((row, index) => ({
    key: `row-${index}`,
    label: row.label,
    start: record[row.start],
    end: record[row.end],
    slot: index,
  }));
}

export function getRelatedRows(config, rows, displayField) {
  return rows.map((row, index) => ({
    key: String(row.id),
    label: row[config.label ?? displayField],
    start: row[config.start],
    end: row[config.end],
    slot: index,
  }));
}

export function buildTimeline(items) {
  const timed = items.map((item) => {
    const startTime = toTime(item.start);
    const endTime = toTime(item.end);
    const valid =
      startTime !== null && endTime !== null && endTime >= startTime;
    return valid
      ? { ...item, startTime, endTime: endTime + DAY }
      : { ...item, startTime: null, endTime: null };
  });

  const dated = timed.filter((item) => item.startTime !== null);
  if (dated.length === 0) {
    return null;
  }

  const firstYear = Math.min(
    ...dated.map((item) => new Date(item.startTime).getUTCFullYear()),
  );
  const lastYear = Math.max(
    ...dated.map((item) => new Date(item.endTime - DAY).getUTCFullYear()),
  );
  const start = yearStart(firstYear);
  const end = yearStart(lastYear + 1);
  const span = end - start;

  const years = [];
  for (let year = firstYear; year <= lastYear; year += 1) {
    years.push({
      year,
      left: (yearStart(year) - start) / span,
      width: (yearStart(year + 1) - yearStart(year)) / span,
    });
  }

  const rows = timed.map((item) =>
    item.startTime === null
      ? { ...item, left: null, width: null }
      : {
          ...item,
          left: (item.startTime - start) / span,
          width: (item.endTime - item.startTime) / span,
        },
  );

  return { start, end, years, rows };
}