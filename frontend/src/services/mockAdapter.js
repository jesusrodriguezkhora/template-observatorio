import { MOCK_DB } from "../mocks/data";
import { NotFoundError } from "./errors";

const MOCK_DELAY_MS = 50;

function respond(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(value)), MOCK_DELAY_MS);
  });
}

function getTable(resource) {
  const table = MOCK_DB[resource];
  if (!table) {
    throw new Error(`Recurso desconocido: "${resource}"`);
  }
  return table;
}

function matchesFilters(row, filters) {
  return Object.entries(filters).every(([field, expected]) => {
    const value = String(row[field]);
    if (Array.isArray(expected)) {
      return expected.map(String).includes(value);
    }
    return value === String(expected);
  });
}

export async function list(resource, filters = {}) {
  const rows = getTable(resource).filter((row) => matchesFilters(row, filters));
  return respond(rows);
}

export async function get(resource, id) {
  const row = getTable(resource).find((candidate) => String(candidate.id) === String(id));
  if (!row) {
    throw new NotFoundError(resource, id);
  }
  return respond(row);
}