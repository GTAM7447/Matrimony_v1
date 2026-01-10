// // src/context/api.js
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://mttlprv1.digiledge.info",

//     prepareHeaders: (headers, { getState }) => {
//       const tokenFromState = getState()?.auth?.token;
//       const token = tokenFromState || localStorage.getItem("authToken");

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }

//       headers.set("Content-Type", "application/json");
//       return headers;
//     },
//   }),

//   tagTypes: [
//     "Profile",
//     "OwnProfile",
//     "ProfilePhoto",
//     "BrowseProfiles",
//     "SentInterests",
//     "ReceivedInterests",
//     "Horoscope",
//     "Family",
//     "PartnerPreference",
//     "Education",
//     "Contact",
//   ],

//   endpoints: () => ({}),
// });












// src/context/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mttlprv1.digiledge.info",

    prepareHeaders: (headers, { getState }) => {
      const tokenFromState = getState()?.auth?.token;
      const token = tokenFromState || localStorage.getItem("authToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  /**
   * IMPORTANT PERFORMANCE SETTINGS
   * ------------------------------
   * keepUnusedDataFor = Caches RTK Query responses
   * refetchOnMountOrArgChange = FALSE means it won't call API multiple times
   * refetchOnFocus & refetchOnReconnect disabled to avoid spam
   */
  keepUnusedDataFor: 600, // cache for 10 minutes (update freely)
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,

  /**
   * Your tag types (do NOT remove anything)
   */
  tagTypes: [
    "Profile",
    "OwnProfile",
    "ProfilePhoto",
    "BrowseProfiles",
    "SentInterests",
    "ReceivedInterests",
    "Horoscope",
    "Family",
    "PartnerPreference",
    "Education",
    "Contact",
    "ProfileCompletion",
    "CompleteProfile"
  ],

  endpoints: () => ({}),
});
