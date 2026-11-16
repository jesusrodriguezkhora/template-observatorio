import { useAuth } from "./AuthContext";

function RequireRole({ roles, fallback = null, children }) {
  const { canAccess } = useAuth();
  return canAccess(roles) ? children : fallback;
}

export default RequireRole;