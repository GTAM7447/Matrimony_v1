// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Bell, Search, Menu, X, User } from "lucide-react";

// import NotificationSidebar from "../../components/NotificationPanel/NotificationPanel";
// import LogoutPanel from "../../components/LogoutPanel/LogoutPanel";
// import { useAuth } from "../../context/AuthContext";

// import {
//   useGetOwnProfileQuery,
//   useGetSentInterestsQuery,
//   useGetReceivedInterestsQuery,
// } from "../../context/profileApi";

// import { mapNavbarProfile } from "../../context/mapNavbarProfile";

// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "Search Profiles", path: "/search-profiles" },
//   { name: "Brides", path: "/brides" },
//   { name: "Grooms", path: "/grooms" },
//   { name: "Success Stories", path: "/success-stories" },
//   { name: "Membership Plans", path: "/plans" },
//   { name: "Contact Us", path: "/contact" },
// ];

// const Navbar = () => {
//   const { isLoggedIn, logout } = useAuth();

//   const [openNotify, setOpenNotify] = useState(false);
//   const [openLogout, setOpenLogout] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const loggedIn = isLoggedIn || !!localStorage.getItem("token");

//   const { data: ownProfile } = useGetOwnProfileQuery();
//   const navbarProfile = mapNavbarProfile(ownProfile);

//   const { data: sentData } = useGetSentInterestsQuery();
//   const { data: receivedData } = useGetReceivedInterestsQuery();

//   const sentCount = sentData?.data?.count || sentData?.count || 0;
//   const receivedCount = receivedData?.data?.count || receivedData?.count || 0;

//   const getInitial = () => {
//     const name = navbarProfile?.fullName;
//     return name ? name.charAt(0).toUpperCase() : <User size={16} />;
//   };

//   return (
//     <>
//       {/* SINGLE MERGED NAVBAR */}
//       <nav className="w-full sticky top-0 z-[200] bg-[#FF8C4426] shadow-md">
//         <div className="flex justify-between items-center h-[70px] px-5 md:px-10">
//           {/* LEFT: LOGO */}
//           <div className="text-xl sm:text-2xl font-bold text-[#FF8A41] whitespace-nowrap">
//             Matrimony
//           </div>

//           {/* CENTER NAV ITEMS (Desktop) */}
//           <ul className="hidden md:flex items-center gap-6 text-black font-medium">
//             {navItems.map((n) => (
//               <li key={n.name}>
//                 <NavLink
//                   to={n.path}
//                   className={({ isActive }) =>
//                     `px-3 py-2 transition-all ${
//                       isActive ? "text-[#FF8A41] font-bold " : "text-gray-700"
//                     } hover:text-[#FF8A41]`
//                   }
//                 >
//                   {n.name}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>

//           {/* RIGHT BUTTONS */}
//           <div className="flex items-center gap-3">
//             {/* Notifications */}
//             {loggedIn && (
//               <button
//                 onClick={() => setOpenNotify(true)}
//                 className="relative p-2 hover:bg-white/40 rounded-full transition-colors"
//               >
//                 <Bell size={22} className="text-[#FF8A41]" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//                   3
//                 </span>
//               </button>
//             )}

//             {/* Profile Icon */}
//             {loggedIn ? (
//               <div
//                 onClick={() => setOpenLogout(true)}
//                 className="w-8 h-8 bg-[#FF8A41] text-white flex items-center justify-center rounded-full font-semibold cursor-pointer hover:bg-[#FF8A41]/90 transition-colors"
//               >
//                 {getInitial()}
//               </div>
//             ) : (
//               <div className="hidden md:flex gap-3">
//                 <NavLink
//                   to="/signin"
//                   className="bg-[#FF8A41] text-white px-4 py-1 rounded-full"
//                 >
//                   Sign In
//                 </NavLink>
//                 <NavLink
//                   to="/signup"
//                   className="bg-[#FF8A41] text-white px-4 py-1 rounded-full"
//                 >
//                   Sign Up
//                 </NavLink>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               className="p-2 hover:bg-white/40 rounded-full md:hidden"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               {menuOpen ? (
//                 <X size={24} className="text-[#FF8A41]" />
//               ) : (
//                 <Menu size={24} className="text-[#FF8A41]" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {menuOpen && (
//           <div className="md:hidden bg-[#FF8C4426] border-t border-orange-300">
//             <ul className="flex flex-col py-4 px-6 font-medium text-gray-800">
//               {navItems.map((n) => (
//                 <li key={n.name}>
//                   <NavLink
//                     to={n.path}
//                     className="block py-3 px-4 text-lg hover:bg-white/30 rounded"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {n.name}
//                   </NavLink>
//                 </li>
//               ))}

//               {/* Auth Buttons (Mobile) */}
//               <div className="pt-4 mt-3 border-t border-gray-300">
//                 {!loggedIn ? (
//                   <>
//                     <NavLink
//                       to="/signin"
//                       className="block bg-[#FF8A41] text-white py-3 mb-3 rounded-full text-center"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       Sign In
//                     </NavLink>

//                     <NavLink
//                       to="/signup"
//                       className="block bg-[#FF8A41] text-white py-3 rounded-full text-center"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       Sign Up
//                     </NavLink>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       logout();
//                       setMenuOpen(false);
//                     }}
//                     className="w-full bg-red-500 text-white py-3 rounded-full"
//                   >
//                     Logout
//                   </button>
//                 )}
//               </div>
//             </ul>
//           </div>
//         )}
//       </nav>

//       {/* PANELS */}
//       <NotificationSidebar
//         open={openNotify}
//         onClose={() => setOpenNotify(false)}
//       />
//       <LogoutPanel
//         userData={navbarProfile}
//         sentCount={sentCount}
//         receivedCount={receivedCount}
//         open={openLogout}
//         onClose={() => setOpenLogout(false)}
//       />
//     </>
//   );
// };

// export default Navbar;






/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bell, Menu, X, User } from "lucide-react";

import NotificationSidebar from "../../components/NotificationPanel/NotificationPanel";
import LogoutPanel from "../../components/LogoutPanel/LogoutPanel";
import { useAuth } from "../../context/AuthContext";

import {
  useGetOwnProfileQuery,
  useGetSentInterestsQuery,
  useGetReceivedInterestsQuery,
} from "../../context/profileApi";

import { mapNavbarProfile } from "../../context/mapNavbarProfile";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Search Profiles", path: "/search-profiles" },
  { name: "Brides", path: "/brides" },
  { name: "Grooms", path: "/grooms" },
  { name: "Success Stories", path: "/success-stories" },
  { name: "Membership Plans", path: "/plans" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const [openNotify, setOpenNotify] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const loggedIn = isLoggedIn || !!localStorage.getItem("token");

  //  API CALLS
  const { data: ownProfile } = useGetOwnProfileQuery();
  const { data: sentData } = useGetSentInterestsQuery();
  const { data: receivedData } = useGetReceivedInterestsQuery();

  // MAPPING
  const navbarProfile = mapNavbarProfile(
    ownProfile,
    sentData,
    receivedData
  );

  const getInitial = () => {
    const name = navbarProfile?.fullName;
    return name ? name.charAt(0).toUpperCase() : <User size={16} />;
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full sticky top-0 z-[200] bg-[#FF8C4426] backdrop-blur-md shadow-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[64px] sm:h-[70px] px-4 sm:px-6 md:px-10">

          {/* LOGO */}
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF8A41] whitespace-nowrap">
            Matrimony
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-6 text-sm lg:text-base font-medium">
            {navItems.map((n) => (
              <li key={n.name}>
                <NavLink
                  to={n.path}
                  className={({ isActive }) =>
                    `px-2 lg:px-3 py-2 transition-all ${isActive
                      ? "text-[#FF8A41] font-semibold"
                      : "text-gray-700"
                    } hover:text-[#FF8A41]`
                  }
                >
                  {n.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {loggedIn && (
              <button
                onClick={() => setOpenNotify(true)}
                className="relative p-2 rounded-full hover:bg-white/40"
              >
                <Bell size={20} className="text-[#FF8A41]" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </button>
            )}

            {loggedIn ? (
              <div
                onClick={() => setOpenLogout(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#FF8A41] text-white flex items-center justify-center rounded-full font-semibold cursor-pointer"
              >
                {getInitial()}
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <NavLink
                  to="/signin"
                  className="bg-[#FF8A41] text-white px-4 py-1.5 rounded-full text-sm"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-[#FF8A41] text-white px-4 py-1.5 rounded-full text-sm"
                >
                  Sign Up
                </NavLink>
              </div>
            )}

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-white/40"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={24} className="text-[#FF8A41]" />
              ) : (
                <Menu size={24} className="text-[#FF8A41]" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-[#FF8C4426] backdrop-blur border-t border-orange-300">
            <ul className="flex flex-col px-4 py-4 text-base font-medium">
              {navItems.map((n) => (
                <li key={n.name}>
                  <NavLink
                    to={n.path}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-3 rounded hover:bg-white/40"
                  >
                    {n.name}
                  </NavLink>
                </li>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-300">
                {!loggedIn ? (
                  <>
                    <NavLink
                      to="/signin"
                      onClick={() => setMenuOpen(false)}
                      className="block bg-[#FF8A41] text-white py-3 rounded-full text-center mb-3"
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="block bg-[#FF8A41] text-white py-3 rounded-full text-center"
                    >
                      Sign Up
                    </NavLink>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full bg-red-500 text-white py-3 rounded-full"
                  >
                    Logout
                  </button>
                )}
              </div>
            </ul>
          </div>
        )}
      </nav>

      {/* PANELS */}
      <NotificationSidebar
        open={openNotify}
        onClose={() => setOpenNotify(false)}
      />
      <LogoutPanel
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        sentCount={navbarProfile.sentCount}
        receivedCount={navbarProfile.receivedCount}
      />

    </>
  );
};

export default Navbar;