// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
 
// const AdminNavbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
 
//   return (
//     <nav className="w-full bg-white border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-20">
//           {/* LOGO */}
//           <div className="text-xl font-semibold text-gray-900">
//             Matrimony
//           </div>
 
//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center space-x-8">
//             <NavItem label="Home" active />
//             <NavItem label="About" />
//             <NavItem label="Success Stories" />
//             <NavItem label="FAQ" />
//           </div>
 
//           {/* AUTH BUTTONS (DESKTOP) */}
//           <div className="hidden md:flex items-center space-x-3">
//             <button className="px-5 py-2 rounded-lg text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 transition">
//               Login
//             </button>
//             <button className="px-5 py-2 rounded-lg text-sm font-medium text-purple-500 border border-purple-400 hover:bg-purple-50 transition">
//               Sign up
//             </button>
//           </div>
 
//           {/* MOBILE MENU ICON */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>
 
//       {/* MOBILE MENU */}
//       {isOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200">
//           <div className="px-4 py-4 space-y-3">
//             <MobileNavItem label="Home" />
//             <MobileNavItem label="About" />
//             <MobileNavItem label="Success Stories" />
//             <MobileNavItem label="FAQ" />
 
//             <div className="pt-4 space-y-3">
//               <button className="w-full py-2 rounded-lg text-sm font-medium bg-purple-500 text-white">
//                 Login
//               </button>
//               <button className="w-full py-2 rounded-lg text-sm font-medium text-purple-500 border border-purple-400">
//                 Sign up
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };
 
// /* DESKTOP NAV ITEM */
// const NavItem = ({ label, active }) => (
//   <button
//     className={`text-sm font-medium transition ${
//       active
//         ? "text-purple-500"
//         : "text-gray-600 hover:text-purple-500"
//     }`}
//   >
//     {label}
//   </button>
// );
 
// /* MOBILE NAV ITEM */
// const MobileNavItem = ({ label }) => (
//   <button className="block w-full text-left text-gray-700 text-sm font-medium hover:text-purple-500">
//     {label}
//   </button>
// );
 
// export default AdminNavbar;
 









// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { Menu, X, Search, Bell, User } from "lucide-react";

// const navItems = [
//   { label: "Dashboard", path: "/admin/admindashboard" },
//   { label: "All Profiles", path: "/admin/all-profiles" },
//   { label: "Registrations", path: "/admin/registrations" },
//   { label: "Profile Status", path: "/admin/profile-status" },
//   { label: "Matches", path: "/admin/matches" },
// ];

// const AdminNavbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // NAVBAR SHOW/HIDE STATE
//   const [visible, setVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   // HANDLE SCROLL
//   const handleScroll = () => {
//     const currentScrollY = window.scrollY;

//     if (currentScrollY > lastScrollY && currentScrollY > 80) {
//       setVisible(false); // scrolling down -> hide navbar
//     } else {
//       setVisible(true); // scrolling up -> show navbar
//     }

//     setLastScrollY(currentScrollY);
//   };

//   // 🛠 Attach scroll listener
//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   const linkClasses = ({ isActive }) =>
//     `px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
//       isActive
//         ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
//         : "text-gray-600 hover:text-purple-500 hover:bg-gray-50"
//     }`;

//   const mobileLinkClasses = ({ isActive }) =>
//     `block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
//       isActive
//         ? "bg-purple-50 text-purple-600"
//         : "text-gray-700 hover:bg-gray-50"
//     }`;

//   return (
//     <nav
//       className={`
//         w-full bg-white border-b border-gray-200 shadow-sm fixed top-0 z-[999]
//         transition-transform duration-300
//         ${visible ? "translate-y-0" : "-translate-y-full"}
//       `}
//     >
//       <div className="max-w-full px-6">
//         <div className="flex justify-between items-center h-16">

//           {/* LEFT : NAV LINKS */}
//           <div className="flex items-center space-x-1 overflow-x-auto">
//             {navItems.map((item) => (
//               <NavLink key={item.label} to={item.path} className={linkClasses}>
//                 {item.label}
//               </NavLink>
//             ))}
//           </div>

//           {/* RIGHT : ACTIONS */}
//           <div className="flex items-center space-x-4">

//             {/* SEARCH (DESKTOP) */}
//             <div className="relative hidden md:flex">
//               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 w-64"
//               />
//             </div>

//             {/* SEARCH (MOBILE) */}
//             <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
//               <Search className="h-5 w-5 text-gray-600" />
//             </button>

//             {/* NOTIFICATION */}
//             <button className="relative p-2 hover:bg-gray-100 rounded-lg">
//               <Bell className="h-5 w-5 text-gray-600" />
//               <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
//             </button>

//             {/* USER */}
//             <div className="flex items-center space-x-3">
//               <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
//                 <User className="h-4 w-4 text-purple-600" />
//               </div>
//               <div className="hidden md:block">
//                 <p className="text-sm font-medium text-gray-900">Admin</p>
//                 <p className="text-xs text-gray-500">Super Admin</p>
//               </div>
//             </div>

//             {/* MOBILE MENU TOGGLE */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
//             >
//               {isOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {isOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
//           <div className="px-6 py-4 space-y-3">

//             {/* MOBILE SEARCH */}
//             <div className="relative mb-4">
//               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg"
//               />
//             </div>

//             {/* MOBILE LINKS */}
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.label}
//                 to={item.path}
//                 onClick={() => setIsOpen(false)}
//                 className={mobileLinkClasses}
//               >
//                 {item.label}
//               </NavLink>
//             ))}

//             {/* USER INFO */}
//             <div className="pt-4 border-t border-gray-200 mt-4 flex items-center gap-3">
//               <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
//                 <User className="h-5 w-5 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Admin</p>
//                 <p className="text-xs text-gray-500">Super Admin</p>
//               </div>
//             </div>

//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default AdminNavbar;

















/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search, Bell, User } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "All Profiles", path: "/admin/all-profiles" },
  { label: "Registrations", path: "/admin/registrations" },
  { label: "Profile Status", path: "/admin/profile-status" },
  { label: "Matches", path: "/admin/matches" },
];

const AdminNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken")


  const [isOpen, setIsOpen] = useState(false);

  // Navbar scroll behavior (Admin only)
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (!token) return;
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    if (!token) return;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [token, lastScrollY]);

  const logoutHandler = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/signin");
  };

  /* ================= PUBLIC NAVBAR ================= */
  if (!token) {
    return (
      <nav className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* LOGO */}
            <div
              onClick={() => navigate("/")}
              className="text-xl font-semibold text-gray-900 cursor-pointer"
            >
              Matrimony
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-10">
              <PublicNavItem label="Home" />
              <PublicNavItem label="About" />
              <PublicNavItem label="Success Stories" />
              <PublicNavItem label="FAQ" />
            </div>

            {/* AUTH BUTTONS */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => navigate("/signin")}
                className="px-5 py-2 rounded-lg text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/admin/register")}
                className="px-5 py-2 rounded-lg text-sm font-medium text-purple-500 border border-purple-400 hover:bg-purple-50 transition"
              >
                Sign up
              </button>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <PublicMobileItem label="Home" />
              <PublicMobileItem label="About" />
              <PublicMobileItem label="Success Stories" />
              <PublicMobileItem label="FAQ" />

              <div className="pt-4 space-y-3">
                <button
                  onClick={() => navigate("/signin")}
                  className="w-full py-2 rounded-lg bg-purple-500 text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/admin/register")}
                  className="w-full py-2 rounded-lg text-purple-500 border border-purple-400"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }

  /* ================= ADMIN NAVBAR ================= */
  return (
    <nav
      className={`w-full bg-white border-b border-gray-200 shadow-sm fixed top-0 z-[999]
        transition-transform duration-300
        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-full px-6">
        <div className="flex justify-between items-center h-16">

          {/* LEFT NAV */}
          <div className="flex items-center space-x-1 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink key={item.label} to={item.path} className={linkClasses}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-purple-600" />
              </div>
            </div>

            <button
              onClick={logoutHandler}
              className="px-4 py-1 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

/* STYLE HELPERS */
const linkClasses = ({ isActive }) =>
  `px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
    isActive
      ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
      : "text-gray-600 hover:text-purple-500 hover:bg-gray-50"
  }`;

const PublicNavItem = ({ label }) => (
  <span className="text-sm font-medium text-gray-600 hover:text-purple-500 cursor-pointer">
    {label}
  </span>
);

const PublicMobileItem = ({ label }) => (
  <span className="block w-full text-left text-gray-700 text-sm font-medium hover:text-purple-500">
    {label}
  </span>
);

export default AdminNavbar;
