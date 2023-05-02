import { useSelector } from "react-redux";

const useAuthRole = () => {
  const auth = useSelector((state) => state.auth);

  if (auth?.token && auth?.user && auth?.user?.role === "admin") {
    return true;
  } else {
    return false;
  }
};

export default useAuthRole;
