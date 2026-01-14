// src/Admin/hooks/useProfileData.js
import { useState, useEffect } from "react";
import { useGetAllProfilesQuery } from "../adminApi";
import { useToggleUserActivationStatusMutation } from "../adminActivationApi";
 
export const useAdminProfiles = () => {
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [statusMap, setStatusMap] = useState({});
  const [openMenu, setOpenMenu] = useState(null);
  const [transformedData, setTransformedData] = useState([]);
  const [loadingStatuses, setLoadingStatuses] = useState({});
 
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
      console.log("Transforming API data...");
     
      const transformed = apiResponse.content.map((user, index) => {
        return {
          // Fields from your API
          userId: user.userId,
          email: user.email,
          mobileNumber: user.mobileNumber,
          gender: user.gender,
          roles: user.roles,
          role: user.role,
          isActive: user.isActive || true, // Default to active
         
          // Generated fields
          profileId: user.profileId || `MAT${user.userId || "00000"}`,
          name: user.name || user.email?.split('@')[0] || "User",
         
          // Fields not in your API - will show "--"
          age: user.age || "--",
          city: user.city || "--",
          religion: user.religion || "--",
          caste: user.caste || "--",
          profession: user.profession || "--",
          membership: user.membership || "--",
          verification: user.verification || "--",
          sendRequests: user.sendRequests || 0,
          receiveRequests: user.receiveRequests || 0,
        };
      });
     
      setTransformedData(transformed);
     
      // Initialize status map from API data or defaults
      const initialStatus = {};
      transformed.forEach((item, index) => {
        initialStatus[index] = item.isActive === true;
      });
      setStatusMap(initialStatus);
     
    } else if (apiResponse && !apiResponse.content) {
      console.log("API returned but no content array");
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
     
      // Call the toggle API
      await toggleUserActivation(user.userId).unwrap();
     
      // Update local state with the opposite status
      setStatusMap(prev => ({
        ...prev,
        [index]: !currentStatus
      }));
     
      console.log(`User ${user.userId} status toggled successfully.`);
     
    } catch (error) {
      console.error(`Error toggling status for user ${user.userId}:`, error);
      alert(`Failed to toggle status: ${error?.data?.message || error.message}`);
     
      // Revert to previous status on error
      setStatusMap(prev => ({
        ...prev,
        [index]: currentStatus
      }));
    } finally {
      setLoadingStatuses(prev => ({ ...prev, [index]: false }));
    }
  };
 
  // Navigation
  const handleViewProfile = (userId) => {
    if (userId) {
      window.location.href = `/admin/view-profile/${userId}`;
    }
  };
 
  const handleEditProfile = (userId) => {
    if (userId) {
      window.location.href = `/admin/edit-profile/${userId}`;
    }
  };
 
  // Calculate statistics
  const totalProfiles = apiResponse?.totalElements || transformedData.length;
 
  // Count active profiles
  const activeProfiles = Object.values(statusMap).filter(status => status).length;
 
  // Count verified profiles
  const verifiedProfiles = transformedData.filter(item =>
    item.verification === "Verified"
  ).length || 0;
 
  // Count brides and grooms based on gender
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
    refetch,
    loadingStatuses
  };
};
 