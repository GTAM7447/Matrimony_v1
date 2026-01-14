// // // src/context/profileApi.js
// // import { apiSlice } from "./api";

// // export const profileApi = apiSlice.injectEndpoints({
// //   endpoints: (builder) => ({

// //     /* =====================================================
// //        PROFILE (PUBLIC / PRIVATE)
// //     ===================================================== */

// //     // Public profile by profileId
// //     getPublicProfileById: builder.query({
// //       query: (profileId) =>
// //         `/api/v1/profiles/${profileId}/public`,
// //       providesTags: (result, error, profileId) => [
// //         { type: "PublicProfile", id: profileId },
// //       ],
// //       keepUnusedDataFor: 300, // 5 minutes cache
// //     }),

// //     // Complete public profile
// //     getProfileByProfileId: builder.query({
// //       query: (profileId) =>
// //         `/api/v1/complete-profile/public/profile/${profileId}`,
// //       providesTags: (result, error, profileId) => [
// //         { type: "Profile", id: profileId },
// //       ],
// //       keepUnusedDataFor: 300,
// //     }),

// //     // Logged-in user's own profile
// //     getOwnProfile: builder.query({
// //       query: () => `/api/v1/complete-profile/me`,
// //       providesTags: ["OwnProfile"],
// //       keepUnusedDataFor: 600, // 10 minutes
// //     }),

// //     /* =====================================================
// //        PROFILE PHOTO
// //     ===================================================== */

// //     getProfilePhoto: builder.query({
// //       query: () => `/api/v1/documents/type/PROFILE_PHOTO`,
// //       providesTags: ["ProfilePhoto"],
// //       keepUnusedDataFor: 600,
// //     }),

// //     /* =====================================================
// //        BROWSE BRIDES / GROOMS
// //     ===================================================== */

// //     browseProfilesByGender: builder.query({
// //       query: ({ gender, page = 0, size = 20 }) =>
// //         `/api/v1/profiles/browse/gender/${gender}?page=${page}&size=${size}`,
// //       providesTags: (result) =>
// //         result?.data?.content
// //           ? [
// //               ...result.data.content.map((profile) => ({
// //                 type: "BrowseProfiles",
// //                 id: profile.profileId,
// //               })),
// //               "BrowseProfiles",
// //             ]
// //           : ["BrowseProfiles"],
// //       keepUnusedDataFor: 120,
// //     }),

// //     /* =====================================================
// //        INTERESTS
// //     ===================================================== */

// //     sendInterest: builder.mutation({
// //       query: ({ toUserId, message }) => ({
// //         url: "/api/v1/interests",
// //         method: "POST",
// //         body: {
// //           toUserId,
// //           message: message || "Hi! I found your profile interesting.",
// //           sourcePlatform: "WEB",
// //           autoMatched: false,
// //         },
// //       }),
// //       invalidatesTags: ["SentInterests", "ReceivedInterests"],
// //     }),

// //     getSentInterests: builder.query({
// //       query: () => `/api/v1/interests/sent`,
// //       providesTags: ["SentInterests"],
// //       keepUnusedDataFor: 60,
// //     }),

// //     getReceivedInterests: builder.query({
// //       query: () => `/api/v1/interests/received`,
// //       providesTags: ["ReceivedInterests"],
// //       keepUnusedDataFor: 60,
// //     }),

// //     /* =====================================================
// //        FAVORITES
// //     ===================================================== */

// //     addToFavorite: builder.mutation({
// //       query: (profileId) => ({
// //         url: "/api/favorite/add",
// //         method: "POST",
// //         body: { profileId },
// //       }),
// //     }),

// //   }),
// // });

// // /* =====================================================
// //    EXPORT HOOKS
// // ===================================================== */

// // export const {
// //   useGetPublicProfileByIdQuery,
// //   useGetProfileByProfileIdQuery,
// //   useGetOwnProfileQuery,
// //   useGetProfilePhotoQuery,

// //   useBrowseProfilesByGenderQuery,

// //   useSendInterestMutation,
// //   useGetSentInterestsQuery,
// //   useGetReceivedInterestsQuery,

// //   useAddToFavoriteMutation,
// // } = profileApi;










// // src/context/profileApi.js
// import { apiSlice } from "./api";

// export const profileApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({

//     /*  PROFILE (PUBLIC / PRIVATE) */

//     getPublicProfileById: builder.query({
//       query: (profileId) =>
//         `/api/v1/profiles/${profileId}/public`,
//       providesTags: (result, error, profileId) => [
//         { type: "PublicProfile", id: profileId },
//       ],
//       keepUnusedDataFor: 300,
//     }),

//     getProfileByProfileId: builder.query({
//       query: (profileId) =>
//         `/api/v1/complete-profile/public/profile/${profileId}`,
//       providesTags: (result, error, profileId) => [
//         { type: "Profile", id: profileId },
//       ],
//       keepUnusedDataFor: 300,
//     }),

//     getOwnProfile: builder.query({
//       query: () => `/api/v1/complete-profile/me`,
//       providesTags: ["OwnProfile"],
//       keepUnusedDataFor: 600,
//     }),

//     /*  PROFILE PHOTO */

//     getProfilePhoto: builder.query({
//       query: () => `/api/v1/documents/type/PROFILE_PHOTO`,
//       providesTags: ["ProfilePhoto"],
//       keepUnusedDataFor: 600,
//     }),

//     /*  BROWSE BRIDES / GROOMS (PAGINATED + CACHED) */

//     browseProfilesByGender: builder.query({
//       query: ({ gender, page = 0, size = 20 }) =>
//         `/api/v1/profiles/browse/gender/${gender}?page=${page}&size=${size}`,

//       // Cache key per gender + page
//       serializeQueryArgs: ({ endpointName, queryArgs }) =>
//         `${endpointName}-${queryArgs.gender}-${queryArgs.page}`,

//       keepUnusedDataFor: 600,
//     }),

//     /* INTERESTS */

//     sendInterest: builder.mutation({
//       query: ({ toUserId, message }) => ({
//         url: "/api/v1/interests",
//         method: "POST",
//         body: {
//           toUserId,
//           message: message || "Hi! I found your profile interesting.",
//           sourcePlatform: "WEB",
//           autoMatched: false,
//         },
//       }),
//       invalidatesTags: ["SentInterests", "ReceivedInterests"],
//     }),

//     getSentInterests: builder.query({
//       query: () => `/api/v1/interests/sent`,
//       providesTags: ["SentInterests"],
//       keepUnusedDataFor: 60,
//     }),

//     getReceivedInterests: builder.query({
//       query: () => `/api/v1/interests/received`,
//       providesTags: ["ReceivedInterests"],
//       keepUnusedDataFor: 60,
//     }),


//       getPublicProfileByIdV2: builder.query({
//       query: (profileId) =>
//         `/api/v1/profiles/public/${profileId}`,
//       keepUnusedDataFor: 300,
//     }),

//     /* FAVORITES (OPTIMISTIC CACHE UPDATE) */

//     addToFavorite: builder.mutation({
//       query: (profileId) => ({
//         url: "/api/favorite/add",
//         method: "POST",
//         body: { profileId },
//       }),

//       async onQueryStarted(profileId, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;

//           // Update cached Bride & Groom lists
//           ["MALE", "FEMALE"].forEach((gender) => {
//             for (let page = 0; page < 5; page++) {
//               dispatch(
//                 profileApi.util.updateQueryData(
//                   "browseProfilesByGender",
//                   { gender, page, size: 20 },
//                   (draft) => {
//                     const list = draft?.data?.content;
//                     if (!Array.isArray(list)) return;

//                     const user = list.find(
//                       (u) => u.userProfileId === profileId
//                     );

//                     if (user) {
//                       user.isFavorited = true;
//                     }
//                   }
//                 )
//               );
//             }
//           });
//         } catch (error) {
//           // Silent fail — backend will correct on refetch
//           console.error("Favorite update failed:", error);
//         }
//       },
//     }),

//   }),
// });

// /*  EXPORT HOOKS */

// export const {
//   useGetPublicProfileByIdQuery,
//   useGetPublicProfileByIdV2Query,
//   useGetProfileByProfileIdQuery,
//   useGetOwnProfileQuery,
//   useGetProfilePhotoQuery,
//   useBrowseProfilesByGenderQuery,
//   useSendInterestMutation,
//   useGetSentInterestsQuery,
//   useGetReceivedInterestsQuery,
//   useAddToFavoriteMutation,
// } = profileApi;























// src/context/profileApi.js
import { apiSlice } from "./api";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    /* ===================== PROFILE ===================== */

    getPublicProfileById: builder.query({
      query: (profileId) => `/api/v1/profiles/${profileId}/public`,
      providesTags: (r, e, profileId) => [
        { type: "PublicProfile", id: profileId },
      ],
      keepUnusedDataFor: 300,
    }),

    getPublicProfileByIdV2: builder.query({
      query: (profileId) => `/api/v1/profiles/public/${profileId}`,
      providesTags: (r, e, profileId) => [
        { type: "PublicProfile", id: profileId },
      ],
      keepUnusedDataFor: 300,
    }),

    getProfileByProfileId: builder.query({
      query: (profileId) =>
        `/api/v1/complete-profile/public/profile/${profileId}`,
      providesTags: (r, e, profileId) => [
        { type: "Profile", id: profileId },
      ],
      keepUnusedDataFor: 300,
    }),

    getOwnProfile: builder.query({
      query: () => `/api/v1/complete-profile/me`,
      providesTags: ["OwnProfile"],
      keepUnusedDataFor: 600,
    }),

    /* ===================== PROFILE PHOTO ===================== */

    getProfilePhoto: builder.query({
      query: () => `/api/v1/documents/type/PROFILE_PHOTO`,
      providesTags: ["ProfilePhoto"],
      keepUnusedDataFor: 600,
    }),

    /* ===================== BROWSE ===================== */

    browseProfilesByGender: builder.query({
      query: ({ gender, page = 0, size = 20 }) =>
        `/api/v1/profiles/browse/gender/${gender}?page=${page}&size=${size}`,
      keepUnusedDataFor: 600,
    }),

    /* ===================== INTERESTS ===================== */

    sendInterest: builder.mutation({
      query: ({ toUserId, message }) => ({
        url: "/api/v1/interests",
        method: "POST",
        body: {
          toUserId,
          message: message || "Hi! I found your profile interesting.",
          sourcePlatform: "WEB",
          autoMatched: false,
        },
      }),
      invalidatesTags: ["SentInterests", "ReceivedInterests"],
    }),

    getSentInterests: builder.query({
      query: () => `/api/v1/interests/sent`,
      providesTags: ["SentInterests"],
      keepUnusedDataFor: 60,
    }),

    getReceivedInterests: builder.query({
      query: () => `/api/v1/interests/received`,
      providesTags: ["ReceivedInterests"],
      keepUnusedDataFor: 60,
    }),

    /* ===================== FAVORITES ===================== */

    addToFavorite: builder.mutation({
      query: (profileId) => ({
        url: "/api/favorite/add",
        method: "POST",
        body: { profileId },
      }),

      async onQueryStarted(profileId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          ["MALE", "FEMALE"].forEach((gender) => {
            for (let page = 0; page < 5; page++) {
              dispatch(
                profileApi.util.updateQueryData(
                  "browseProfilesByGender",
                  { gender, page, size: 20 },
                  (draft) => {
                    const list = draft?.data?.content;
                    if (!Array.isArray(list)) return;

                    const user = list.find(
                      (u) => u.userProfileId === profileId
                    );

                    if (user) user.isFavorited = true;
                  }
                )
              );
            }
          });
        } catch (err) {
          console.error("Favorite update failed", err);
        }
      },
    }),

  }),
});

export const {
  useGetPublicProfileByIdQuery,
  useGetPublicProfileByIdV2Query,
  useGetProfileByProfileIdQuery,
  useGetOwnProfileQuery,
  useGetProfilePhotoQuery,
  useBrowseProfilesByGenderQuery,
  useSendInterestMutation,
  useGetSentInterestsQuery,
  useGetReceivedInterestsQuery,
  useAddToFavoriteMutation,
} = profileApi;
