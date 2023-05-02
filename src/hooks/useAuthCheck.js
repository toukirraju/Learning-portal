import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loggedIn } from "../redux/featuers/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();

  const [authCheck, setAuthCheck] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);

      if (auth?.token && auth?.user) {
        dispatch(
          loggedIn({
            token: auth.token,
            user: auth.user,
          })
        );
      }
    }
    setAuthCheck(true);
  }, []);

  return authCheck;
};

export default useAuthCheck;
