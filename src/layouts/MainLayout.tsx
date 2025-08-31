// MainLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Background from "../assets/Background.jpg";
import Footer from "../components/Footer";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";

  return (
    <div
      className={`h-[950px] bg-cover bg-center${
        isHome ? "bg-cover bg-center" : ""
      }`}
      style={{
        backgroundImage: isHome ? `url(${Background})` : "none",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page content (window scrolls naturally) */}
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
      
      <Footer/>
    </div>
  );
}
