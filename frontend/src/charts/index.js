import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import GoalChart from "./GoalChart";
import {
  validateDistribution,
  validateDonut,
  validateGoal,
} from "./validateChart";
import { hasFieldParts, getChartFieldParts } from "./loadParts";
import { buildChartDistribution } from "./buildChartDistribution";
import { getGoalTarget } from "./goal";

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
  donut: {
    Chart: DonutChart,
    requires: ["parts"],
    isEmpty: isDistributionEmpty,
    validate: validateDonut,
  },
  goal: {
    Chart: GoalChart,
    requires: ["target", "bars"],
    isEmpty: (chart, record) => getGoalTarget(chart, record) === null,
    validate: validateGoal,
  },
});