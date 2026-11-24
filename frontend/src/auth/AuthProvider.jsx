import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { canAccess } from "./permissions";
import * as authService from "../services/authService";
import { onSessionExpired } from "../services/sessionEvents";

const LOADING = Object.freeze({ status: "loading", user: null });
const ANONYMOUS = Object.freeze({ status: "anonymous", user: null });

function toSession(user) {
  return user ? { status: "authenticated", user } : ANONYMOUS;
}

function AuthProvider({ children }) {
  const [session, setSession] = useState(LOADING);

  useEffect(() => {
    let active = true;
    authService
      .getSession()
      .then((user) => active && setSession(toSession(user)))
      .catch(() => active && setSession(ANONYMOUS));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => onSessionExpired(() => setSession(ANONYMOUS)), []);
  const login = useCallback(async (email, password) => {
    const user = await authService.login(email, password);
    setSession(toSession(user));
    return user;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setSession(ANONYMOUS);
  }, []);

  const value = useMemo(() => {
    const role = session.user?.role ?? null;
    return {
      status: session.status,
      user: session.user,
      role,
      login,
      logout,
      canAccess: (allowedRoles) => canAccess(role, allowedRoles),
    };
  }, [session, login, logout]);

  return <AuthContext value={value}>{children}</AuthContext>;
}

export default AuthProvider;