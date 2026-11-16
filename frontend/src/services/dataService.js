import * as adapter from "./mockAdapter";

export function listResource(resource, filters) {
  return adapter.list(resource, filters);
}

export function getResource(resource, id) {
  return adapter.get(resource, id);
}