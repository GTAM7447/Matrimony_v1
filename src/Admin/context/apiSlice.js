// src/Admin/context/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Create the API slice - export as adminApi (not adminBaseApi)
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mttlprv1.digiledge.info",
    prepareHeaders: (headers) => {
      const token = Cookies.get("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    }
  }),
  tagTypes: ["Admin", "Users", "Profiles", "Reports", "Dashboard"],
  endpoints: (builder) => ({
    // Admin dashboard stats
    getAdminDashboard: builder.query({
      query: () => "/api/v1/admin/dashboard",
      providesTags: ["Dashboard"],
    }),

    // Get all users
    getUsers: builder.query({
      query: (params) => ({
        url: "/api/v1/admin/users",
        params,
      }),
      providesTags: ["Users"],
    }),

    // Get user by ID
    getUserById: builder.query({
      query: (id) => `/api/v1/admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),

    // Update user status
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/api/v1/admin/users/${userId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Users"],
    }),

    // Get all profiles
    getProfiles: builder.query({
      query: (params) => ({
        url: "/api/v1/admin/profiles",
        params,
      }),
      providesTags: ["Profiles"],
    }),

    // Get profile by ID
    getProfileById: builder.query({
      query: (id) => `/api/v1/admin/profiles/${id}`,
      providesTags: (result, error, id) => [{ type: "Profiles", id }],
    }),

    // Verify profile
    verifyProfile: builder.mutation({
      query: ({ profileId, verified }) => ({
        url: `/api/v1/admin/profiles/${profileId}/verify`,
        method: "PUT",
        body: { verified },
      }),
      invalidatesTags: ["Profiles"],
    }),

    // Get reports
    getReports: builder.query({
      query: (params) => ({
        url: "/api/v1/admin/reports",
        params,
      }),
      providesTags: ["Reports"],
    }),

    // Resolve report
    resolveReport: builder.mutation({
      query: ({ reportId, action }) => ({
        url: `/api/v1/admin/reports/${reportId}/resolve`,
        method: "PUT",
        body: { action },
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetAdminDashboardQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserStatusMutation,
  useGetProfilesQuery,
  useGetProfileByIdQuery,
  useVerifyProfileMutation,
  useGetReportsQuery,
  useResolveReportMutation,
} = adminApi;