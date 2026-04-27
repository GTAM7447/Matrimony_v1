// src/components/CreditWidget/CreditWidget.jsx
import React from "react";
import { AlertCircle, TrendingDown, Coins, Loader2 } from "lucide-react";
import { useGetUserCreditsQuery } from "../../context/subscriptionApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isAuthenticated } from "../../utils/auth";

/**
 * CreditWidget - Displays user credit information
 * Shows credit balance, usage progress, warnings, and subscription status
 */
const CreditWidget = ({ compact = false }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    // Use both AuthContext AND utility function for reliable login check
    const userLoggedIn = isLoggedIn || isAuthenticated();

    const { data: response, isLoading, error } = useGetUserCreditsQuery(undefined, {
        skip: !userLoggedIn, // Don't fetch if not logged in
    });

    const credits = response?.data;

    // Not logged in - don't show anything
    if (!userLoggedIn) {
        return null;
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
                <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                <span className="text-sm text-gray-500">Credits...</span>
            </div>
        );
    }

    // Error state or no data - show "Subscribe" button instead of hiding
    if (error || !credits) {
        return (
            <div
                className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 cursor-pointer hover:bg-orange-100 transition-colors"
                onClick={() => navigate("/plans")}
                title="View membership plans"
            >
                <Coins className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">
                    Get Credits
                </span>
            </div>
        );
    }

    // No active subscription - show subscribe prompt
    if (!credits?.hasActiveSubscription) {
        return (
            <div
                className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 rounded-full px-4 py-2 cursor-pointer hover:bg-yellow-100 transition-colors"
                onClick={() => navigate("/plans")}
                title="Subscribe to view profiles"
            >
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">
                    Subscribe
                </span>
            </div>
        );
    }

    // Compact mode - show credits with label
    if (compact) {
        return (
            <div
                className="flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-2 cursor-pointer hover:shadow-md hover:border-orange-400 transition-all"
                onClick={() => navigate("/ViewProfilePage")}
                title={`${credits.remainingCredits} credits remaining out of ${credits.allocatedCredits}`}
            >
                <Coins className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-gray-700">
                    Credits: <span className="text-orange-600">{credits.remainingCredits}</span>
                    <span className="text-gray-400 text-xs">/{credits.allocatedCredits}</span>
                </span>
                {credits.lowCreditsWarning && (
                    <TrendingDown className="w-4 h-4 text-yellow-500" />
                )}
                {credits.criticalCreditsWarning && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                )}
            </div>
        );
    }

    // Full widget
    const progressPercentage = 100 - (credits.creditUsagePercentage || 0);
    const progressColor = credits.criticalCreditsWarning
        ? "bg-red-500"
        : credits.lowCreditsWarning
            ? "bg-yellow-500"
            : "bg-green-500";

    return (
        <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Coins className="w-4 h-4 text-orange-500" />
                Your Credits
            </h3>

            {/* Credit Balance */}
            <div className="mb-3">
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-gray-500">Remaining</span>
                    <span className="text-lg font-bold text-blue-600">
                        {credits.remainingCredits}
                        <span className="text-xs text-gray-400 font-normal">
                            /{credits.allocatedCredits}
                        </span>
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-500 ${progressColor}`}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            {/* Daily/Monthly Info */}
            {credits.dailyLimit && (
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Today: {credits.dailyCreditsUsed}/{credits.dailyLimit}</span>
                    <span>Month: {credits.monthlyCreditsUsed}/{credits.monthlyLimit}</span>
                </div>
            )}

            {/* Warning Message */}
            {credits.warningMessage && (
                <div className={`
          p-2 rounded text-xs mt-2 flex items-start gap-2
          ${credits.criticalCreditsWarning
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    }
        `}>
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{credits.warningMessage}</span>
                </div>
            )}

            {/* Usage Breakdown */}
            <details className="mt-3">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                    Usage Breakdown
                </summary>
                <div className="mt-2 space-y-1 text-xs">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Profile Views</span>
                        <span className="font-medium">{credits.profileViewsUsed || 0}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Contact Reveals</span>
                        <span className="font-medium">{credits.contactRevealsUsed || 0}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Interests Sent</span>
                        <span className="font-medium">{credits.interestsSentUsed || 0}</span>
                    </div>
                </div>
            </details>

            {/* Plan Info */}
            <div className="mt-3 pt-2 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
                <span>{credits.subscriptionPlanName}</span>
                {credits.subscriptionEndDate && (
                    <span>Expires: {new Date(credits.subscriptionEndDate).toLocaleDateString()}</span>
                )}
            </div>

            {/* Upgrade Button */}
            {(credits.lowCreditsWarning || credits.criticalCreditsWarning) && (
                <button
                    onClick={() => navigate("/plans")}
                    className="w-full mt-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg hover:shadow-md transition-all"
                >
                    Upgrade Plan
                </button>
            )}
        </div>
    );
};

export default CreditWidget;
