import { formatDate } from "./formatters";

function DateCell({ value, column }) {
  return formatDate(value, column);
}

export default DateCell;