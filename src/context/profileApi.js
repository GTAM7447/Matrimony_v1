// // src/context/profileApi.js
// import { apiSlice } from "./api";

// export const profileApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({

//     /* ===================== PROFILE ===================== */

//     getPublicProfileById: builder.query({
//       query: (profileId) => `/api/v1/profiles/${profileId}/public`,
//       providesTags: (r, e, profileId) => [
//         { type: "PublicProfile", id: profileId },
//       ],
//       keepUnusedDataFor: 300,
//     }),

//     getPublicProfileByIdV2: builder.query({
//       query: (profileId) => `/api/v1/profiles/public/${profileId}`,
//       providesTags: (r, e, profileId) => [
//         { type: "PublicProfile", id: profileId },
//       ],
//       keepUnusedDataFor: 300,
//     }),

//     getProfileByProfileId: builder.query({
//       query: (profileId) =>
//         `/api/v1/complete-profile/public/profile/${profileId}`,
//       providesTags: (r, e, profileId) => [
//         { type: "Profile", id: profileId },
//       ],
//       keepUnusedDataFor: 300,
//     }),

//     getOwnProfile: builder.query({
//       query: () => `/api/v1/complete-profile/me`,
//       providesTags: ["OwnProfile"],
//       keepUnusedDataFor: 600,
//     }),

//     /* ===================== PROFILE PHOTO ===================== */

//     getProfilePhoto: builder.query({
//       query: () => `/api/v1/documents/type/PROFILE_PHOTO`,
//       providesTags: ["ProfilePhoto"],
//       keepUnusedDataFor: 600,
//     }),

//     /* ===================== BROWSE ===================== */

//     browseProfilesByGender: builder.query({
//       query: ({ gender, page = 0, size = 20 }) =>
//         `/api/v1/profiles/browse/gender/${gender}?page=${page}&size=${size}`,
//       keepUnusedDataFor: 600,
//     }),

//     /* ===================== INTERESTS ===================== */

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

//     /* ===================== FAVORITES ===================== */

//     addToFavorite: builder.mutation({
//       query: (profileId) => ({
//         url: "/api/favorite/add",
//         method: "POST",
//         body: { profileId },
//       }),

//       async onQueryStarted(profileId, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;

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

//                     if (user) user.isFavorited = true;
//                   }
//                 )
//               );
//             }
//           });
//         } catch (err) {
//           console.error("Favorite update failed", err);
//         }
//       },
//     }),

//   }),
// });

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
      refetchOnMountOrArgChange: false,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),

    getPublicProfileByIdV2: builder.query({
      query: (profileId) => `/api/v1/profiles/public/${profileId}`,
      providesTags: (r, e, profileId) => [
        { type: "PublicProfile", id: profileId },
      ],
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),

    getProfileByProfileId: builder.query({
      query: (profileId) =>
        `/api/v1/complete-profile/public/profile/${profileId}`,
      providesTags: (r, e, profileId) => [
        { type: "Profile", id: profileId },
      ],
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),

    getOwnProfile: builder.query({
      query: () => `/api/v1/complete-profile/me`,
      providesTags: ["OwnProfile"],
      keepUnusedDataFor: 600,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),

    /* ===================== PROFILE PHOTO ===================== */

    getProfilePhoto: builder.query({
      query: () => `/api/v1/documents/type/PROFILE_PHOTO`,
      providesTags: ["ProfilePhoto"],
      keepUnusedDataFor: 600,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),

    /* ===================== BROWSE (FIXED) ===================== */

    browseProfilesByGender: builder.query({
      query: ({ gender, page = 0, size = 20 }) =>
        `/api/v1/profiles/browse/gender/${gender}?page=${page}&size=${size}`,

      /* Normalize BEFORE UI sees it */
      transformResponse: (response) => {
        const list = response?.data?.content ?? [];

        return {
          ...response,
          data: {
            ...response.data,
            content: list.map((raw) => ({
              userProfileId: raw.userProfileId ?? raw.profileId ?? raw.id ?? null,
              completeProfileId: raw.completeProfileId ?? raw.userId ?? raw.id ?? null,
              firstName: raw.firstName ?? raw.name ?? "",
              age: raw.age ?? raw.profileAge ?? null,
              gender: raw.gender ?? "",
              religion: raw.religion ?? "",
              caste: raw.caste ?? "",
              currentCity: raw.currentCity ?? raw.city ?? "",
              maritalStatus: raw.maritalStatus ?? "",
              hasProfilePhoto: raw.hasProfilePhoto ?? !!raw.profilePhotoBase64,
              profilePhotoBase64: raw.profilePhotoBase64 ?? null,
              profilePhotoContentType: raw.profilePhotoContentType ?? null,
              isFavorited: !!raw.isFavorited,
            })),
          },
        };
      },

      providesTags: (result, error, { gender }) => [
        { type: "Browse", id: gender },
      ],

      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: true,
      refetchOnReconnect: true,
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
        const patches = [];

        ["MALE", "FEMALE"].forEach((gender) => {
          for (let page = 0; page < 5; page++) {
            const patch = dispatch(
              profileApi.util.updateQueryData(
                "browseProfilesByGender",
                { gender, page, size: 20 },
                (draft) => {
                  const list = draft?.data?.content;
                  if (!Array.isArray(list)) return;
                  const user = list.find((u) => u.userProfileId === profileId);
                  if (user) user.isFavorited = true;
                }
              )
            );
            patches.push(patch);
          }
        });

        try {
          await queryFulfilled;
        } catch {
          patches.forEach((p) => p.undo());
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