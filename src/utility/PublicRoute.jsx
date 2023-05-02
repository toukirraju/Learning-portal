import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import useAuthRole from "../hooks/useAuthRole";
import { useFetchVideosQuery } from "../redux/featuers/videos/videosApi";

const PublicRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  const isAdmin = useAuthRole();

  const { data: videos, isLoading, isError } = useFetchVideosQuery();

  if (!isLoading && !isError) {
    //decide route
    let route = null;

    if (!isLoggedIn) {
      route = children;
    } else {
      if (isLoggedIn && isAdmin) {
        route = <Navigate to="/admin/dashboard" replace />;
      } else {
        route = <Navigate to={`/course-player/${videos[0].id}`} replace />;
      }
    }

    return route;
  }
};

export default PublicRoute;
