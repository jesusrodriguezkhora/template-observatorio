import BarChart from "./BarChart";
import { validateDistribution } from "./validateChart";
import { hasFieldParts, getChartFieldParts } from "./loadParts";
import { buildChartDistribution } from "./buildChartDistribution";

function isDistributionEmpty(chart, record) {
  if (!hasFieldParts(chart)) {
    return false;
  }
  return (
    buildChartDistribution(chart, record, getChartFieldParts(chart, record)) ===
    null
  );
}

export const CHART_TYPES = Object.freeze({
  bar: {
    Chart: BarChart,
    requires: ["parts"],
    isEmpty: isDistributionEmpty,
    validate: validateDistribution,
  },
});