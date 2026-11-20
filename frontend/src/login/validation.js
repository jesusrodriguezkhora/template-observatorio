import { LOGIN_CONFIG } from "../config/login";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const { errors } = LOGIN_CONFIG;

export function validateEmail(email) {
  const value = email.trim();
  if (value === "") {
    return errors.emailRequired;
  }
  if (!EMAIL_PATTERN.test(value)) {
    return errors.emailInvalid;
  }
  return null;
}

export function validatePassword(password) {
  return password === "" ? errors.passwordRequired : null;
}