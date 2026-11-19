import { CHART_CONFIG } from "../config/charts";
import { MAX_SERIES } from "./colors";
import { buildDistribution, foldParts, toNumber } from "./distribution";

export function buildChartDistribution(chart, record, parts) {
  const folded = foldParts(
    parts,
    MAX_SERIES,
    chart.otherLabel ?? CHART_CONFIG.otherLabel,
  );
  const total = chart.total ? toNumber(record[chart.total]) : null;
  return buildDistribution(folded, total, {
    remainderLabel: chart.remainderLabel,
  });
}