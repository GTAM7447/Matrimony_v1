import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Save, CheckSquare, Settings, CreditCard, Star, Shield } from "lucide-react";
import { useGetAllSubscriptionPlansQuery, useDeleteSubscriptionPlanMutation, useCreateSubscriptionPlanMutation, useUpdateSubscriptionPlanMutation } from "../../../context/createProfile";
import { toast } from "react-toastify";

const ManagePlans = () => {
    const { data: plansResponse, isLoading, refetch } = useGetAllSubscriptionPlansQuery();
    const [createPlan, { isLoading: isCreating }] = useCreateSubscriptionPlanMutation();
    const [updatePlan, { isLoading: isUpdating }] = useUpdateSubscriptionPlanMutation();
    const [deletePlan] = useDeleteSubscriptionPlanMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);

    // Initial state with all fields from requirements
    const initialFormState = {
        name: "",
        description: "",
        planCode: "",
        monthlyPrice: "",
        yearlyPrice: "",
        discountPercentage: 0,
        totalCredits: 0,
        dailyCreditLimit: 0,
        monthlyCreditLimit: 0,
        durationMonths: 1,
        validityDays: 30,
        maxProfileViews: 0,
        maxContactReveals: 0,
        maxInterestsPerMonth: 0,
        unlimitedProfileViews: false,
        unlimitedContactReveals: false,
        prioritySupport: false,
        videoCalling: false,
        advancedSearch: false,
        profileHighlighting: false,
        matchmakerAssistance: false,
        horoscopeMatching: false,
        verifiedBadge: false,
        privacyControls: false,
        chatMessaging: false,
        photoGallery: false,
        backgroundVerification: false,
        exclusiveProfiles: false,
        vipConcierge: false,
        professionalPhotography: false,
        isPopular: false,
        isRecommended: false,
        displayOrder: 0
    };

    const [formData, setFormData] = useState(initialFormState);

    const plans = plansResponse?.data || [];
    const activePlans = plans.filter(p => p.status !== 'INACTIVE');

    const handleEdit = (plan) => {
        setEditingPlan(plan);
        // Map plan data to form data, handling potential missing fields safely
        setFormData({
            ...initialFormState,
            ...plan,
            // Ensure numbers are not null
            monthlyPrice: plan.monthlyPrice || plan.monthly?.price || 0,
            yearlyPrice: plan.yearlyPrice || plan.yearly?.price || 0,
        });
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingPlan(null);
        setFormData(initialFormState);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this plan?")) {
            try {
                await deletePlan(id).unwrap();
                toast.success("Plan deleted successfully");
                refetch();
            } catch (err) {
                toast.error("Failed to delete plan");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare payload with correct types
        const payload = {
            ...formData,
            monthlyPrice: parseFloat(formData.monthlyPrice),
            yearlyPrice: parseFloat(formData.yearlyPrice),
            discountPercentage: parseFloat(formData.discountPercentage),
            totalCredits: parseInt(formData.totalCredits),
            dailyCreditLimit: parseInt(formData.dailyCreditLimit),
            monthlyCreditLimit: parseInt(formData.monthlyCreditLimit),
            durationMonths: parseInt(formData.durationMonths),
            validityDays: parseInt(formData.validityDays),
            maxProfileViews: parseInt(formData.maxProfileViews),
            maxContactReveals: parseInt(formData.maxContactReveals),
            maxInterestsPerMonth: parseInt(formData.maxInterestsPerMonth),
            displayOrder: parseInt(formData.displayOrder),
        };

        try {
            if (editingPlan) {
                await updatePlan({ id: editingPlan.subscriptionId || editingPlan.id, ...payload }).unwrap();
                toast.success("Plan updated successfully");
            } else {
                await createPlan(payload).unwrap();
                toast.success("Plan created successfully");
            }
            setIsFormOpen(false);
            refetch();
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to save plan");
        }
    };

    // RENDER TABLE ROWS
    const PlanRow = ({ plan }) => (
        <tr className="hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors">
            <td className="px-6 py-4">
                <div className="font-semibold text-gray-800">{plan.name}</div>
                <div className="text-xs text-gray-500">{plan.planCode}</div>
            </td>
            <td className="px-6 py-4 text-gray-600">
                ₹{plan.monthlyPrice || plan.monthly?.price || 0}
            </td>
            <td className="px-6 py-4 text-gray-600">
                ₹{plan.yearlyPrice || plan.yearly?.price || 0}
            </td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    {plan.isPopular && <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">Popular</span>}
                    {plan.isRecommended && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">Recommended</span>}
                </div>
            </td>
            <td className="px-6 py-4 text-right space-x-2">
                <button onClick={() => handleEdit(plan)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                    <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(plan.subscriptionId || plan.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                    <Trash2 size={16} />
                </button>
            </td>
        </tr>
    );

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading plans...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">

            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Subscription Plans</h3>
                    <p className="text-sm text-gray-500">Manage all available subscription packages</p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <Plus size={18} />
                        <span>Add New Plan</span>
                    </button>
                )}
            </div>

            {/* Form Overlay / Inline */}
            {isFormOpen ? (
                <div className="p-8 bg-white animate-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-center mb-8 border-b pb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                {editingPlan ? <Edit2 size={20} /> : <Plus size={20} />}
                            </div>
                            <h4 className="text-xl font-bold text-gray-800">
                                {editingPlan ? "Edit Subscription Plan" : "Create New Plan"}
                            </h4>
                        </div>
                        <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-400 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Section 1: Basic Details */}
                        <div>
                            <h5 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                                <Settings size={16} /> Plan Details
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Plan Name <span className="text-red-500">*</span></label>
                                    <input className="input-field w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Premium Gold" required />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Plan Code <span className="text-red-500">*</span></label>
                                    <input className="input-field w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        name="planCode" value={formData.planCode} onChange={handleChange} placeholder="e.g. PREMIUM_GOLD" required />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="label-text block mb-1 font-medium text-gray-700">Description</label>
                                    <textarea className="input-field w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        name="description" value={formData.description} onChange={handleChange} rows="2" placeholder="Brief description of the plan..." />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Display Order</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg outline-none"
                                        name="displayOrder" value={formData.displayOrder} onChange={handleChange} />
                                </div>
                                <div className="flex gap-6 items-end pb-3">
                                    <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
                                        <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="accent-orange-500 w-4 h-4" />
                                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                                            <Star size={14} className="text-orange-500" /> Mark as Popular
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                                        <input type="checkbox" name="isRecommended" checked={formData.isRecommended} onChange={handleChange} className="accent-purple-500 w-4 h-4" />
                                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                                            <CheckSquare size={14} className="text-purple-500" /> Mark as Recommended
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Pricing */}
                        <div>
                            <h5 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                                <CreditCard size={16} /> Pricing Configuration
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Monthly Price (₹)</label>
                                    <input type="number" step="0.01" className="w-full border border-gray-300 p-2.5 rounded-lg font-mono"
                                        name="monthlyPrice" value={formData.monthlyPrice} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Yearly Price (₹)</label>
                                    <input type="number" step="0.01" className="w-full border border-gray-300 p-2.5 rounded-lg font-mono"
                                        name="yearlyPrice" value={formData.yearlyPrice} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Discount % (Display)</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg font-mono"
                                        name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Duration (Months)</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg"
                                        name="durationMonths" value={formData.durationMonths} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Validity (Days)</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg"
                                        name="validityDays" value={formData.validityDays} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Usage Limits */}
                        <div>
                            <h5 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                                <Shield size={16} /> Usage Limits & Credits
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Total Credits</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg"
                                        name="totalCredits" value={formData.totalCredits} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Daily Credit Limit</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg"
                                        name="dailyCreditLimit" value={formData.dailyCreditLimit} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Monthly Credit Limit</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg"
                                        name="monthlyCreditLimit" value={formData.monthlyCreditLimit} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Max Profile Views</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg"
                                        name="maxProfileViews" value={formData.maxProfileViews} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Max Contact Reveals</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg"
                                        name="maxContactReveals" value={formData.maxContactReveals} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="label-text block mb-1 font-medium text-gray-700">Max Interests/Month</label>
                                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg"
                                        name="maxInterestsPerMonth" value={formData.maxInterestsPerMonth} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Features Toggle */}
                        <div>
                            <h5 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                                Features & Access Control
                            </h5>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
                                {[
                                    { key: 'unlimitedProfileViews', label: 'Unlimited Profile Views' },
                                    { key: 'unlimitedContactReveals', label: 'Unlimited Contact Reveals' },
                                    { key: 'prioritySupport', label: 'Priority Support' },
                                    { key: 'videoCalling', label: 'Video Calling Access' },
                                    { key: 'advancedSearch', label: 'Advanced Search Filters' },
                                    { key: 'profileHighlighting', label: 'Profile Highlighting' },
                                    { key: 'matchmakerAssistance', label: 'Matchmaker Assistance' },
                                    { key: 'horoscopeMatching', label: 'Horoscope Matching' },
                                    { key: 'verifiedBadge', label: 'Verified Badge' },
                                    { key: 'privacyControls', label: 'Enhanced Privacy Controls' },
                                    { key: 'chatMessaging', label: 'Chat / Instant Messaging' },
                                    { key: 'photoGallery', label: 'Full Photo Gallery Access' },
                                    { key: 'backgroundVerification', label: 'Background Verification' },
                                    { key: 'exclusiveProfiles', label: 'Access Exclusive Profiles' },
                                    { key: 'vipConcierge', label: 'VIP Concierge Service' },
                                    { key: 'professionalPhotography', label: 'Professional Photography' },
                                ].map(toggle => (
                                    <label key={toggle.key} className="flex items-center gap-3 cursor-pointer group hover:bg-white p-2 rounded-lg transition-colors">
                                        <div className="relative">
                                            <input type="checkbox" name={toggle.key} checked={formData[toggle.key]} onChange={handleChange} className="peer sr-only" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors">{toggle.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6 mt-8 border-t">
                            <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 border rounded-lg hover:bg-gray-50 font-medium transition-colors">Cancel</button>
                            <button type="submit" disabled={isCreating || isUpdating} className="px-8 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 font-bold shadow-lg shadow-purple-200 transition-all hover:-translate-y-0.5">
                                <Save size={18} />
                                {isCreating || isUpdating ? "Saving Plan..." : "Save Plan Configuration"}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Plan Name</th>
                                <th className="px-6 py-4 font-medium">Monthly Price</th>
                                <th className="px-6 py-4 font-medium">Yearly Price</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {plans.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        No subscription plans found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {activePlans.map(plan => <PlanRow key={plan.subscriptionId} plan={plan} />)}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManagePlans;
