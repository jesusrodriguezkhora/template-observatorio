import { listResource } from "../services/dataService";
import { getEntity } from "./registry";

export async function loadBrowserData(entityKey) {
  const entity = getEntity(entityKey);
  const refKeys = [
    ...new Set(entity.browser.columns.filter((column) => column.ref).map((column) => column.ref)),
  ];

  const [rows, ...refResults] = await Promise.all([
    listResource(entity.key),
    ...refKeys.map((refKey) => listResource(refKey)),
  ]);

  const lookups = {};
  refKeys.forEach((refKey, index) => {
    const { displayField } = getEntity(refKey);
    lookups[refKey] = Object.fromEntries(
      refResults[index].map((refRow) => [String(refRow.id), refRow[displayField]]),
    );
  });

  return { rows, lookups };
}