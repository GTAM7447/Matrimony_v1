// src/components/SubscriptionModal/SubscriptionModal.jsx
import React from "react";
import { X, Crown, Lock, TrendingUp, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * SubscriptionModal - Shown when user lacks credits or subscription
 * 
 * @param {boolean} open - Whether modal is open
 * @param {function} onClose - Close handler
 * @param {string} type - 'no_subscription' | 'insufficient_credits' | 'daily_limit' | 'monthly_limit'
 * @param {string} actionType - What action was attempted (PROFILE_VIEW, CONTACT_REVEAL, etc.)
 */
const SubscriptionModal = ({
    open,
    onClose,
    type = "no_subscription",
    actionType = "view profiles"
}) => {
    const navigate = useNavigate();

    if (!open) return null;

    const getContent = () => {
        switch (type) {
            case "insufficient_credits":
                return {
                    icon: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
                    title: "Insufficient Credits",
                    description: `You don't have enough credits to ${actionType}. Upgrade your plan or wait for your credits to reset.`,
                    primaryAction: "Upgrade Plan",
                    secondaryAction: "Maybe Later",
                };
            case "daily_limit":
                return {
                    icon: <TrendingUp className="w-12 h-12 text-orange-500" />,
                    title: "Daily Limit Reached",
                    description: "You've reached your daily limit. Your limit will reset tomorrow, or you can upgrade for unlimited access.",
                    primaryAction: "Upgrade Plan",
                    secondaryAction: "Try Tomorrow",
                };
            case "monthly_limit":
                return {
                    icon: <TrendingUp className="w-12 h-12 text-red-500" />,
                    title: "Monthly Limit Reached",
                    description: "You've reached your monthly credit limit. Upgrade to continue connecting with matches.",
                    primaryAction: "Upgrade Plan",
                    secondaryAction: "Close",
                };
            default: // no_subscription
                return {
                    icon: <Crown className="w-12 h-12 text-purple-500" />,
                    title: "Subscription Required",
                    description: "Subscribe to a plan to view profiles, reveal contacts, and connect with your perfect match.",
                    primaryAction: "View Plans",
                    secondaryAction: "Maybe Later",
                };
        }
    };

    const content = getContent();

    const handlePrimaryAction = () => {
        onClose();
        navigate("/plans");
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[301] flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Header with gradient */}
                    <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-6 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-4">
                            {content.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-white">{content.title}</h2>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <p className="text-gray-600 text-center mb-6">
                            {content.description}
                        </p>

                        {/* Features list for subscription modal */}
                        {type === "no_subscription" && (
                            <div className="space-y-3 mb-6">
                                {[
                                    "View unlimited profiles",
                                    "Reveal contact details",
                                    "Send interests to matches",
                                    "Priority in search results",
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-green-600 text-xs">✓</span>
                                        </div>
                                        <span className="text-sm text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={handlePrimaryAction}
                                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
                            >
                                {content.primaryAction}
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-3 px-4 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                {content.secondaryAction}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubscriptionModal;
