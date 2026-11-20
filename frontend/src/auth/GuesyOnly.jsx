import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthContext";
import { getRedirectPath } from "./redirect";
import FullScreenLoader from "../components/FullScreenLoader";

function GuestOnly() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <FullScreenLoader />;
  }
  if (status === "authenticated") {
    return <Navigate to={getRedirectPath(location)} replace />;
  }
  return <Outlet />;
}

export default GuestOnly;