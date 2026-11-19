import { formatNumber } from "./formatters";

function NumberCell({ value, column }) {
  return formatNumber(value, column);
}

export default NumberCell;