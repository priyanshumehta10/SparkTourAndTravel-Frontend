import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { logOut } from "../Auth/slice";

export default function Sidebar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <aside className="bg-gray-900 w-64 p-4 flex flex-col min-h-screen shadow-lg">
      <h2 className="text-xl font-bold mb-8 text-indigo-400">Spark Panel</h2>
      <nav className="flex flex-col gap-3 flex-1">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `p-2 rounded transition ${
              isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `p-2 rounded transition ${
              isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
            }`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/packageGroups"
          className={({ isActive }) =>
            `p-2 rounded transition ${
              isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
            }`
          }
        >
          Package Groups
        </NavLink>
        <NavLink
          to="/admin/packages"
          className={({ isActive }) =>
            `p-2 rounded transition ${
              isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
            }`
          }
        >
          Packages
        </NavLink>
        <NavLink
          to="/admin/inquiries"
          className={({ isActive }) =>
            `p-2 rounded transition ${
              isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
            }`
          }
        >
          Inquiries
        </NavLink>
        <NavLink
          to="/admin/review"
          className={({ isActive }) =>
            `p-2 rounded transition ${
              isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
            }`
          }
        >
          Review
        </NavLink>
       
      </nav>

      <div className="mt-auto">
        <span className="block text-sm text-gray-400 mb-2">
          Hi, {user?.email}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-600 w-full px-3 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
