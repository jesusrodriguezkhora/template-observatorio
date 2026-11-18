import { getResource, listResource } from "../services/dataService";
import { getColumnType } from "../columns";
import { NotFoundError } from "../services/errors";
import { getAncestors, getEntity, getRelationPath } from "./registry";
import { getLookupSource } from "./lookupSources";

function getLookupKeys(defs) {
  const keys = defs
    .map((def) => getColumnType(def.type).lookupSource?.(def))
    .filter(Boolean);
  return [...new Set(keys)];
}

const catalogCache = new Map();

function listLookupSource(source) {
  if (source.kind !== "catalog") {
    return listResource(source.key);
  }
  if (!catalogCache.has(source.key)) {
    const request = listResource(source.key).catch((error) => {
      catalogCache.delete(source.key);
      throw error;
    });
    catalogCache.set(source.key, request);
  }
  return catalogCache.get(source.key);
}

export async function loadLookups(defs) {
  const sources = getLookupKeys(defs).map(getLookupSource);
  const results = await Promise.all(sources.map(listLookupSource));

  return Object.fromEntries(
    sources.map((source, index) => [
      source.key,
      {
        ...source,
        rows: Object.fromEntries(results[index].map((row) => [String(row.id), row])),
      },
    ]),
  );
}

export async function loadBrowserData(entityKey) {
  const entity = getEntity(entityKey);
  const [rows, lookups] = await Promise.all([
    listResource(entity.key),
    loadLookups(entity.columns),
  ]);
  return { rows, lookups };
}

export async function loadTrail(entityKey, record) {
  const trail = [{ entity: getEntity(entityKey), record }];
  const ancestors = getAncestors(entityKey).reverse();

  for (const ancestor of ancestors) {
    const child = trail[0];
    const parentId = child.record[child.entity.parent.field];
    if (parentId === null || parentId === undefined) {
      break;
    }

    try {
      const parentRecord = await getResource(ancestor.key, parentId);
      trail.unshift({ entity: ancestor, record: parentRecord });
    } catch (error) {
      if (error instanceof NotFoundError) {
        break;
      }
      throw error;
    }
  }

  return trail;
}

export async function loadDetailData(entityKey, id, valueDefs) {
  const [record, lookups] = await Promise.all([
    getResource(entityKey, id),
    loadLookups(valueDefs),
  ]);
  const trail = await loadTrail(entityKey, record);
  return { record, lookups, trail };
}

async function loadRelatedRows(fromKey, id, toKey) {
  const path = getRelationPath(fromKey, toKey);
  if (!path) {
    throw new Error(`"${toKey}" no está relacionado con "${fromKey}"`);
  }

  let ids = [id];
  let rows = [];
  for (const step of path) {
    rows = ids.length > 0 ? await listResource(step.entity, { [step.field]: ids }) : [];
    ids = rows.map((row) => row.id);
  }
  return rows;
}

export async function loadRelatedData(fromKey, id, toKey) {
  const target = getEntity(toKey);
  const [rows, lookups] = await Promise.all([
    loadRelatedRows(fromKey, id, toKey),
    loadLookups(target.columns),
  ]);
  return { rows, lookups };
}