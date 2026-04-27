import React, { useState, useEffect } from "react";
import {
    useGetAllSubscriptionPlansQuery,
    useAdminPurchaseSubscriptionMutation
} from "../../../context/createProfile";
import { toast } from "react-toastify";
import PlanCard from "./PlanCard";
import { CheckCircle } from "lucide-react";

const SubscriptionSelection = ({ userId, onSuccess, onSkip }) => {
    const { data: plansResponse, isLoading: isLoadingPlans } = useGetAllSubscriptionPlansQuery();
    const [purchaseSubscription, { isLoading: isSubmitting }] = useAdminPurchaseSubscriptionMutation();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [billingPeriod, setBillingPeriod] = useState("MONTHLY");

    // Payment Form State
    const [paymentMode, setPaymentMode] = useState("CASH");
    const [amountPaid, setAmountPaid] = useState("");
    const [externalReferenceNumber, setExternalReferenceNumber] = useState("");
    const [paymentNotes, setPaymentNotes] = useState("");
    const [autoRenewal, setAutoRenewal] = useState(false);

    // Filter active plans
    const plans = plansResponse?.data || [];
    const activePlans = plans.filter(p => p.status === 'ACTIVE');

    // Update amount when plan or period changes
    useEffect(() => {
        if (selectedPlan) {
            const priceObj = billingPeriod === "MONTHLY" ? selectedPlan.monthly : selectedPlan.yearly;
            const finalPrice = priceObj?.discountedPrice || priceObj?.price || 0;
            setAmountPaid(finalPrice);
        } else {
            setAmountPaid("");
        }
    }, [selectedPlan, billingPeriod]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !selectedPlan) {
            toast.error("Please select a user and a plan");
            return;
        }

        try {
            const payload = {
                userId: parseInt(userId),
                subscriptionPlanId: selectedPlan.subscriptionId,
                billingPeriod,
                amountPaid: parseFloat(amountPaid),
                paymentMode,
                paymentNotes,
                externalReferenceNumber,
                autoRenewal,
                adminRemarks: "Assigned via Admin Panel"
            };

            const result = await purchaseSubscription(payload).unwrap();
            if (result.success) {
                toast.success("Subscription assigned successfully!");
                if (onSuccess) onSuccess(result.data);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to assign subscription");
        }
    };

    if (isLoadingPlans) return <div className="p-8 text-center text-gray-500">Loading plans...</div>;

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8 p-4">

            {/* 1. Toggle Switch */}
            <div className="flex justify-center items-center gap-4 mb-4">
                <span className={`text-sm font-semibold cursor-pointer ${billingPeriod === 'MONTHLY' ? 'text-orange-600' : 'text-gray-500'}`} onClick={() => setBillingPeriod('MONTHLY')}>Monthly</span>
                <button
                    onClick={() => setBillingPeriod(prev => prev === 'MONTHLY' ? 'YEARLY' : 'MONTHLY')}
                    className="relative w-14 h-7 bg-gray-200 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${billingPeriod === 'YEARLY' ? 'translate-x-7' : 'translate-x-0'}`}></div>
                </button>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setBillingPeriod('YEARLY')}>
                    <span className={`text-sm font-semibold ${billingPeriod === 'YEARLY' ? 'text-orange-600' : 'text-gray-500'}`}>Yearly</span>
                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">Save 20%</span>
                </div>
            </div>

            {/* 2. Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {activePlans.map((plan) => (
                    <div key={plan.subscriptionId} className="h-full">
                        <PlanCard
                            plan={plan}
                            billingCycle={billingPeriod}
                            isSelected={selectedPlan?.subscriptionId === plan.subscriptionId}
                            onSelect={setSelectedPlan}
                        />
                    </div>
                ))}
            </div>

            {/* 3. Payment Form (Only visible when plan selected) */}
            {selectedPlan && (
                <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4 flex items-center justify-between">
                        <span>Confirm Payment Details</span>
                        <span className="text-sm font-normal text-gray-500">
                            Selected: <span className="font-bold text-orange-600">{selectedPlan.name} ({billingPeriod})</span>
                        </span>
                    </h3>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Form Fields - Reusing similar fields as before but styled better */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Payment Mode</label>
                            <select
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            >
                                <option value="CASH">Cash</option>
                                <option value="UPI">UPI</option>
                                <option value="CHEQUE">Cheque</option>
                                <option value="BANK_TRANSFER">Bank Transfer</option>
                                <option value="CARD">Credit/Debit Card</option>
                                <option value="OFFLINE">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Amount Received (₹)</label>
                            <input
                                type="number"
                                value={amountPaid}
                                onChange={(e) => setAmountPaid(e.target.value)}
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-mono font-bold text-gray-800"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Reference / Txn ID</label>
                            <input
                                type="text"
                                value={externalReferenceNumber}
                                onChange={(e) => setExternalReferenceNumber(e.target.value)}
                                placeholder="Ref No."
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Notes (Optional)</label>
                            <input
                                type="text"
                                value={paymentNotes}
                                onChange={(e) => setPaymentNotes(e.target.value)}
                                placeholder="e.g. Paid at reception"
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center pt-8">
                            <label className="flex items-center gap-3 cursor-pointer select-none group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${autoRenewal ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-400 bg-white'}`}>
                                    {autoRenewal && <CheckCircle size={14} />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={autoRenewal}
                                    onChange={(e) => setAutoRenewal(e.target.checked)}
                                />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">Enable Auto Renewal</span>
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-3 flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
                            {onSkip && (
                                <button type="button" onClick={onSkip} className="px-6 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                                    Skip for now
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Processing..." : "Confirm Subscription"}
                            </button>
                        </div>

                    </form>
                </div>
            )}
        </div>
    );
};

export default SubscriptionSelection;
