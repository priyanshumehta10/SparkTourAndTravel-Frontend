// Navbar.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { logOut } from "../Auth/slice";
import sparksLogo from "../assets/sparks_logo.png";
import { motion } from "framer-motion";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons"; // ✅ Social icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 w-full z-50 shadow-md">
      {/* ✅ Top Bar */}
      <div className="w-full bg-white text-[#1a2753]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 sm:py-0">
          {/* Logo */}
          <Link
            to="/"
            className="logo flex items-center space-x-2 hover:no-underline hover:text-inherit"
          >
            {/* Smaller logo on mobile */}
            <img src={sparksLogo} alt="Logo" className="h-12 sm:h-24 w-auto" />

            <div className="flex flex-col">
              {/* Smaller text size on mobile */}
              <span className="text-lg sm:text-3xl font-bold tracking-wide">
                Spark Tour and Travels
              </span>
              <span className="text-xs sm:text-sm text-gray-600">
                Your Journey, Our Responsibility
              </span>
            </div>
          </Link>

          {/* Auth Section (only show on big screens here) */}
          <div className="hidden sm:flex items-center space-x-4">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="px-4 py-2 rounded bg-[#305BAB] text-white hover:bg-[#1a2753] transition"
              >
                Login
              </Link>
            ) : (
              <>
                <span className="text-sm">Hi, {user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>


      {/* ✅ Bottom Bar */}
      <div className="w-full bg-[#1a2753] text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
          {/* Nav Links (Desktop only) */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex space-x-10"
          >
            {[
              { path: "/", label: "Home" },
              { path: "/packages", label: "Packages" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
              { path: "/bookings", label: "My Bookings" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-gray-300 text-xl transition px-3"
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>

          {/* Auth Section (small screens only, blue bar) */}
          <div className="flex sm:hidden items-center space-x-3">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="px-3 py-1 rounded bg-[#305BAB] text-white text-sm hover:bg-[#1a2753] transition"
              >
                Login
              </Link>
            ) : (
              <span className="text-xs">Hi, {user?.email}</span>
            )}
          </div>


          {/* Social Icons (Desktop only) */}
          <div className="hidden md:flex space-x-8 text-3xl pr-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 transition"
            >
              <InstagramOutlined />
            </a>
            <a
              href="https://wa.me/918875949835"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <WhatsAppOutlined />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-3xl px-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white text-black shadow-md px-8 py-6 space-y-6"
        >
          {[
            { path: "/", label: "Home" },
            { path: "/packages", label: "Packages" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
            { path: "/bookings", label: "My Bookings" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block font-medium px-3 py-2"
            >
              {link.label}
            </Link>
          ))}

          {/* Show logout button here if authenticated */}
          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}

          {/* Social icons */}
          <div className="flex space-x-8 text-3xl pt-6">
            <a
              href="https://www.instagram.com/spark_tour_and_travels_/?igsh=MWZ5ZzJld3NqaDNsMw%3D%3D#"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 transition "
            >
              <InstagramOutlined />
            </a>
            <a
              href="https://wa.me/yourNumber"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
            >
              <WhatsAppOutlined />
            </a>
          </div>
        </motion.div>
      )}




    </header>
  );
}
