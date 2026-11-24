import { API_URL } from "../config/api";
import { ApiError, NotFoundError } from "./errors";

function buildUrl(path, filters = {}) {
  const url = new URL(`${API_URL}/${path}`, window.location.origin);
  for (const [field, value] of Object.entries(filters)) {
    for (const item of [value].flat()) {
      url.searchParams.append(field, String(item));
    }
  }
  return url;
}

async function readDetail(response) {
  try {
    const body = await response.json();
    return typeof body?.detail === "string" ? body.detail : null;
  } catch {
    return null;
  }
}

async function request(url) {
  const response = await fetch(url, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new ApiError(response.status, await readDetail(response));
  }
  return response.json();
}

export function list(resource, filters) {
  return request(buildUrl(resource, filters));
}

export async function get(resource, id) {
  try {
    return await request(buildUrl(`${resource}/${encodeURIComponent(id)}`));
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw new NotFoundError(resource, id);
    }
    throw error;
  }
}