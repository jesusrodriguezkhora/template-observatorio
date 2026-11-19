import { CHART_CONFIG } from "../config/charts";

export function getItemColor(item) {
  if (item.color) {
    return item.color;
  }
  if (item.isRemainder || item.slot === null) {
    return CHART_CONFIG.remainderColor;
  }
  return `chart.series${item.slot + 1}`;
}

export const MAX_SERIES = CHART_CONFIG.palette.light.length;