import { formatBoolean } from "./formatters";

function BooleanCell({ value, column }) {
  return formatBoolean(value, column);
}

export default BooleanCell;