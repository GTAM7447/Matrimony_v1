// import React from "react";
// import ProfileFilters from "../components/AllProfilesPage/filters/ProfileFilters";
// import ProfileCard from "../components/AllProfilesPage/profiles/ProfileCard";

// const profiles = Array.from({ length: 16 }).map((_, i) => ({
//   id: i,
//   name: `User ${i + 1}`,
//   age: 26,
//   city: "Surat",
//   image: `https://randomuser.me/api/portraits/women/${i + 10}.jpg`,
// }));

// const AllProfilesPage = () => {
//   return (
//     <div className="bg-[#F4F9FF] min-h-screen px-4 sm:px-6 py-6 pt-[80px]">
//       {/* TOP BAR */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//         <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
//           <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg">
//             Dashboard
//           </span>
//           /
//           <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg">
//             All Profiles
//           </span>
//         </div>

//         <button className="bg-[#7C68FF] text-white px-4 py-2 rounded-lg text-sm font-medium">
//           Create Profile
//         </button>
//       </div>

//       {/* CONTENT */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* FILTER */}
//         <ProfileFilters />

//         {/* PROFILES COLUMN */}
//         <div className="lg:col-span-3">
//           {/* SUMMARY */}
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 text-sm">
//             <p className="text-gray-600">
//               Summary bar :{" "}
//               <span className="text-orange-500">243 Results</span>
//             </p>
//             <p className="text-gray-600">
//               Sort by : <span className="text-purple-600">Newest</span>
//             </p>
//           </div>

//           {/* PROFILE GRID */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {profiles.map((profile) => (
//               <ProfileCard key={profile.id} profile={profile} />
//             ))}
//           </div>

//           {/* PAGINATION */}
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 text-sm">
//             <div className="flex gap-2">
//               <button className="border px-2 py-1 rounded">&lt;</button>
//               <button className="border px-3 py-1 rounded bg-gray-200">1</button>
//               <button className="border px-3 py-1 rounded">2</button>
//               <button className="border px-3 py-1 rounded">3</button>
//               <button className="border px-3 py-1 rounded">4</button>
//               <button className="border px-2 py-1 rounded">&gt;</button>
//             </div>

//             <select className="border rounded px-2 py-1">
//               <option>15</option>
//               <option>30</option>
//               <option>50</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProfilesPage;


















// // src/pages/AllProfilesPage.jsx
// import React, { useState, useMemo } from "react";
// import ProfileFilters from "../components/AllProfilesPage/filters/ProfileFilters";
// import ProfileCard from "../components/AllProfilesPage/profiles/ProfileCard";
// import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";
// import { useGetAllProfilesQuery } from "../context/adminApi";

// const PAGE_SIZE = 20;

// const AllProfilesPage = () => {
//   const [page, setPage] = useState(0);

//   const { data, isLoading, isFetching, isError } =
//     useGetAllProfilesQuery({ page, size: PAGE_SIZE });

//   const users = useMemo(() => data?.content ?? [], [data]);
//   const totalResults = data?.totalElements ?? 0;
//   const isLastPage = data?.last === true;

//   return (
//     <div className="bg-[#F4F9FF] min-h-screen px-4 sm:px-6 py-6 pt-[80px]">
//       {/* TOP BAR */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//         <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
//           <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg">
//             Dashboard
//           </span>
//           /
//           <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg">
//             All Profiles
//           </span>
//         </div>

//         <button className="bg-[#7C68FF] text-white px-4 py-2 rounded-lg text-sm font-medium">
//           Create Profile
//         </button>
//       </div>

//       {/* CONTENT */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* FILTER */}
//         <ProfileFilters />

//         {/* PROFILES */}
//         <div className="lg:col-span-3">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 text-sm">
//             <p className="text-gray-600">
//               Summary bar:
//               <span className="text-orange-500"> {totalResults} Results</span>
//             </p>
//           </div>

//           {isLoading && <p>Loading profiles…</p>}
//           {isError && (
//             <p className="text-red-500">Failed to load profiles</p>
//           )}

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {users.map((u) => (
//               <ProfileCard
//                 key={u.userId}
//                 profile={{
//                   id: u.userId,
//                   name: u.email?.split("@")[0] || "Profile",
//                   age: u.age || "--",
//                   city: u.gender || "--",
//                   image: defaultProfileImg
//                 }}
//               />
//             ))}

//           </div>

//           {/* LOAD MORE */}
//           {!isLastPage && (
//             <div className="text-center mt-6">
//               <button
//                 onClick={() => setPage((p) => p + 1)}
//                 disabled={isFetching}
//                 className="bg-[#7C68FF] text-white px-6 py-2 rounded-md disabled:opacity-60"
//               >
//                 {isFetching ? "Loading…" : "Load More"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProfilesPage;




















// src/pages/AllProfilesPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import ProfileFilters from "../components/AllProfilesPage/filters/ProfileFilters";
import ProfileCard from "../components/AllProfilesPage/profiles/ProfileCard";
import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";
import { useGetAllProfilesQuery } from "../context/adminApi";

const PAGE_SIZE = 20;

const AllProfilesPage = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching, isError } =
    useGetAllProfilesQuery({ page, size: PAGE_SIZE });

  const users = useMemo(() => data?.content ?? [], [data]);
  const totalResults = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const isFirstPage = page === 0;
  const isLastPage = page >= totalPages - 1;

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const goPrev = () => {
    if (!isFirstPage) setPage((p) => p - 1);
  };

  const goNext = () => {
    if (!isLastPage) setPage((p) => p + 1);
  };

  return (
    <div className="bg-[#F4F9FF] min-h-screen px-4 sm:px-6 py-6 pt-[80px]">
      {/* TOP BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg">
            Dashboard
          </span>
          /
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg">
            All Profiles
          </span>
        </div>

        <button className="bg-[#7C68FF] text-white px-4 py-2 rounded-lg text-sm font-medium">
          Create Profile
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* FILTER */}
        <ProfileFilters />

        {/* PROFILES */}
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 text-sm">
            <p className="text-gray-600">
              Summary bar:
              <span className="text-orange-500"> {totalResults} Results</span>
            </p>
          </div>

          {isLoading && <p>Loading profiles…</p>}
          {isError && (
            <p className="text-red-500">Failed to load profiles</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {users.map((u) => (
              <ProfileCard
                key={u.userId}
                profile={{
                  id: u.userId,
                  name: u.email?.split("@")[0] || "Profile",
                  age: u.age || "--",
                  city: u.gender || "--",
                  image: defaultProfileImg
                }}
              />
            ))}
          </div>

          {/* PAGINATION BUTTONS */}
          {!isLoading && (
            <div className="flex justify-center items-center gap-6 mt-8">
              <button
                onClick={goPrev}
                disabled={isFirstPage || isFetching}
                className={`px-4 py-2 border rounded-lg ${
                  isFirstPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ⬅ Prev
              </button>

              <span className="text-sm text-gray-600">
                Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                onClick={goNext}
                disabled={isLastPage || isFetching}
                className={`px-4 py-2 border rounded-lg ${
                  isLastPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next ➡
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProfilesPage;
