import "./style/output.css";
import Dashboard from "./pages/Dashboard/pages/Dashboard";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Videos from "./pages/Dashboard/pages/Videos";
import Assignment from "./pages/Dashboard/pages/Assignment";
import Quizzes from "./pages/Dashboard/pages/Quizzes";
import AssignmentMark from "./pages/Dashboard/pages/AssignmentMark";
import useAuthCheck from "./hooks/useAuthCheck";
import PublicRoute from "./utility/PublicRoute";

import AdminPrivateRoute from "./utility/AdminPrivateRoute";
import StudentLogin from "./pages/auth/StudentLogin";
import Registration from "./pages/auth/Registration";
import CoursePlayer from "./pages/StudentPortal/pages/CoursePlayer";
import Leaderboard from "./pages/StudentPortal/pages/Leaderboard";
import AdminLogin from "./pages/auth/AdminLogin";
import StudentPrivateRoute from "./utility/StudentPrivateRoute";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication</div>
  ) : (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />

        <Route
          path="/student/register"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />

        <Route
          path="/course-player/:videoId"
          element={
            <StudentPrivateRoute>
              <CoursePlayer />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <StudentPrivateRoute>
              <Leaderboard />
            </StudentPrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminPrivateRoute>
              <Videos />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <AdminPrivateRoute>
              <Assignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <AdminPrivateRoute>
              <Quizzes />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment-mark"
          element={
            <AdminPrivateRoute>
              <AssignmentMark />
            </AdminPrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
