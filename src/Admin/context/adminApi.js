// src/Admin/context/adminApi.js
import { adminBaseApi } from "./apiSlice";

export const adminApi = adminBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProfiles: builder.query({
      query: ({ page = 0, size = 20 }) =>
        `/api/v1/admin/users/all?page=${page}&size=${size}`,
      providesTags: ["Admin"]
    }),

    getAdminProfileByUserId: builder.query({
      query: (userId) =>
        `/api/v1/admin/complete-profile/user/${userId}`,
      providesTags: ["Admin"]
    })
  })
});

export const {
  useGetAllProfilesQuery,
  useGetAdminProfileByUserIdQuery
} = adminApi;
