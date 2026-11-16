import { listResource } from "../services/dataService";
import { COLUMN_TYPES } from "../columns";
import { getEntity } from "./registry";

function getLookupKeys(columns) {
  const keys = columns
    .map((column) => COLUMN_TYPES[column.type].lookupEntity?.(column))
    .filter(Boolean);
  return [...new Set(keys)];
}

export async function loadBrowserData(entityKey) {
  const entity = getEntity(entityKey);
  const lookupKeys = getLookupKeys(entity.columns);

  const [rows, ...lookupResults] = await Promise.all([
    listResource(entity.key),
    ...lookupKeys.map((lookupKey) => listResource(lookupKey)),
  ]);

  const lookups = {};
  lookupKeys.forEach((lookupKey, index) => {
    const { displayField } = getEntity(lookupKey);
    lookups[lookupKey] = Object.fromEntries(
      lookupResults[index].map((lookupRow) => [String(lookupRow.id), lookupRow[displayField]]),
    );
  });

  return { rows, lookups };
}