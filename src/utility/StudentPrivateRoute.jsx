import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAuthRole from "../hooks/useAuthRole";
import { useFetchVideosQuery } from "../redux/featuers/videos/videosApi";

const StudentPrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  const isAdmin = useAuthRole();

  const { data: videos, isLoading, isError } = useFetchVideosQuery();

  if (!isLoading && !isError) {
    // decide route
    let route = null;

    if (isLoggedIn && !isAdmin) {
      route = children;
    } else {
      if (isLoggedIn && !isAdmin) {
        route = <Navigate to={`/course-player/${videos[0].id}`} replace />;
      } else {
        route = <Navigate to="/" replace />;
      }
    }

    return route;
  }
};

export default StudentPrivateRoute;
