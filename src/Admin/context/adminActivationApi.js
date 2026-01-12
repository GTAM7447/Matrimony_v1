// src/Admin/context/adminActivationApi.js
import { adminBaseApi } from "./apiSlice";
 
export const adminActivationApi = adminBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST: Toggle user activation status
    toggleUserActivationStatus: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/admin/profile-activation/toggle/${userId}`,
        method: "POST",
        body: {}
      }),
      invalidatesTags: (result, error, userId) => [
        { type: "User", id: userId }
      ]
    })
  })
});
 
export const {
  useToggleUserActivationStatusMutation,
} = adminActivationApi;