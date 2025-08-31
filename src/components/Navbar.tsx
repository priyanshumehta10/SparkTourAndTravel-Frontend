// Navbar.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { logOut } from "../Auth/slice";
import sparksLogo from "../assets/sparks_logo.png";
import { motion } from "framer-motion";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons"; // ✅ AntD icons

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // ✅ mobile menu toggle
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const isHome = location.pathname === "/" || location.pathname === "/home";

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass =
    isHome && !isScrolled
      ? "bg-transparent"
      : "bg-[#C6DCFF] shadow-md backdrop-blur";

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-colors duration-500 ${navbarClass}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6  text-white">

        {/* ✅ Logo / Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={sparksLogo}
            alt="Logo"
            className="h-24 w-auto"
          />
        </Link>

        {/* ✅ Desktop Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex space-x-4 bg-white rounded-full px-4 py-2 shadow-md"
        >
          {[
            { path: "/", label: "Home" },
            { path: "/packages", label: "Packages" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
          ].map((link, _) => (
            <motion.div
              key={link.path}
              whileHover={{ scale: 1.15, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={link.path}
                className="text-black px-3 py-1 rounded-full"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* ✅ Mobile Hamburger (AntD Icons) */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        {/* ✅ Auth Section (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded bg-[#305BAB] hover:bg-[#1a2753] transition"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="text-sm text-[#1a2753] hidden sm:inline">
                Hi, {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* ✅ Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-md px-6 py-4 space-y-4"
        >
          {[
            { path: "/", label: "Home" },
            { path: "/packages", label: "Packages" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-black font-medium"
            >
              {link.label}
            </Link>
          ))}

          {/* ✅ Auth in mobile */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded bg-[#305BAB] text-white text-center"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full bg-red-600 px-4 py-2 rounded text-white"
            >
              Logout
            </button>
          )}
        </motion.div>
      )}
    </header>
  );
}
