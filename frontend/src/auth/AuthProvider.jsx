import { useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { canAccess } from "./permissions";
import { DEFAULT_ROLE } from "../config/roles";

function AuthProvider({ children }) {
  const role = DEFAULT_ROLE;

  const value = useMemo(
    () => ({
      role,
      canAccess: (allowedRoles) => canAccess(role, allowedRoles),
    }),
    [role],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export default AuthProvider;