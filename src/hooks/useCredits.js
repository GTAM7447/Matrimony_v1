// src/hooks/useCredits.js
// Custom hook for credit tracking and permission checking

import { useCallback, useState } from "react";
import {
    useGetUserCreditsQuery,
    useCanPerformActionQuery,
    ActionTypes,
} from "../context/subscriptionApi";

/**
 * useCredits - Hook for credit management and permission checks
 * 
 * @returns {object} Credit state and helper functions
 */
export const useCredits = () => {
    const {
        data: creditsResponse,
        isLoading: isLoadingCredits,
        refetch: refetchCredits,
        error: creditsError
    } = useGetUserCreditsQuery();

    const credits = creditsResponse?.data;

    return {
        // Credit data
        credits,
        remainingCredits: credits?.remainingCredits || 0,
        hasActiveSubscription: credits?.hasActiveSubscription || false,

        // Permissions
        canViewProfiles: credits?.canViewProfiles || false,
        canRevealContacts: credits?.canRevealContacts || false,
        canSendInterests: credits?.canSendInterests || false,

        // Warnings
        lowCreditsWarning: credits?.lowCreditsWarning || false,
        criticalCreditsWarning: credits?.criticalCreditsWarning || false,
        warningMessage: credits?.warningMessage,

        // Limits
        dailyLimitReached: credits?.dailyLimitReached || false,
        monthlyLimitReached: credits?.monthlyLimitReached || false,

        // State
        isLoading: isLoadingCredits,
        error: creditsError,

        // Actions
        refreshCredits: refetchCredits,
    };
};

/**
 * useCanPerformAction - Hook to check if specific action is allowed
 * 
 * @param {string} actionType - PROFILE_VIEW, CONTACT_REVEAL, SEND_INTEREST
 * @returns {object} Permission state
 */
export const useCanPerformAction = (actionType) => {
    const {
        data: response,
        isLoading,
        refetch
    } = useCanPerformActionQuery(actionType, {
        skip: !actionType,
    });

    return {
        canPerform: response?.data?.canPerform || false,
        isLoading,
        refetch,
    };
};

/**
 * useCreditCheck - Hook for checking credits before an action
 * Returns a function that checks and returns modal type if action is blocked
 * 
 * @returns {function} checkCredits(actionType) => { allowed: boolean, modalType?: string }
 */
export const useCreditCheck = () => {
    const { credits, hasActiveSubscription, dailyLimitReached, monthlyLimitReached } = useCredits();

    const checkCredits = useCallback((actionType) => {
        // No subscription
        if (!hasActiveSubscription) {
            return { allowed: false, modalType: "no_subscription" };
        }

        // Daily limit reached
        if (dailyLimitReached) {
            return { allowed: false, modalType: "daily_limit" };
        }

        // Monthly limit reached
        if (monthlyLimitReached) {
            return { allowed: false, modalType: "monthly_limit" };
        }

        // Check specific action permissions
        switch (actionType) {
            case ActionTypes.PROFILE_VIEW:
                if (!credits?.canViewProfiles) {
                    return { allowed: false, modalType: "insufficient_credits" };
                }
                break;
            case ActionTypes.CONTACT_REVEAL:
                if (!credits?.canRevealContacts) {
                    return { allowed: false, modalType: "insufficient_credits" };
                }
                break;
            case ActionTypes.SEND_INTEREST:
                if (!credits?.canSendInterests) {
                    return { allowed: false, modalType: "insufficient_credits" };
                }
                break;
        }

        return { allowed: true };
    }, [credits, hasActiveSubscription, dailyLimitReached, monthlyLimitReached]);

    return { checkCredits };
};

// Re-export action types for convenience
export { ActionTypes };

export default useCredits;
