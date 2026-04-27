/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import { getAuthToken } from "../../../utils/auth";
import { useAuth } from "../../../context/AuthContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "All Profiles", path: "/admin/all-profiles" },
  { label: "Registrations", path: "/admin/registrations" },
  { label: "Subscriptions", path: "/admin/subscriptions" },
  { label: "Profile Status", path: "/admin/profile-status" },
  { label: "Matches", path: "/admin/matches" },
];

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const token = getAuthToken();

  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show background when scrolled
      setIsScrolled(currentScrollY > 10);

      // Hide/Show navbar on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    if (token) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [token, lastScrollY]);

  const logoutHandler = () => {
    // Use AuthContext's logout which calls backend API and clears all state
    logout();
  };


  /* ================= PUBLIC NAVBAR ================= */
  if (!token) {
    return (
      <nav className={`w-full fixed top-0 z-[100] transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-white"} border-b border-gray-100`}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center h-[72px]">
            {/* LOGO */}
            <div
              onClick={() => navigate("/")}
              className="group flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                M
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-purple-600 tracking-tight">
                Matrimony
              </span>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About", "Success Stories", "FAQ"].map((item) => (
                <PublicNavItem key={item} label={item} />
              ))}
            </div>

            {/* AUTH BUTTONS */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/admin/register")}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign Up
              </button>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 origin-top ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 h-0"}`}>
          <div className="px-6 py-6 space-y-4">
            {["Home", "About", "Success Stories", "FAQ"].map((item) => (
              <PublicMobileItem key={item} label={item} />
            ))}
            <div className="pt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/signin")}
                className="py-3 rounded-xl text-sm font-bold text-gray-700 bg-gray-100 active:scale-95 transition-transform"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/admin/register")}
                className="py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 active:scale-95 transition-transform shadow-lg shadow-purple-200"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  /* ================= ADMIN NAVBAR ================= */
  return (
    <nav
      className={`
        w-full fixed top-0 z-[100] border-b border-gray-100/50
        transition-all duration-500 ease-in-out
        ${visible ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-gray-200/50" : "bg-white"}
      `}
    >
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex justify-between items-center h-[80px]">

          {/* LEFT: NAV LINKS CONTAINER */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
            <div className="mr-8 hidden lg:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
              <span className="font-bold text-gray-800 tracking-tight">Admin<span className="text-purple-600">Panel</span></span>
            </div>

            <div className="flex bg-gray-100/50 p-1.5 rounded-2xl">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) => `
                    relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300
                    ${isActive
                      ? "text-purple-700 bg-white shadow-sm"
                      : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                    }
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-4 pl-4 border-l border-gray-200 ml-4">

            {/* Notifications */}
            <button className="relative group p-2.5 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {/* Profile Dropdown Trigger */}
            <div className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-gray-900 leading-none group-hover:text-purple-600 transition-colors">Super Admin</p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mt-1">Administrator</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

/* COMPONENT HELPERS */
const PublicNavItem = ({ label }) => (
  <span className="relative group px-2 py-1 cursor-pointer">
    <span className="text-sm font-semibold text-gray-600 group-hover:text-purple-600 transition-colors">
      {label}
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
  </span>
);

const PublicMobileItem = ({ label }) => (
  <button className="block w-full text-left px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl font-semibold transition-all">
    {label}
  </button>
);

export default AdminNavbar;