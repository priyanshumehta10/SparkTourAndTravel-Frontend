import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import SharedRoute from "./routes/SharedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Home from "./features/Home";
import Dashboard from "./features/Dashboard";
import Login from "./features/Login";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchUser } from "./Auth/slice";
import type { RootState } from "./redux/store";
import Users from "./features/Users";
import Inquiries from "./features/Inquiries";
import Review from "./features/Review";
import Packages from "./features/Packages";
import CreatePackages from "./features/Packages/components/CreatePackages";

export default function App() {
  const dispatch = useDispatch();
  const fetchData = useRef(false);
  const { user, loading, isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log(user, loading);
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  if (!loading && isAuthenticated) {
    if (user?.role === "admin") {
      // 👇 login ke turant baad hi admin ko /admin/users bhej do
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/admin", { replace: true });
      }
    } else {
      // 👇 normal user ke liye homepage ya jo tu chahe
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/", { replace: true });
      }
    }
  }
}, [loading, isAuthenticated, user, navigate, location.pathname]);


  useEffect(() => {
    if (!fetchData.current) {
      fetchData.current = true;
      dispatch(fetchUser());

    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public + shared layout */}
      <Route element={<MainLayout />}>
        <Route element={<SharedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Route>

        {/* Logged-in only pages */}
        <Route element={<ProtectedRoute />}></Route>
      </Route>

      {/* Admin-only layout */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/inquiries" element={<Inquiries />} />
          <Route path="/admin/review" element={<Review />} />
          <Route path="/admin/packages" element={<Packages />} />
          <Route path="/admin/packages/create" element={<CreatePackages />} />
        </Route>
      </Route>
    </Routes>
  );
}
