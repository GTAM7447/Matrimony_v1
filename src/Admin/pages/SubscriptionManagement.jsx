import React, { useState, useEffect } from "react";
import SubscriptionSelection from "../components/ProfileCreation/SubscriptionSelection";
import ManagePlans from "../components/Subscription/ManagePlans";
import { Search, UserCheck, Settings, CreditCard, Eye, Mail, User } from "lucide-react";
import { toast } from "react-toastify";
import { useGetAllUsersQuery } from "../../context/createProfile";

const SubscriptionManagement = () => {
    const [activeTab, setActiveTab] = useState("ASSIGN"); // ASSIGN | MANAGE
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced search for API
    const [page, setPage] = useState(0);
    const [activeUserId, setActiveUserId] = useState(null);

    // Debounce search - triggers API call 500ms after user stops typing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(0); // Reset to first page when search changes
        }, 500);

        return () => clearTimeout(timer); // Cleanup on unmount or query change
    }, [searchQuery]);

    const { data: usersResponse, isLoading: isLoadingUsers, isFetching } = useGetAllUsersQuery(
        {
            page: page,
            size: debouncedSearch ? 100 : 10,
            search: debouncedSearch
        }
    );

    const rawUsers = usersResponse?.content || [];
    const totalPages = usersResponse?.totalPages || 0;

    // Filter client-side as fallback to ensure search works even if backend ignores param
    const users = debouncedSearch
        ? rawUsers.filter(u =>
            (u.firstName && u.firstName.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
            (u.lastName && u.lastName.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
            (u.email && u.email.toLowerCase().includes(debouncedSearch.toLowerCase()))
        )
        : rawUsers;

    const handleSearch = (e) => {
        e.preventDefault();
        // Search is now automatic via debounce, but we keep this for Enter key support
    };

    const handleAssignSubscription = (userId) => {
        setActiveUserId(userId);
    };

    const handleViewProfile = (userId) => {
        // Navigate to profile view or open modal
        window.open(`/admin/profile/${userId}`, '_blank');
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto font-[Inter] min-h-screen bg-gray-50/30">
            {/* Page Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Subscription Center</h1>
                    <p className="text-gray-500 mt-1">Manage user subscriptions and configure plans.</p>
                </div>

                {/* Tab Switcher */}
                <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm inline-flex">
                    <button
                        onClick={() => setActiveTab("ASSIGN")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                        ${activeTab === "ASSIGN"
                                ? "bg-orange-50 text-orange-700 shadow-sm ring-1 ring-orange-200"
                                : "text-gray-600 hover:bg-gray-50"}`}
                    >
                        <CreditCard size={18} />
                        Assign Subscription
                    </button>
                    <button
                        onClick={() => setActiveTab("MANAGE")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                        ${activeTab === "MANAGE"
                                ? "bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-200"
                                : "text-gray-600 hover:bg-gray-50"}`}
                    >
                        <Settings size={18} />
                        Manage Plans
                    </button>
                </div>
            </div>

            {/* TAB CONTENT: ASSIGN SUBSCRIPTION */}
            {activeTab === "ASSIGN" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {!activeUserId ? (
                        // User List View
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Search Bar */}
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <form onSubmit={handleSearch} className="flex gap-4">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search by name or email..."
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>

                            {/* User Table */}
                            {isLoadingUsers || isFetching ? (
                                <div className="p-12 text-center">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                                    <p className="text-gray-500 mt-3">
                                        {isFetching ? 'Searching...' : 'Loading users...'}
                                    </p>
                                </div>
                            ) : users.length === 0 ? (
                                <div className="p-12 text-center text-gray-400">
                                    <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                    <p className="font-medium">No users found</p>
                                    <p className="text-sm">Try adjusting your search query</p>
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                                                    <th className="px-6 py-4 font-medium">User ID</th>
                                                    <th className="px-6 py-4 font-medium">Name</th>
                                                    <th className="px-6 py-4 font-medium">Email</th>
                                                    <th className="px-6 py-4 font-medium">Gender</th>
                                                    <th className="px-6 py-4 font-medium">Status</th>
                                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {users.map((user) => (
                                                    <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <span className="font-mono text-sm font-semibold text-purple-600">#{user.userId}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                                                                    {user.firstName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <div className="font-semibold text-gray-800">
                                                                        {user.firstName && user.lastName
                                                                            ? `${user.firstName} ${user.lastName}`
                                                                            : user.email?.split('@')[0]}
                                                                    </div>
                                                                    {user.profileId && (
                                                                        <div className="text-xs text-gray-500">Profile #{user.profileId}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2 text-gray-600">
                                                                <Mail size={14} className="text-gray-400" />
                                                                <span className="text-sm">{user.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.gender === 'MALE'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-pink-100 text-pink-700'
                                                                }`}>
                                                                {user.gender || 'N/A'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'Active'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-gray-100 text-gray-700'
                                                                }`}>
                                                                {user.status || 'Unknown'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right space-x-2">
                                                            <button
                                                                onClick={() => handleViewProfile(user.userId)}
                                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="View Profile"
                                                            >
                                                                <Eye size={16} />
                                                                View
                                                            </button>
                                                            <button
                                                                onClick={() => handleAssignSubscription(user.userId)}
                                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                                                title="Assign Subscription"
                                                            >
                                                                <CreditCard size={16} />
                                                                Subscription
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                                            <div className="text-sm text-gray-600">
                                                Page {page + 1} of {totalPages}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setPage(p => Math.max(0, p - 1))}
                                                    disabled={page === 0}
                                                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    Previous
                                                </button>
                                                <button
                                                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                                    disabled={page >= totalPages - 1}
                                                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ) : (
                        // Subscription Selection View
                        <div className="bg-transparent">
                            <div className="bg-white rounded-t-xl border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <UserCheck className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Assigning To</span>
                                        <span className="font-bold text-gray-900 text-lg">User #{activeUserId}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveUserId(null)}
                                    className="text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    ← Back to User List
                                </button>
                            </div>

                            <SubscriptionSelection
                                userId={activeUserId}
                                onSuccess={() => {
                                    toast.success("Subscription assigned successfully!");
                                    setActiveUserId(null);
                                }}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* TAB CONTENT: MANAGE PLANS */}
            {activeTab === "MANAGE" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ManagePlans />
                </div>
            )}
        </div>
    );
};

export default SubscriptionManagement;
