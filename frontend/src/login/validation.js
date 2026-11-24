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

export function validateNewPassword(password) {
  if (password === "") {
    return errors.passwordRequired;
  }
  const min = LOGIN_CONFIG.passwordMinLength;
  return password.length < min
    ? errors.passwordTooShort.replace("{min}", String(min))
    : null;
}

export function validatePasswordRepeat(password, repeat) {
  return repeat === password ? null : errors.passwordMismatch;
}