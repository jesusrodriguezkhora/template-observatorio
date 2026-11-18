import { CATALOG_DEFINITIONS } from "../config/catalogs";
import { deepFreeze } from "../utils/deepFreeze";
import { getEntity } from "./registry";

const CATALOGS = deepFreeze(
  Object.fromEntries(CATALOG_DEFINITIONS.map((catalog) => [catalog.key, catalog])),
);

export function getLookupSource(key) {
  if (Object.hasOwn(CATALOGS, key)) {
    return { kind: "catalog", ...CATALOGS[key] };
  }
  const entity = getEntity(key);
  return { kind: "entity", key: entity.key, displayField: entity.displayField };
}