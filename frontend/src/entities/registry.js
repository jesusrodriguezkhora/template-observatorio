import { ENTITY_DEFINITIONS } from "../config/entities";
import { validateEntities } from "./validateEntities";

function deepFreeze(value) {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

if (import.meta.env.DEV) {
  const errors = validateEntities(ENTITY_DEFINITIONS);
  if (errors.length > 0) {
    throw new Error(`Configuración de entidades inválida:\n- ${errors.join("\n- ")}`);
  }
}

const ENTITIES = deepFreeze(
  Object.fromEntries(ENTITY_DEFINITIONS.map((entity) => [entity.key, entity])),
);

const MAX_DEPTH = ENTITY_DEFINITIONS.length;

export function getEntity(key) {
  const entity = ENTITIES[key];
  if (!entity) {
    throw new Error(`Entidad desconocida: "${key}"`);
  }
  return entity;
}

export function getAllEntities() {
  return Object.values(ENTITIES);
}

export function getAncestors(key) {
  const ancestors = [];
  let current = getEntity(key);
  while (current.parent) {
    if (ancestors.length >= MAX_DEPTH) {
      throw new Error(`Ciclo en la jerarquía de "${key}"`);
    }
    current = getEntity(current.parent.entity);
    ancestors.unshift(current);
  }
  return ancestors;
}

export function getRelationPath(fromKey, toKey) {
  const path = [];
  let current = getEntity(toKey);
  while (current.key !== fromKey) {
    if (!current.parent || path.length >= MAX_DEPTH) {
      return null;
    }
    path.unshift({ entity: current.key, field: current.parent.field });
    current = getEntity(current.parent.entity);
  }
  return path;
}

export function getBrowserPath(key) {
  return `/${key}`;
}

export function getDetailPath(key, id) {
  return `/${key}/${id}`;
}