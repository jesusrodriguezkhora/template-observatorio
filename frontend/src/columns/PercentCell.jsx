import { formatPercent } from "./formatters";

function PercentCell({ value, column }) {
  return formatPercent(value, column);
}

export default PercentCell;