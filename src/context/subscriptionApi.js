// src/context/subscriptionApi.js
// RTK Query endpoints for subscription and credit tracking

import { apiSlice } from "./api";

export const subscriptionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        /* ===================== CREDITS ===================== */

        /**
         * Get comprehensive credit information
         * Returns: subscription status, credit balance, limits, warnings, usage breakdown
         */
        getUserCredits: builder.query({
            query: () => `/api/subscriptions/credits`,
            providesTags: ["UserCredits"],
            keepUnusedDataFor: 60, // Cache for 1 minute (credits change frequently)
        }),

        /**
         * Get just the remaining credit count (lightweight)
         */
        getRemainingCredits: builder.query({
            query: () => `/api/subscriptions/credits/remaining`,
            providesTags: ["RemainingCredits"],
            keepUnusedDataFor: 30, // Cache for 30 seconds
        }),

        /**
         * Check if user can perform a specific action
         * @param {string} actionType - PROFILE_VIEW, CONTACT_REVEAL, SEND_INTEREST
         */
        canPerformAction: builder.query({
            query: (actionType) => `/api/subscriptions/can-perform/${actionType}`,
            providesTags: (result, error, actionType) => [
                { type: "ActionPermission", id: actionType },
            ],
            keepUnusedDataFor: 30,
        }),

        /* ===================== SUBSCRIPTION PLANS ===================== */

        /**
         * Get all available subscription plans
         */
        getSubscriptionPlans: builder.query({
            query: () => `/api/subscriptions/plans`,
            providesTags: ["SubscriptionPlans"],
            keepUnusedDataFor: 300, // Cache for 5 minutes (plans don't change often)
        }),

        /**
         * Get user's current subscription details
         */
        getCurrentSubscription: builder.query({
            query: () => `/api/subscriptions/current`,
            providesTags: ["CurrentSubscription"],
            keepUnusedDataFor: 60,
        }),

        /* ===================== ACTIONS ===================== */

        /**
         * Record a profile view (deducts credits)
         * Called when user views a profile
         */
        recordProfileView: builder.mutation({
            query: (profileId) => ({
                url: `/api/subscriptions/record-view/${profileId}`,
                method: "POST",
            }),
            // Invalidate credit caches after recording view
            invalidatesTags: ["UserCredits", "RemainingCredits"],
        }),

    }),
});

// Export hooks for use in components
export const {
    useGetUserCreditsQuery,
    useGetRemainingCreditsQuery,
    useCanPerformActionQuery,
    useGetSubscriptionPlansQuery,
    useGetCurrentSubscriptionQuery,
    useRecordProfileViewMutation,
} = subscriptionApi;

// Action types constants for easier use
export const ActionTypes = {
    PROFILE_VIEW: "PROFILE_VIEW",
    CONTACT_REVEAL: "CONTACT_REVEAL",
    SEND_INTEREST: "SEND_INTEREST",
};
