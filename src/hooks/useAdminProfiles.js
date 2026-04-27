// src/hooks/useAdminProfiles.js
// Admin profile management hook - moved from Admin/context/hooks

import { useState, useEffect } from "react";
import { useGetAllProfilesQuery } from "../Admin/context/adminApi";
import { useToggleUserActivationStatusMutation } from "../Admin/context/adminActivationApi";

export const useAdminProfiles = () => {
    const [page, setPage] = useState(0);
    const [size] = useState(20);
    const [statusMap, setStatusMap] = useState({});
    const [openMenu, setOpenMenu] = useState(null);
    const [transformedData, setTransformedData] = useState([]);
    const [loadingStatuses, setLoadingStatuses] = useState({});
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [profileToEdit, setProfileToEdit] = useState(null);

    // Get all profiles from main API
    const {
        data: apiResponse,
        isLoading,
        error,
        refetch
    } = useGetAllProfilesQuery({
        page,
        size,
    });

    // Toggle mutation hook
    const [toggleUserActivation] = useToggleUserActivationStatusMutation();

    // Transform API data when it arrives
    useEffect(() => {
        if (apiResponse?.content && Array.isArray(apiResponse.content)) {
            const transformed = apiResponse.content.map((user) => {
                const isActive = user.status === "Active";

                return {
                    userId: user.userId,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    gender: user.gender,
                    roles: user.roles,
                    role: user.role,
                    isActive: isActive,
                    name: user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user.email?.split('@')[0] || "User",
                    profileId: user.profileId,
                    age: user.age,
                    city: user.city,
                    religion: user.religion,
                    caste: user.caste,
                    profession: user.profession,
                    membership: user.membership,
                    verification: user.verification,
                    sendRequests: user.sendRequests,
                    receiveRequests: user.receiveRequests,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    status: user.status,
                };
            });

            setTransformedData(transformed);

            const initialStatus = {};
            transformed.forEach((item, index) => {
                initialStatus[index] = item.isActive === true;
            });
            setStatusMap(initialStatus);

        } else if (apiResponse && !apiResponse.content) {
            setTransformedData([]);
        }
    }, [apiResponse]);

    // Toggle status using toggle API
    const toggleStatus = async (index) => {
        const user = transformedData[index];
        if (!user?.userId) return;

        const currentStatus = statusMap[index];

        try {
            setLoadingStatuses(prev => ({ ...prev, [index]: true }));
            await toggleUserActivation(user.userId).unwrap();
            setStatusMap(prev => ({
                ...prev,
                [index]: !currentStatus
            }));
        } catch (err) {
            console.error(`Error toggling status for user ${user.userId}:`, err);
            alert(`Failed to toggle status: ${err?.data?.message || err.message}`);
            setStatusMap(prev => ({
                ...prev,
                [index]: currentStatus
            }));
        } finally {
            setLoadingStatuses(prev => ({ ...prev, [index]: false }));
        }
    };

    // Handle View Profile
    const handleViewProfile = (userId) => {
        if (userId) {
            const profile = transformedData.find(item => item.userId === userId);
            setSelectedProfile(profile);
        }
    };

    // Handle Edit Profile
    const handleEditProfile = (userId) => {
        if (userId) {
            const profile = transformedData.find(item => item.userId === userId);
            setProfileToEdit(profile);
        }
    };

    const closeProfileView = () => setSelectedProfile(null);
    const closeProfileEdit = () => setProfileToEdit(null);

    const saveProfileEdit = async (updatedData) => {
        try {
            refetch();
            setProfileToEdit(null);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Error saving profile:", err);
            alert("Failed to update profile");
        }
    };

    // Calculate statistics
    const totalProfiles = apiResponse?.totalElements || transformedData.length;
    const activeProfiles = Object.values(statusMap).filter(status => status).length;
    const verifiedProfiles = transformedData.filter(item => item.verification === "Verified").length || 0;
    const bridesCount = transformedData.filter(item =>
        item.gender && (item.gender.toLowerCase() === "female" || item.gender.toLowerCase() === "f")
    ).length || 0;
    const groomsCount = transformedData.filter(item =>
        item.gender && (item.gender.toLowerCase() === "male" || item.gender.toLowerCase() === "m")
    ).length || 0;

    return {
        data: transformedData,
        isLoading,
        error,
        page,
        setPage,
        statusMap,
        toggleStatus,
        openMenu,
        setOpenMenu,
        totalProfiles,
        verifiedProfiles,
        bridesCount,
        groomsCount,
        activeProfiles,
        handleViewProfile,
        handleEditProfile,
        closeProfileView,
        closeProfileEdit,
        saveProfileEdit,
        selectedProfile,
        profileToEdit,
        refetch,
        loadingStatuses
    };
};

export default useAdminProfiles;
