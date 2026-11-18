import { formatCurrency } from "./formatters";

function CurrencyCell({ value, column }) {
  return formatCurrency(value, column);
}

export default CurrencyCell;