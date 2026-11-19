import { toNumber } from "./distribution";

export function getGoalTarget(chart, record) {
  const target = toNumber(record[chart.target]);
  return target !== null && target > 0 ? target : null;
}

export function buildGoalBars(chart, record) {
  const target = getGoalTarget(chart, record);
  if (target === null) {
    return null;
  }

  return chart.bars.map((bar, index) => {
    const value = toNumber(record[bar.field]);
    const ratio = value === null ? 0 : Math.max(value, 0) / target;
    return {
      key: bar.field,
      label: bar.label,
      value,
      ratio,
      fill: Math.min(ratio, 1),
      color: bar.color ?? null,
      slot: index,
    };
  });
}