import { getColumnType } from "./index";

function ColumnValue({ def, row, entity, lookups }) {
  const value = row[def.field];

  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const { Cell } = getColumnType(def.type);
  return <Cell value={value} row={row} column={def} entity={entity} lookups={lookups} />;
}

export default ColumnValue;