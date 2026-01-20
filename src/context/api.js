// src/context/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mttlprv1.digiledge.info",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("authToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  keepUnusedDataFor: 600,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,

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
    "CompleteProfile",
  ],

  endpoints: () => ({}),
});
