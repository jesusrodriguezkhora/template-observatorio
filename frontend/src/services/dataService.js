import { API_RESOURCES, API_URL } from "../config/api";
import * as httpAdapter from "./httpAdapter";
import * as mockAdapter from "./mockAdapter";

function adapterFor(resource) {
  return API_URL && API_RESOURCES.has(resource) ? httpAdapter : mockAdapter;
}

export function listResource(resource, filters) {
  return adapterFor(resource).list(resource, filters);
}

export function getResource(resource, id) {
  return adapterFor(resource).get(resource, id);
}