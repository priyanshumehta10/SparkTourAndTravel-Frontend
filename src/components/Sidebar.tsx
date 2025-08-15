import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="bg-gray-900 text-white w-64 p-4 flex flex-col min-h-screen">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/admin" className="hover:bg-gray-700 p-2 rounded">Dashboard</NavLink>
        <NavLink to="/admin/users" className="hover:bg-gray-700 p-2 rounded">Users</NavLink>
        <NavLink to="/admin/settings" className="hover:bg-gray-700 p-2 rounded">Settings</NavLink>
      </nav>
    </aside>
  );
}
