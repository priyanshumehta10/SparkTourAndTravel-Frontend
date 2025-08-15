import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export default function ProtectedRoute() {
  const user = useSelector((state: RootState) => state.login.user);
  return user ? <Outlet /> : <Navigate to="/login" />;
}
