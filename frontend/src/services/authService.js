import { API_URL } from "../config/api";
import * as httpAuthAdapter from "./httpAuthAdapter";
import * as mockAuthAdapter from "./mockAuthAdapter";

const adapter = API_URL ? httpAuthAdapter : mockAuthAdapter;

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

export function confirmPasswordReset(token, password) {
  return adapter.confirmPasswordReset(token, password);
}