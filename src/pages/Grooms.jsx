
// import React, { useState, useMemo } from "react";
// import GroomCard from "../components/Brides/GroomCard";
// import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

// const PAGE_SIZE = 20;

// const Groom = () => {
//   const [page, setPage] = useState(0);

//   const { data, isLoading, isFetching, isError } =
//     useBrowseProfilesByGenderQuery({
//       gender: "MALE",
//       page,
//       size: PAGE_SIZE,
//     });

//   const users = useMemo(() => data?.data?.content ?? [], [data]);
//   const isLastPage = data?.data?.last === true;

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       {isError && (
//         <p className="text-center text-red-500">
//           Unable to load grooms right now.
//         </p>
//       )}

//       {isLoading && page === 0 && <p>Loading grooms...</p>}

//       {users.map((profile) => (
//         <GroomCard
//           key={profile.userProfileId}
//           profile={profile}
//         />
//       ))}

//       {!isLastPage && (
//         <div className="text-center">
//           <button
//             onClick={() => setPage((p) => p + 1)}
//             disabled={isFetching}
//             className="bg-orange-500 text-white px-6 py-2 rounded-md
//                        hover:bg-orange-600 disabled:opacity-60"
//           >
//             {isFetching ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Groom;

























import React, { useState, useMemo } from "react";
import GroomCard from "../components/Brides/GroomCard";
import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

const PAGE_SIZE = 20;

const Groom = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching, isError } =
    useBrowseProfilesByGenderQuery({
      gender: "MALE",
      page,
      size: PAGE_SIZE,
    });

  /* MEMOIZED USERS LIST */
  const users = useMemo(() => data?.data?.content ?? [], [data]);
  const isLastPage = data?.data?.last === true;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {isError && (
        <p className="text-center text-red-500">
          Unable to load grooms right now.
        </p>
      )}

      {isLoading && page === 0 && <p>Loading grooms...</p>}

      {users.map((profile) => (
        <GroomCard
          key={profile.userProfileId}
          profile={profile}
        />
      ))}

      {!isLastPage && (
        <div className="text-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={isFetching}
            className="bg-orange-500 text-white px-6 py-2 rounded-md
                       hover:bg-orange-600 disabled:opacity-60"
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Groom;