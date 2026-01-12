// import React, { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import ProfileCard from "../Brides/BrideCard";
// import SkeletonSearchCard from "./SkeletonSearchCard";
// import { useGetPublicProfileByIdQuery } from "../../context/profileApi";

// const SearchProfiles = () => {
//   const [profileId, setProfileId] = useState("");
//   const [searchedIds, setSearchedIds] = useState([]);
//   const [profiles, setProfiles] = useState([]);

//   const lastSearchedId = searchedIds[searchedIds.length - 1];

//   const { data, isLoading, isError } =
//     useGetPublicProfileByIdQuery(lastSearchedId, {
//       skip: !lastSearchedId,
//     });

//   const handleIdSearch = () => {
//     const trimmedId = profileId.trim();

//     if (!trimmedId) {
//       alert("Enter Profile ID");
//       return;
//     }

//     if (searchedIds.includes(trimmedId)) {
//       setProfileId("");
//       return;
//     }

//     setSearchedIds((prev) => [...prev, trimmedId]);
//     setProfileId("");
//   };

//   useEffect(() => {
//     if (data?.data && !isError) {
//       setProfiles([data.data]);
//     }
//   }, [data, isError]);

//   return (
//     <section className="bg-gray-100 min-h-screen py-12 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

//         <h1 className="text-3xl font-extrabold text-center mb-8">
//           Search <span className="text-orange-500">Profile by ID</span>
//         </h1>

//         {/* SEARCH */}
//         <div className="space-y-6">
//           <input
//             value={profileId}
//             onChange={(e) => setProfileId(e.target.value)}
//             placeholder="Enter Profile ID"
//             className="w-full border rounded-xl p-3"
//           />

//           <button
//             onClick={handleIdSearch}
//             className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold"
//           >
//             <Search className="inline-block w-5 h-5 mr-2" />
//             Search Profile
//           </button>
//         </div>

//         {isLoading && <SkeletonSearchCard />}

//         {isError && (
//           <p className="text-center text-red-500 mt-6">
//             Profile not found
//           </p>
//         )}

//         <div className="mt-8 space-y-6">
//           {profiles.map((profile) => (
//             <ProfileCard
//               key={profile.userProfileId}
//               profile={profile}
//             />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default SearchProfiles;
















import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ProfileCard from "../Brides/BrideCard";
import SkeletonSearchCard from "./SkeletonSearchCard";
import { useGetPublicProfileByIdV2Query } from "../../context/profileApi";

const SearchProfiles = () => {
  const [profileId, setProfileId] = useState("");
  const [searchId, setSearchId] = useState(null);

  /* 🔹 USE NEW ENDPOINT */
  const {
    data,
    isLoading,
    isError,
  } = useGetPublicProfileByIdV2Query(searchId, {
    skip: !searchId,
  });

  const handleIdSearch = () => {
    const trimmedId = profileId.trim();

    if (!trimmedId) {
      alert("Enter Profile ID");
      return;
    }

    setSearchId(trimmedId);
    setProfileId("");
  };

  const profiles = useMemo(() => {
    return data?.data ? [data.data] : [];
  }, [data]);

  return (
    <section className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-extrabold text-center mb-8">
          Search <span className="text-orange-500">Profile by ID</span>
        </h1>

        <div className="space-y-6">
          <input
            value={profileId}
            onChange={(e) => setProfileId(e.target.value)}
            placeholder="Enter Profile ID"
            className="w-full border rounded-xl p-3"
          />

          <button
            onClick={handleIdSearch}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold"
          >
            <Search className="inline-block w-5 h-5 mr-2" />
            Search Profile
          </button>
        </div>

        {isLoading && <SkeletonSearchCard />}

        {isError && (
          <p className="text-center text-red-500 mt-6">
            Profile not found
          </p>
        )}

        <div className="mt-8 space-y-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.userProfileId}
              profile={profile}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SearchProfiles;
