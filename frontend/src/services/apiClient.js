import { API_URL } from "../config/api";
import { ApiError } from "./errors";
import { notifySessionExpired } from "./sessionEvents";

function buildUrl(path, params = {}) {
  const url = new URL(`${API_URL}/${path}`, window.location.origin);
  for (const [field, value] of Object.entries(params)) {
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

export async function apiRequest(path, { method = "GET", params, body } = {}) {
  const hasBody = body !== undefined;
  const response = await fetch(buildUrl(path, params), {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(hasBody && { "Content-Type": "application/json" }),
    },
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    if (response.status === 401) {
      notifySessionExpired();
    }
    throw new ApiError(response.status, await readDetail(response));
  }
  return response.status === 204 ? null : response.json();
}