// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Bell, Menu, X, User } from "lucide-react";

// import NotificationSidebar from "../../components/NotificationPanel/NotificationPanel";
// import LogoutPanel from "../../components/LogoutPanel/LogoutPanel";
// import { useAuth } from "../../context/AuthContext";

// import {
//   useGetOwnProfileQuery,
//   useGetSentInterestsQuery,
//   useGetReceivedInterestsQuery,
// } from "../../context/profileApi";

// import { mapNavbarProfile } from "../../context/mapNavbarProfile";

// const publicNavItems = [
//   { name: "Home", path: "/" },
//   { name: "Search Profiles", path: "/search-profiles" },
//   { name: "Success Stories", path: "/success-stories" },
//   { name: "Membership Plans", path: "/plans" },
//   { name: "Contact Us", path: "/contact" },
// ];

// const protectedNavItems = [
//   { name: "Brides", path: "/brides" },
//   { name: "Grooms", path: "/grooms" },
// ];


// const Navbar = () => {
//   const { isLoggedIn, logout } = useAuth();

//   const [openNotify, setOpenNotify] = useState(false);
//   const [openLogout, setOpenLogout] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const loggedIn = isLoggedIn || !!localStorage.getItem("token");

//   //  API CALLS
//   const { data: ownProfile } = useGetOwnProfileQuery();
//   const { data: sentData } = useGetSentInterestsQuery();
//   const { data: receivedData } = useGetReceivedInterestsQuery();

//   // MAPPING
//   const navbarProfile = mapNavbarProfile(
//     ownProfile,
//     sentData,
//     receivedData
//   );

//   const getInitial = () => {
//     const name = navbarProfile?.fullName;
//     return name ? name.charAt(0).toUpperCase() : <User size={16} />;
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="w-full sticky top-0 z-[200] bg-[#FF8C4426] backdrop-blur-md shadow-md">
//         <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[64px] sm:h-[70px] px-4 sm:px-6 md:px-10">

//           {/* LOGO */}
//           <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF8A41] whitespace-nowrap">
//             Matrimony
//           </div>

//           <ul className="hidden md:flex items-center gap-4 lg:gap-6 text-sm lg:text-base font-medium">

//   {/* Home */}
//   <li>
//     <NavLink
//       to="/"
//       className={({ isActive }) =>
//         `px-2 lg:px-3 py-2 transition-all ${
//           isActive ? "text-[#FF8A41] font-semibold" : "text-gray-700"
//         } hover:text-[#FF8A41]`
//       }
//     >
//       Home
//     </NavLink>
//   </li>

//   {/* Search Profiles */}
//   <li>
//     <NavLink
//       to="/search-profiles"
//       className={({ isActive }) =>
//         `px-2 lg:px-3 py-2 transition-all ${
//           isActive ? "text-[#FF8A41] font-semibold" : "text-gray-700"
//         } hover:text-[#FF8A41]`
//       }
//     >
//       Search Profiles
//     </NavLink>
//   </li>

//   {/* Brides & Grooms → ONLY AFTER LOGIN */}
//   {loggedIn &&
//     protectedNavItems.map((n) => (
//       <li key={n.name}>
//         <NavLink
//           to={n.path}
//           className={({ isActive }) =>
//             `px-2 lg:px-3 py-2 transition-all ${
//               isActive ? "text-[#FF8A41] font-semibold" : "text-gray-700"
//             } hover:text-[#FF8A41]`
//           }
//         >
//           {n.name}
//         </NavLink>
//       </li>
//     ))}

//   {/* Remaining public items */}
//   {publicNavItems
//     .filter(
//       (n) => !["Home", "Search Profiles"].includes(n.name)
//     )
//     .map((n) => (
//       <li key={n.name}>
//         <NavLink
//           to={n.path}
//           className={({ isActive }) =>
//             `px-2 lg:px-3 py-2 transition-all ${
//               isActive ? "text-[#FF8A41] font-semibold" : "text-gray-700"
//             } hover:text-[#FF8A41]`
//           }
//         >
//           {n.name}
//         </NavLink>
//       </li>
//     ))}
// </ul>



//           {/* RIGHT ACTIONS */}
//           <div className="flex items-center gap-2 sm:gap-3">
//             {loggedIn && (
//               <button
//                 onClick={() => setOpenNotify(true)}
//                 className="relative p-2 rounded-full hover:bg-white/40"
//               >
//                 <Bell size={20} className="text-[#FF8A41]" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
//                   3
//                 </span>
//               </button>
//             )}

//             {loggedIn ? (
//               <div
//                 onClick={() => setOpenLogout(true)}
//                 className="w-8 h-8 sm:w-9 sm:h-9 bg-[#FF8A41] text-white flex items-center justify-center rounded-full font-semibold cursor-pointer"
//               >
//                 {getInitial()}
//               </div>
//             ) : (
//               <div className="hidden md:flex gap-3">
//                 <NavLink
//                   to="/signin"
//                   className="bg-[#FF8A41] text-white px-4 py-1.5 rounded-full text-sm"
//                 >
//                   Sign In
//                 </NavLink>
//                 <NavLink
//                   to="/signup"
//                   className="bg-[#FF8A41] text-white px-4 py-1.5 rounded-full text-sm"
//                 >
//                   Sign Up
//                 </NavLink>
//               </div>
//             )}

//             {/* MOBILE TOGGLE */}
//             <button
//               className="md:hidden p-2 rounded-full hover:bg-white/40"
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
//           <div className="md:hidden bg-[#FF8C4426] backdrop-blur border-t border-orange-300">
//             <ul className="flex flex-col px-4 py-4 text-base font-medium">
//               {/* PUBLIC LINKS */}
//               {publicNavItems.map((n) => (
//                 <li key={n.name}>
//                    <NavLink
//       to="/"
//       onClick={() => setMenuOpen(false)}
//       className="block py-3 px-3 rounded hover:bg-white/40"
//     >
//       Home
//     </NavLink>
//                 </li>
//               ))}

//               {/* PROTECTED LINKS */}
//               {loggedIn &&
//                 protectedNavItems.map((n) => (
//                   <li key={n.name}>
//                     <NavLink
//                       to={n.path}
//                       onClick={() => setMenuOpen(false)}
//                       className="block py-3 px-3 rounded hover:bg-white/40"
//                     >
//                       {n.name}
//                     </NavLink>
//                   </li>
//                 ))}


//               <div className="mt-4 pt-4 border-t border-gray-300">
//                 {!loggedIn ? (
//                   <>
//                     <NavLink
//                       to="/signin"
//                       onClick={() => setMenuOpen(false)}
//                       className="block bg-[#FF8A41] text-white py-3 rounded-full text-center mb-3"
//                     >
//                       Sign In
//                     </NavLink>
//                     <NavLink
//                       to="/signup"
//                       onClick={() => setMenuOpen(false)}
//                       className="block bg-[#FF8A41] text-white py-3 rounded-full text-center"
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
//         open={openLogout}
//         onClose={() => setOpenLogout(false)}
//         sentCount={navbarProfile.sentCount}
//         receivedCount={navbarProfile.receivedCount}
//       />

//     </>
//   );
// };

// export default Navbar;







// /* eslint-disable no-unused-vars */
// import React, { useState, useMemo } from "react";
// import { NavLink } from "react-router-dom";
// import { Bell, Menu, X, User } from "lucide-react";

// import NotificationSidebar from "../../components/NotificationPanel/NotificationPanel";
// import LogoutPanel from "../../components/LogoutPanel/LogoutPanel";
// import { useAuth } from "../../context/AuthContext";

// import {
//   useGetOwnProfileQuery,
//   useGetSentInterestsQuery,
//   useGetReceivedInterestsQuery,
// } from "../../context/profileApi";

// import { mapNavbarProfile } from "../../context/mapNavbarProfile";

// /* ================= NAV CONFIG ================= */

// const PUBLIC_NAV = [
//   { name: "Home", path: "/" },
//   { name: "Search Profiles", path: "/search-profiles" },
//   { name: "Success Stories", path: "/success-stories" },
//   { name: "Membership Plans", path: "/plans" },
//   { name: "Contact Us", path: "/contact" },
// ];

// const PROTECTED_NAV = [
//   { name: "Brides", path: "/brides" },
//   { name: "Grooms", path: "/grooms" },
// ];

// /* ================= COMPONENT ================= */

// const Navbar = () => {
//   const { isLoggedIn, logout } = useAuth();
//   const loggedIn = isLoggedIn || !!localStorage.getItem("token");

//   const [openNotify, setOpenNotify] = useState(false);
//   const [openLogout, setOpenLogout] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   /* API CALLS */
//   const { data: ownProfile } = useGetOwnProfileQuery(undefined, {
//     skip: !loggedIn,
//   });
//   const { data: sentData } = useGetSentInterestsQuery(undefined, {
//     skip: !loggedIn,
//   });
//   const { data: receivedData } = useGetReceivedInterestsQuery(undefined, {
//     skip: !loggedIn,
//   });

//   /* MAP USER INFO */
//   const navbarProfile = useMemo(
//     () => mapNavbarProfile(ownProfile, sentData, receivedData),
//     [ownProfile, sentData, receivedData]
//   );

//   const getInitial = () => {
//     const name = navbarProfile?.fullName;
//     return name ? name.charAt(0).toUpperCase() : <User size={16} />;
//   };

//   /* ================= RENDER ================= */

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="w-full sticky top-0 z-[200] bg-[#FF8C4426] backdrop-blur-md shadow-md">
//         <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[64px] px-4 md:px-10">

//           {/* LOGO */}
//           <div className="text-xl font-bold text-[#FF8A41]">
//             Matrimony
//           </div>

//           {/* DESKTOP MENU */}
//           <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
//             {PUBLIC_NAV.map((n) => (
//               <li key={n.name}>
//                 <NavLink
//                   to={n.path}
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-[#FF8A41] font-semibold"
//                       : "text-gray-700 hover:text-[#FF8A41]"
//                   }
//                 >
//                   {n.name}
//                 </NavLink>
//               </li>
//             ))}

//             {loggedIn &&
//               PROTECTED_NAV.map((n) => (
//                 <li key={n.name}>
//                   <NavLink
//                     to={n.path}
//                     className={({ isActive }) =>
//                       isActive
//                         ? "text-[#FF8A41] font-semibold"
//                         : "text-gray-700 hover:text-[#FF8A41]"
//                     }
//                   >
//                     {n.name}
//                   </NavLink>
//                 </li>
//               ))}
//           </ul>

//           {/* RIGHT ACTIONS */}
//           <div className="flex items-center gap-3">
//             {loggedIn && (
//               <button
//                 onClick={() => setOpenNotify(true)}
//                 className="relative p-2 rounded-full hover:bg-white/40"
//               >
//                 <Bell size={20} className="text-[#FF8A41]" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
//                   {navbarProfile?.receivedCount || 0}
//                 </span>
//               </button>
//             )}

//             {loggedIn ? (
//               <div
//                 onClick={() => setOpenLogout(true)}
//                 className="w-9 h-9 bg-[#FF8A41] text-white flex items-center justify-center rounded-full font-semibold cursor-pointer"
//               >
//                 {getInitial()}
//               </div>
//             ) : (
//               <div className="hidden md:flex gap-3">
//                 <NavLink
//                   to="/signin"
//                   className="bg-[#FF8A41] text-white px-4 py-1.5 rounded-full text-sm"
//                 >
//                   Sign In
//                 </NavLink>
//                 <NavLink
//                   to="/signup"
//                   className="bg-[#FF8A41] text-white px-4 py-1.5 rounded-full text-sm"
//                 >
//                   Sign Up
//                 </NavLink>
//               </div>
//             )}

//             {/* MOBILE TOGGLE */}
//             <button
//               className="md:hidden p-2 rounded-full hover:bg-white/40"
//               onClick={() => setMenuOpen((v) => !v)}
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
//           <div className="md:hidden bg-[#FF8C4426] backdrop-blur border-t border-orange-300">
//             <ul className="flex flex-col px-4 py-4 text-base font-medium">

//               {/* PUBLIC */}
//               {PUBLIC_NAV.map((n) => (
//                 <li key={n.name}>
//                   <NavLink
//                     to={n.path}
//                     onClick={() => setMenuOpen(false)}
//                     className="block py-3 px-3 rounded hover:bg-white/40"
//                   >
//                     {n.name}
//                   </NavLink>
//                 </li>
//               ))}

//               {/* PROTECTED */}
//               {loggedIn &&
//                 PROTECTED_NAV.map((n) => (
//                   <li key={n.name}>
//                     <NavLink
//                       to={n.path}
//                       onClick={() => setMenuOpen(false)}
//                       className="block py-3 px-3 rounded hover:bg-white/40"
//                     >
//                       {n.name}
//                     </NavLink>
//                   </li>
//                 ))}

//               {/* AUTH ACTIONS */}
//               <div className="mt-4 pt-4 border-t border-gray-300">
//                 {!loggedIn ? (
//                   <>
//                     <NavLink
//                       to="/signin"
//                       onClick={() => setMenuOpen(false)}
//                       className="block bg-[#FF8A41] text-white py-3 rounded-full text-center mb-3"
//                     >
//                       Sign In
//                     </NavLink>
//                     <NavLink
//                       to="/signup"
//                       onClick={() => setMenuOpen(false)}
//                       className="block bg-[#FF8A41] text-white py-3 rounded-full text-center"
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
//         open={openLogout}
//         onClose={() => setOpenLogout(false)}
//         sentCount={navbarProfile?.sentCount || 0}
//         receivedCount={navbarProfile?.receivedCount || 0}
//       />
//     </>
//   );
// };

// export default Navbar;
















/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Bell, Menu, X, User } from "lucide-react";

import NotificationSidebar from "../../components/NotificationPanel/NotificationPanel";
import LogoutPanel from "../../components/LogoutPanel/LogoutPanel";
import { useAuth } from "../../context/AuthContext";
import { profileApi } from "../../context/profileApi";
import { useDispatch } from "react-redux";


import {
  useGetOwnProfileQuery,
  useGetSentInterestsQuery,
  useGetReceivedInterestsQuery,
  useGetProfilePhotoQuery,
} from "../../context/profileApi";

import { mapNavbarProfile } from "../../context/mapNavbarProfile";


const NAV_ITEMS = [
  { name: "HOME", path: "/", public: true },
  { name: "SEARCH PROFILES", path: "/search-profiles", public: true },

  // Protected (middle)
  { name: "BRIDES", path: "/brides", protected: true },
  { name: "GROOMS", path: "/grooms", protected: true },

  { name: "SUCCESS STORIES", path: "/success-stories", public: true },
  { name: "MEMBERSHIP PLANS", path: "/plans", public: true },
  { name: "CONTACT US", path: "/contact", public: true },
];

/*  COMPONENT  */

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const loggedIn = isLoggedIn || !!localStorage.getItem("token");

  const [openNotify, setOpenNotify] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* API CALLS (SAFE) */
  const { data: ownProfile } = useGetOwnProfileQuery(undefined, {
    skip: !loggedIn,
  });
  const { data: sentData } = useGetSentInterestsQuery(undefined, {
    skip: !loggedIn,
  });
  const { data: receivedData } = useGetReceivedInterestsQuery(undefined, {
    skip: !loggedIn,
  });

  const navbarProfile = useMemo(
    () => mapNavbarProfile(ownProfile, sentData, receivedData),
    [ownProfile, sentData, receivedData]
  );

  const dispatch = useDispatch();

React.useEffect(() => {
  if (loggedIn) {
    dispatch(
      profileApi.util.prefetch("getOwnProfile", undefined, {
        force: false,
      })
    );

    dispatch(
      profileApi.util.prefetch("getProfilePhoto", undefined, {
        force: false,
      })
    );
  }
}, [loggedIn, dispatch]);

const { data: photoResponse } = useGetProfilePhotoQuery(undefined, {
  skip: !loggedIn,
});



const avatarInitial = useMemo(() => {
  const p = ownProfile?.data?.userProfile;
  const firstName = p?.firstName;
  return firstName ? firstName.charAt(0).toUpperCase() : <User size={16} />;
}, [ownProfile]);


  /*  RENDER  */

  return (
    <>
      <nav className="w-full sticky top-0 z-[200] bg-[#FF8C4426] backdrop-blur-md shadow-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[64px] px-4 md:px-10">

          {/* LOGO */}
          <div className="text-xl font-bold text-[#FF8A41]">
            MATRIMONY
          </div>

          {/*  DESKTOP MENU  */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              if (item.protected && !loggedIn) return null;

              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#FF8A41] font-semibold"
                        : "text-gray-700 hover:text-[#FF8A41]"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/*  RIGHT ACTIONS  */}
          <div className="flex items-center gap-3">
            {loggedIn && (
              <button
                onClick={() => setOpenNotify(true)}
                className="relative p-2 rounded-full hover:bg-white/40"
              >
                <Bell size={20} className="text-[#FF8A41]" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {navbarProfile?.receivedCount || 0}
                </span>
              </button>
            )}

            {loggedIn ? (
              <div
                onClick={() => setOpenLogout(true)}
                className="w-9 h-9 bg-[#FF8A41] text-white flex items-center justify-center rounded-full font-semibold cursor-pointer"
              >
                {avatarInitial}

              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <NavLink
                  to="/signin"
                  className="bg-[#FF8A41] text-white px-4 py-1.5 rounded-full text-sm"
                >
                  SIGN IN
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-[#FF8A41] text-white px-4 py-1.5 rounded-full text-sm"
                >
                  SIGN UP
                </NavLink>
              </div>
            )}

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-white/40"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X size={24} className="text-[#FF8A41]" />
              ) : (
                <Menu size={24} className="text-[#FF8A41]" />
              )}
            </button>
          </div>
        </div>

        {/*  MOBILE MENU  */}
        {menuOpen && (
          <div className="md:hidden bg-[#FF8C4426] backdrop-blur border-t border-orange-300">
            <ul className="flex flex-col px-4 py-4 text-base font-medium">

              {NAV_ITEMS.map((item) => {
                if (item.protected && !loggedIn) return null;

                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 px-3 rounded hover:bg-white/40"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}

              {/* AUTH ACTIONS */}
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

      {/*  PANELS  */}
      <NotificationSidebar
        open={openNotify}
        onClose={() => setOpenNotify(false)}
      />

      <LogoutPanel
  open={openLogout}
  onClose={() => setOpenLogout(false)}
  sentCount={navbarProfile?.sentCount || 0}
  receivedCount={navbarProfile?.receivedCount || 0}
  profile={ownProfile?.data}
  photoData={photoResponse?.data}
/>

    </>
  );
};

export default Navbar;
