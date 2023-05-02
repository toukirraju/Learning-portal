import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAuthRole from "../hooks/useAuthRole";

const AdminPrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  const isAdmin = useAuthRole();

  // decide routes
  let route = null;

  if (isLoggedIn && isAdmin) {
    route = children;
  } else {
    if (isLoggedIn && isAdmin) {
      route = <Navigate to="/admin/dashboard" replace />;
    } else {
      route = <Navigate to="/" replace />;
    }
  }

  return route;
};

export default AdminPrivateRoute;
