import { HOME_PATH, LOGIN_PATH } from "../config/navigation";

export function getRedirectPath(location) {
  const from = location.state?.from;
  if (!from?.pathname || from.pathname === LOGIN_PATH) {
    return HOME_PATH;
  }
  return `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`;
}