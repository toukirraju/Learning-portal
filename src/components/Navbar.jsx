import { Link, useNavigate } from "react-router-dom";
import lwsLogo from "../assets/image/learningportal.svg";
import { useDispatch, useSelector } from "react-redux";
import { adminLoggedOut } from "../redux/featuers/auth/authSlice";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(adminLoggedOut());
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="shadow-md sticky top-0">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to="/">
          <img className="h-10 w-6/12 sm:w-auto" src={lwsLogo} />
        </Link>
        <div className="flex items-center gap-3">
          {/* admin dashboard */}
          {user?.role === "admin" && (
            <Link to="/admin/dashboard">
              <h2 className="font-bold">Admin</h2>
            </Link>
          )}

          {user?.role === "student" && (
            <>
              <Link to="/leaderboard">Leaderboard</Link>
              <h2 class="font-bold">{user?.name}</h2>
            </>
          )}

          {/* logout button  */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
