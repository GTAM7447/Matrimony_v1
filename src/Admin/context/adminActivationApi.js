// src/Admin/context/adminActivationApi.js

// CHANGE THIS LINE:
import { adminApi } from "./apiSlice";  // ✅ Use adminApi instead of adminBaseApi

export const adminActivationApi = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleUserActivationStatus: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/admin/profile-activation/toggle/${userId}`,
        method: "POST",
        body: {}
      }),

      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          adminApi.util.updateQueryData(
            "getAllProfiles",
            { page: 0, size: 20 },
            (draft) => {
              const user = draft?.content?.find((u) => u.userId === userId);
              if (user) {
                user.status =
                  user.status === "Active" ? "Inactive" : "Active";
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();    
        }
      },

      invalidatesTags: (result, error, userId) => [
        { type: "Admin" },
        { type: "Admin", id: userId }
      ]
    })
  })
});

export const {
  useToggleUserActivationStatusMutation
} = adminActivationApi;