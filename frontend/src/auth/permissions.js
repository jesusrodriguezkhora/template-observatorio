import { SUPER_ROLE } from "../config/roles";

export function canAccess(role, allowedRoles) {
  if (role === SUPER_ROLE) {
    return true;
  }
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }
  return allowedRoles.includes(role);
}