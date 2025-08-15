import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import SharedRoute from "./routes/SharedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Home from "./features/Home";
import Dashboard from "./features/Dashboard";
// Example protected page
import Login from "./features/Login";

export default function App() {
  return (
    <Routes>
      {/* Public + shared layout */}
      <Route element={<MainLayout />}>
        <Route element={<SharedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Logged-in only pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>

      {/* Admin-only layout */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
