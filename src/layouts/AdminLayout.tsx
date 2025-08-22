import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-700">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-64 h-screen fixed">
        <Sidebar />
      </div>

      {/* Mobile sidebar (toggleable) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-800 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-2">
          <button className="text-white" onClick={() => setIsOpen(false)}>
            <CloseOutlined style={{ fontSize: 24 }} />
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Backdrop (click to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-64 p-4 md:p-6 overflow-auto h-screen">
        {/* Mobile menu button */}
        <button
          className="md:hidden mb-4 text-white"
          onClick={() => setIsOpen(true)}
        >
          <MenuOutlined style={{ fontSize: 28 }} />
        </button>

        <Outlet />
      </div>
    </div>
  );
}