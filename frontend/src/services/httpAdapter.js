import { apiRequest } from "./apiClient";
import { ApiError, NotFoundError } from "./errors";

export function list(resource, filters) {
  return apiRequest(resource, { params: filters });
}

export async function get(resource, id) {
  try {
    return await apiRequest(`${resource}/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw new NotFoundError(resource, id);
    }
    throw error;
  }
}