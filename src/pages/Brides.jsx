// import React, { useState, useMemo } from "react";
// import GroomCard from "../components/Brides/GroomCard";
// import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

// const PAGE_SIZE = 20;

// const Brides = () => {
//   const [page, setPage] = useState(0);

//   const {
//     data,
//     isLoading,
//     isFetching,
//     isError,
//   } = useBrowseProfilesByGenderQuery(
//     { gender: "FEMALE", page, size: PAGE_SIZE },
//     { refetchOnMountOrArgChange: false }
//   );

//   // PREFETCH NEXT PAGE
//   useBrowseProfilesByGenderQuery(
//     { gender: "FEMALE", page: page + 1, size: PAGE_SIZE },
//     { skip: data?.data?.last === true }
//   );

//   /* Normalize profile structure */
//   const mapToCard = (raw) => ({
//     userProfileId: raw.userProfileId ?? raw.profileId ?? raw.id ?? null,
//     completeProfileId: raw.completeProfileId ?? raw.userId ?? null,
//     firstName: raw.firstName ?? raw.name ?? "",
//     age: raw.age ?? raw.profileAge ?? null,
//     gender: raw.gender ?? "",
//     religion: raw.religion ?? "",
//     caste: raw.caste ?? "",
//     currentCity: raw.currentCity ?? raw.city ?? "",
//     maritalStatus: raw.maritalStatus ?? "",
//     hasProfilePhoto: raw.hasProfilePhoto ?? !!raw.profilePhotoBase64,
//     profilePhotoBase64: raw.profilePhotoBase64 ?? null,
//     profilePhotoContentType: raw.profilePhotoContentType ?? null,
//     isFavorited: !!raw.isFavorited,
//   });

//   const users = useMemo(
//     () => (data?.data?.content ?? []).map(mapToCard),
//     [data]
//   );

//   const isLastPage = data?.data?.last === true;

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       {isError && <p className="text-center text-red-500">Unable to load brides.</p>}
//       {isLoading && page === 0 && <p>Loading brides...</p>}

//       {users.map((profile) => (
//         <GroomCard key={profile.userProfileId} profile={profile} />
//       ))}

//       {!isLastPage && (
//         <div className="text-center">
//           <button
//             onClick={() => setPage((p) => p + 1)}
//             disabled={isFetching}
//             className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 disabled:opacity-60"
//           >
//             {isFetching ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Brides;


























import React, { useState } from "react";
import GroomCard from "../components/Brides/GroomCard";
import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

const PAGE_SIZE = 20;

const Brides = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching, isError } =
    useBrowseProfilesByGenderQuery(
      { gender: "FEMALE", page, size: PAGE_SIZE },
      { refetchOnMountOrArgChange: false }
    );

  // PREFETCH NEXT PAGE
  useBrowseProfilesByGenderQuery(
    { gender: "FEMALE", page: page + 1, size: PAGE_SIZE },
    { skip: data?.data?.last === true }
  );

  const users = data?.data?.content ?? [];
  const isLastPage = data?.data?.last === true;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {isError && <p className="text-center text-red-500">Unable to load brides.</p>}
      {isLoading && page === 0 && <p>Loading brides...</p>}

      {users.map((profile) => (
        <GroomCard key={profile.userProfileId} profile={profile} />
      ))}

      {!isLastPage && (
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
  );
};

export default Brides;
