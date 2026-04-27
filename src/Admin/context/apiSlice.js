// src/Admin/context/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/auth";
import { BASE_URL } from "../../apiConfig";
import { logUnauthorizedAccess, SecurityEvents, logSecurityEvent } from "../../utils/securityLogger";

export const adminBaseApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    // CRITICAL: Include credentials for HttpOnly cookies (consistent with User API)
    credentials: 'include',

    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token && token !== 'http_only_token') {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },

    // Security logging (consistent with User API)
    validateStatus: (response) => {
      if (response.status === 401) {
        logUnauthorizedAccess(response.url, 401);
      }
      if (response.status === 403) {
        logSecurityEvent(SecurityEvents.FORBIDDEN_ACCESS, {
          endpoint: response.url,
          status: 403,
        });
      }
      return response.status >= 200 && response.status < 300;
    },
  }),

  // Performance settings
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,

  tagTypes: ["Admin", "AdminProfiles", "AdminSubscriptions"],
  endpoints: () => ({})
});
