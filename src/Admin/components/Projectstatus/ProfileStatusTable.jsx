import React, { useState } from "react";
import { FiMoreVertical, FiEye, FiEdit, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { useAdminProfiles } from "../../context/hooks/useProfileData";
 
const headers = [
  "",
  "Sr No.",
  "Profile ID",
  "Name",
  "Gender",
  "Age",
  "City",
  "Religion",
  "Caste",
  "Profession",
  "Membership",
  "Verification",
  "Send Request",
  "Receive Request",
  "Status",
  "Actions",
];
 
export default function ProfileStatusTable() {
  const {
    data,
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
  } = useAdminProfiles();
 
  // State for confirmation popup
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [pendingToggleIndex, setPendingToggleIndex] = useState(null);
  const [pendingUserInfo, setPendingUserInfo] = useState({ name: "", currentStatus: false });
 
  // Helper function to safely display data
  const displayData = (value) => {
    if (value === undefined || value === null || value === "") {
      return "--";
    }
    return value;
  };
 
  // Format gender display
  const formatGender = (gender) => {
    if (!gender || gender === "--") return "--";
    if (gender.toLowerCase() === "male" || gender.toLowerCase() === "m") return "Male";
    if (gender.toLowerCase() === "female" || gender.toLowerCase() === "f") return "Female";
    return gender;
  };
 
  // Handle toggle click - show confirmation popup
  const handleToggleClick = (index) => {
    const user = data[index];
    const currentStatus = statusMap[index] !== undefined ? statusMap[index] : false;
   
    setPendingToggleIndex(index);
    setPendingUserInfo({
      name: user.name || "User",
      currentStatus: currentStatus
    });
    setShowConfirmPopup(true);
  };
 
  // Confirm toggle
  const confirmToggle = () => {
    if (pendingToggleIndex !== null) {
      toggleStatus(pendingToggleIndex);
      setShowConfirmPopup(false);
      setPendingToggleIndex(null);
      setPendingUserInfo({ name: "", currentStatus: false });
    }
  };
 
  // Cancel toggle
  const cancelToggle = () => {
    setShowConfirmPopup(false);
    setPendingToggleIndex(null);
    setPendingUserInfo({ name: "", currentStatus: false });
  };
 
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl overflow-hidden p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profiles from API...</p>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="bg-white rounded-xl overflow-hidden p-8 text-center">
        <p className="text-red-600 font-medium">Error Loading Data</p>
        <p className="text-gray-500 text-sm mt-2">{error?.message || "Failed to fetch profiles"}</p>
        <button
          onClick={refetch}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Retry
        </button>
      </div>
    );
  }
 
  return (
    <>
      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiAlertTriangle className="text-yellow-600 text-2xl" />
              </div>
            </div>
           
            <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
              Confirm Status Change
            </h3>
           
            <p className="text-gray-600 text-center mb-1">
              Are you sure you want to {pendingUserInfo.currentStatus ? "deactivate" : "activate"}
            </p>
            <p className="font-medium text-center text-purple-600 mb-4">
              "{pendingUserInfo.name}"?
            </p>
           
            <div className="bg-gray-50 p-3 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Current Status:</span>
                <span className={`font-medium ${pendingUserInfo.currentStatus ? 'text-green-600' : 'text-red-600'}`}>
                  {pendingUserInfo.currentStatus ? "ACTIVE" : "DEACTIVATED"}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700">New Status:</span>
                <span className={`font-medium ${!pendingUserInfo.currentStatus ? 'text-green-600' : 'text-red-600'}`}>
                  {!pendingUserInfo.currentStatus ? "ACTIVE" : "DEACTIVATED"}
                </span>
              </div>
            </div>
           
            <div className="flex gap-3">
              <button
                onClick={cancelToggle}
                className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggle}
                className="flex-1 py-2.5 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                {pendingUserInfo.currentStatus ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}
 
      <div className="bg-white rounded-xl overflow-hidden">
        {/* TOP BAR */}
        <div className="px-5 py-4 flex flex-wrap gap-6 items-center border-b border-gray-200 text-sm">
          <span className="font-medium text-gray-800 border-b-2 border-purple-600 pb-1">
            All Profiles ({totalProfiles})
          </span>
 
          <span className="flex items-center gap-2 text-green-600">
            <FiCheckCircle />
            {activeProfiles} Active Profiles
          </span>
 
          <span className="flex items-center gap-2 text-purple-600">
            <HiUserGroup />
            {bridesCount} Brides
          </span>
 
          <span className="flex items-center gap-2 text-orange-500">
            <HiUserGroup />
            {groomsCount} Grooms
          </span>
        </div>
 
        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1500px] text-sm whitespace-nowrap">
            <thead className="bg-[#F6F7FB] text-gray-600">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
 
            <tbody>
              {data.map((row, index) => {
                const isActive = statusMap[index] !== undefined ? statusMap[index] : false;
                const isStatusLoading = loadingStatuses[index] === true;
 
                return (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" />
                    </td>
                   
                    <td className="px-4 py-3">{index + 1 + page * 20}</td>
                    <td className="px-4 py-3 font-medium">{displayData(row.profileId)}</td>
                    <td className="px-4 py-3">{displayData(row.name)}</td>
                    <td className="px-4 py-3">{formatGender(row.gender)}</td>
                    <td className="px-4 py-3">{displayData(row.age)}</td>
                    <td className="px-4 py-3">{displayData(row.city)}</td>
                    <td className="px-4 py-3">{displayData(row.religion)}</td>
                    <td className="px-4 py-3">{displayData(row.caste)}</td>
                    <td className="px-4 py-3">{displayData(row.profession)}</td>
 
                    <td className="px-4 py-3">
                      <span className={`font-medium ${
                        row.membership === "Premium" ? "text-purple-600" :
                        row.membership === "Gold" ? "text-yellow-600" :
                        "text-gray-600"
                      }`}>
                        {displayData(row.membership)}
                      </span>
                    </td>
 
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        row.verification === "Verified"
                          ? "bg-green-100 text-green-600"
                          : row.verification === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {displayData(row.verification)}
                      </span>
                    </td>
 
                    <td className="px-4 py-3 text-center text-blue-600 font-medium">
                      {displayData(row.sendRequests)}
                    </td>
 
                    <td className="px-4 py-3 text-center text-blue-600 font-medium">
                      {displayData(row.receiveRequests)}
                    </td>
 
                    {/* STATUS */}
                    <td className="px-4 py-3">
                      {isStatusLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleToggleClick(index)}
                          className="relative w-20 h-7 rounded-full flex items-center transition-all duration-300"
                          style={{
                            backgroundColor: isActive
                              ? "#3CDD1C17"
                              : "#FF000026",
                          }}
                        >
                          <span
                            className={`absolute w-5 h-5 rounded-full transition-all duration-300 ${
                              isActive ? "right-1" : "left-1"
                            }`}
                            style={{
                              backgroundColor: isActive ? "#1BA96B" : "#FF0000",
                            }}
                          />
                          <span
                            className={`w-full text-[10px] font-semibold ${
                              isActive ? "text-left pl-2" : "text-right pr-2"
                            }`}
                            style={{
                              color: isActive ? "#1BA96B" : "#FF0000",
                            }}
                          >
                            {isActive ? "Active" : "Deactivate"}
                          </span>
                        </button>
                      )}
                    </td>
 
                    {/* ACTIONS */}
                    <td className="px-4 py-3 relative">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === index ? null : index)
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <FiMoreVertical />
                      </button>
 
                      {openMenu === index && (
                        <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-md z-20">
                          <button
                            onClick={() => {
                              handleViewProfile(row.userId);
                              setOpenMenu(null);
                            }}
                            className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm"
                          >
                            <FiEye /> View
                          </button>
                          <button
                            onClick={() => {
                              handleEditProfile(row.userId);
                              setOpenMenu(null);
                            }}
                            className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm"
                          >
                            <FiEdit /> Edit
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
 
        {/* PAGINATION */}
        <div className="flex items-center justify-between py-4 px-5 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {Math.min(page * 20 + 1, totalProfiles)} to {Math.min((page + 1) * 20, totalProfiles)} of {totalProfiles} entries
          </div>
         
          <div className="flex items-center gap-2">
            {/* Previous button */}
            {page > 0 && (
              <button
                onClick={() => setPage(page - 1)}
                className="w-8 h-8 rounded text-sm border border-gray-300 hover:bg-gray-800 hover:text-white flex items-center justify-center"
              >
                ←
              </button>
            )}
           
            {/* Page numbers */}
            {Array.from({ length: Math.min(3, Math.ceil(totalProfiles / 20)) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum - 1)}
                  className={`w-8 h-8 rounded text-sm border ${
                    page === pageNum - 1
                      ? "bg-purple-600 text-white border-purple-600"
                      : "border-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
           
            {/* Next button */}
            {(page + 1) * 20 < totalProfiles && (
              <button
                onClick={() => setPage(page + 1)}
                className="w-8 h-8 rounded text-sm border border-gray-300 hover:bg-gray-800 hover:text-white flex items-center justify-center"
              >
                →
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
 