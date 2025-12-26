// import React, { useState } from "react";
// import ProfileCard from "../components/Brides/GroomCard";
// import { Menu, X } from "lucide-react";
// import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

// const Brides = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { data, isLoading, isError } = useBrowseProfilesByGenderQuery({
//     gender: "FEMALE",
//     page: 0,
//     size: 10,
//   });

//   // CORRECT RESPONSE PATH
//   const users = data?.data?.content || [];

//   return (
//     <div className="flex min-h-screen bg-white">
//       <button
//         className="md:hidden fixed top-20 left-4 z-[41] bg-white p-2 rounded-full shadow"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       <section className="flex-1 p-4 md:p-6 mt-5 overflow-y-auto h-[calc(100vh-80px)]">
//         <div className="max-w-4xl mx-auto space-y-6">
//           {isLoading && (
//             <p className="text-center text-gray-500">Loading brides...</p>
//           )}

//           {isError && (
//             <p className="text-center text-red-500">
//               Failed to load brides.
//             </p>
//           )}

//           {!isLoading && users.length === 0 && (
//             <p className="text-center text-gray-600">No brides found.</p>
//           )}

//           {/* PASS COMPLETE PROFILE OBJECT */}
//           {users.map((profile) => (
//             <ProfileCard
//               key={profile.userProfileId}
//               profile={profile}
//             />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Brides;










import React, { useState, useEffect } from "react";
import ProfileCard from "../components/Brides/GroomCard";
import { Menu, X } from "lucide-react";
import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

const Brides = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [allUsers, setAllUsers] = useState([]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useBrowseProfilesByGenderQuery(
    { gender: "FEMALE", page, size: 10 },
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

  const users = data?.data?.content || [];
  const isLastPage = data?.data?.last === true;

  // Append new data instead of replacing
  useEffect(() => {
    if (users.length > 0) {
      setAllUsers((prev) => {
        const ids = new Set(prev.map((u) => u.userProfileId));
        const filtered = users.filter(
          (u) => !ids.has(u.userProfileId)
        );
        return [...prev, ...filtered];
      });
    }
  }, [users]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* MOBILE MENU */}
      <button
        className="md:hidden fixed top-20 left-4 z-[41] bg-white p-2 rounded-full shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* removed overflow-y-auto & fixed height */}
      {/* single page scrollbar */}
      <section className="flex-1 p-4 md:p-6 mt-5">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* INITIAL LOADING */}
          {isLoading && (
            <p className="text-center text-gray-500">
              Loading brides…
            </p>
          )}

          {/* ERROR */}
          {isError && (
            <p className="text-center text-red-500">
              Unable to load brides right now. Please try again.
            </p>
          )}

          {/* EMPTY */}
          {!isLoading && allUsers.length === 0 && (
            <p className="text-center text-gray-600">
              No brides found.
            </p>
          )}

          {/* CARDS */}
          {allUsers.map((profile) => (
            <ProfileCard
              key={profile.userProfileId}
              profile={profile}
            />
          ))}

          {/* LOAD MORE */}
          {!isLoading && !isLastPage && (
            <div className="text-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={isFetching}
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 disabled:opacity-60"
              >
                {isFetching ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Brides;
