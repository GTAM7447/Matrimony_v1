// // src/Admin/context/adminApi.js
// import { adminBaseApi } from "./apiSlice";

// export const adminApi = adminBaseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllProfiles: builder.query({
//       query: ({ page = 0, size = 20 }) =>
//         `/api/v1/admin/users/all?page=${page}&size=${size}`,
//       providesTags: ["Admin"]
//     }),

//     getAdminProfileByUserId: builder.query({
//       query: (userId) =>
//         `/api/v1/admin/complete-profile/user/${userId}`,
//       providesTags: ["Admin"]
//     })
//   })
// });

// export const {
//   useGetAllProfilesQuery,
//   useGetAdminProfileByUserIdQuery
// } = adminApi;










// src/Admin/context/adminApi.js
import { adminBaseApi } from "./apiSlice";

export const adminApi = adminBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated admin users
    getAllProfiles: builder.query({
      query: ({ page = 0, size = 20 }) =>
        `/api/v1/admin/users/all?page=${page}&size=${size}`,

      providesTags: ["Admin"],

      // Caching & performance
      keepUnusedDataFor: 300,              // keep cached data for 5 minutes
      refetchOnFocus: true,                // refresh when tab refocused
      refetchOnReconnect: true,            // refresh on internet return
      refetchOnMountOrArgChange: false     // DO NOT auto refetch if cached
    }),

    // Get one complete profile
    getAdminProfileByUserId: builder.query({
      query: (userId) =>
        `/api/v1/admin/complete-profile/user/${userId}`,

      providesTags: (result, error, arg) => [
        { type: "Admin", id: arg }
      ],

      // Same caching strategy
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: false
    })
  })
});

export const {
  useGetAllProfilesQuery,
  useLazyGetAllProfilesQuery,
  useGetAdminProfileByUserIdQuery,
  useLazyGetAdminProfileByUserIdQuery
} = adminApi;