// src/context/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../utils/auth";
import { logUnauthorizedAccess, SecurityEvents, logSecurityEvent } from "../utils/securityLogger";

// Centralized Base URL
import { BASE_URL } from "../apiConfig";
export { BASE_URL };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    // CRITICAL: Include credentials for HttpOnly cookies
    credentials: 'include',

    prepareHeaders: (headers, { getState }) => {
      const tokenFromState = getState()?.auth?.token;
      const token = tokenFromState || getAuthToken();

      // With HttpOnly cookies, browser automatically sends them
      // But we still include Authorization header for backward compatibility
      if (token && token !== 'http_only_token') {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },

    // Handle responses and log security events
    validateStatus: (response, result) => {
      // Log unauthorized access
      if (response.status === 401) {
        logUnauthorizedAccess(response.url, 401);
      }

      // Log forbidden access
      if (response.status === 403) {
        logSecurityEvent(SecurityEvents.FORBIDDEN_ACCESS, {
          endpoint: response.url,
          status: 403,
        });
      }

      // Default RTK Query validation
      return response.status >= 200 && response.status < 300;
    },
  }),

  /**
   * IMPORTANT PERFORMANCE SETTINGS
   * ------------------------------
   * keepUnusedDataFor = Caches RTK Query responses
   * refetchOnMountOrArgChange = FALSE means it won't call API multiple times
   * refetchOnFocus & refetchOnReconnect disabled to avoid spam
   */
  keepUnusedDataFor: 600, // cache for 10 minutes
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,

  /**
   * Tag types for cache invalidation
   */
  tagTypes: [
    // User Profile Tags
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
    // Credit & Subscription Tags
    "UserCredits",
    "RemainingCredits",
    "ActionPermission",
    "SubscriptionPlans",
    "CurrentSubscription",
    // Admin Tags (for cross-module cache invalidation if needed)
    "Admin",
    "AdminProfiles"
  ],

  endpoints: () => ({}),
});
