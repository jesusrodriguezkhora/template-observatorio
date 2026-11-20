import * as adapter from "./mockAuthAdapter";

export function login(email, password) {
  return adapter.login(email, password);
}

export function logout() {
  return adapter.logout();
}

export function getSession() {
  return adapter.getSession();
}

export function requestPasswordReset(email) {
  return adapter.requestPasswordReset(email);
}