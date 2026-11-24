import { apiRequest } from "./apiClient";
import { ApiError, AuthError, ResetLinkError } from "./errors";

function isUnauthorized(error) {
  return error instanceof ApiError && error.status === 401;
}

export async function login(email, password) {
  try {
    const { user } = await apiRequest("auth/login", {
      method: "POST",
      body: { email, password },
    });
    return user;
  } catch (error) {
    throw isUnauthorized(error) ? new AuthError() : error;
  }
}

export async function logout() {
  await apiRequest("auth/logout", { method: "POST" });
}

export async function getSession() {
  try {
    const { user } = await apiRequest("auth/me");
    return user;
  } catch (error) {
    if (isUnauthorized(error)) {
      return null;
    }
    throw error;
  }
}

export async function requestPasswordReset(email) {
  await apiRequest("auth/password-reset", { method: "POST", body: { email } });
}

export async function confirmPasswordReset(token, password) {
  try {
    await apiRequest("auth/password-reset/confirm", {
      method: "POST",
      body: { token, password },
    });
  } catch (error) {
    throw error instanceof ApiError && error.status === 400
      ? new ResetLinkError()
      : error;
  }
}