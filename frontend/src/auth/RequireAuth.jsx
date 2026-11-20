import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthContext";
import { LOGIN_PATH } from "../config/navigation";
import FullScreenLoader from "../components/FullScreenLoader";

function RequireAuth() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <FullScreenLoader />;
  }
  if (status === "anonymous") {
    return <Navigate to={LOGIN_PATH} replace state={{ from: location }} />;
  }
  return <Outlet />;
}

export default RequireAuth;