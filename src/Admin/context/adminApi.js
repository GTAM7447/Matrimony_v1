// src/Admin/context/adminApi.js

// CHANGE THIS LINE TOO:
import { adminApi } from "./apiSlice";  // ✅ Use adminApi instead of adminBaseApi

export const enhancedAdminApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProfiles: builder.query({
      query: ({ page = 0, size = 20 }) =>
        `/api/v1/admin/users/all?page=${page}&size=${size}`,
      providesTags: ["Admin"],
      keepUnusedDataFor: 300,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: false
    }),

    getAdminProfileByUserId: builder.query({
      query: (userId) =>
        `/api/v1/admin/complete-profile/user/${userId}`,
      providesTags: (result, error, arg) => [
        { type: "Admin", id: arg }
      ],
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
} = enhancedAdminApi;