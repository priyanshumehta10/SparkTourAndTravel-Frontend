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
    <aside className="bg-gray-900 w-64 h-full flex flex-col justify-between shadow-lg">
      {/* Top section */}
      <div className="p-4 flex flex-col flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold mb-8 text-indigo-400">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `p-2 rounded transition ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `p-2 rounded transition ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/packageGroups"
            className={({ isActive }) =>
              `p-2 rounded transition ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            Package Groups
          </NavLink>
          <NavLink
            to="/admin/packages"
            className={({ isActive }) =>
              `p-2 rounded transition ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            Packages
          </NavLink>
          <NavLink
            to="/admin/inquiries"
            className={({ isActive }) =>
              `p-2 rounded transition ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            Inquiries
          </NavLink>
          <NavLink
            to="/admin/review"
            className={({ isActive }) =>
              `p-2 rounded transition ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            Review
          </NavLink>
          <NavLink
            to="/admin/booking"
            className={({ isActive }) =>
              `p-2 rounded transition ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            Bookings
          </NavLink>
        </nav>
      </div>

      {/* Bottom section (always visible) */}
      <div className="pb-20 px-3 border-t border-gray-700">
        <span className="block text-sm text-gray-400 mb-2 truncate">
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
