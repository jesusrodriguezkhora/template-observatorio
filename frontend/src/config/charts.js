export const CHART_CONFIG = Object.freeze({
  palette: {
    light: ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#6250d6", "#e34948"],
    dark: ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#0ca30c", "#9085e9", "#e66767"],
  },
  otherLabel: "Otros",
  emptyGroupLabel: "Sin valor",
  remainderColor: "action.disabledBackground",
  segmentGap: 2,
  bar: {
    height: 24,
    radius: 1,
    labelMinShare: 0.08,
    labelColor: "common.white",
  },
  legend: {
    percentDecimals: 0,
    swatchSize: 10,
  },
});