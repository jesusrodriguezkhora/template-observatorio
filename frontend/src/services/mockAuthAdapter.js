import { MOCK_USERS } from "../mocks/users";
import { AuthError, ResetLinkError } from "./errors";

const MOCK_DELAY_MS = 300;
const SESSION_KEY = "observatorio.mockSession";

function respond(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), MOCK_DELAY_MS);
  });
}

function toPublicUser({ password: _password, ...user }) {
  return user;
}

function normalizeEmail(email) {
  return String(email ?? "")
    .trim()
    .toLowerCase();
}

export async function login(email, password) {
  const user = MOCK_USERS.find(
    (candidate) =>
      candidate.email === normalizeEmail(email) &&
      candidate.password === password,
  );
  await respond(null);
  if (!user) {
    throw new AuthError();
  }
  localStorage.setItem(SESSION_KEY, String(user.id));
  return toPublicUser(user);
}

export async function logout() {
  localStorage.removeItem(SESSION_KEY);
  return respond(null);
}

export async function getSession() {
  const id = localStorage.getItem(SESSION_KEY);
  const user = MOCK_USERS.find((candidate) => String(candidate.id) === id);
  return respond(user ? toPublicUser(user) : null);
}

export async function requestPasswordReset(_email) {
  return respond(null);
}

export async function confirmPasswordReset(token, _password) {
  await respond(null);
  if (token === "caducado") {
    throw new ResetLinkError();
  }
}