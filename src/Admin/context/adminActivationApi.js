// // src/Admin/context/adminActivationApi.js
// import { adminBaseApi } from "./apiSlice";
 
// export const adminActivationApi = adminBaseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // POST: Toggle user activation status
//     toggleUserActivationStatus: builder.mutation({
//       query: (userId) => ({
//         url: `/api/v1/admin/profile-activation/toggle/${userId}`,
//         method: "POST",
//         body: {}
//       }),
//       invalidatesTags: (result, error, userId) => [
//         { type: "User", id: userId }
//       ]
//     })
//   })
// });
 
// export const {
//   useToggleUserActivationStatusMutation,
// } = adminActivationApi;











// src/Admin/context/adminActivationApi.js
import { adminBaseApi } from "./apiSlice";
import { adminApi } from "./adminApi";

export const adminActivationApi = adminBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleUserActivationStatus: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/admin/profile-activation/toggle/${userId}`,
        method: "POST",
        body: {}
      }),

      // Optimistic update UI BEFORE server responds
      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        // Update cached list immediately
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

      // Invalidate any other caches
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