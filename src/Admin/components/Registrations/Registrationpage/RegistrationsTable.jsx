// import React, { useState, useMemo } from "react";
// import { FiEye, FiCheckCircle, FiCalendar, FiEdit2 } from "react-icons/fi";
// import { HiUserGroup } from "react-icons/hi";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { useAdminProfiles } from "../../../context/hooks/useProfileData";

// export default function RegistrationsTable() {
//   const [currentPage, setCurrentPage] = useState(0);

//   const {
//     data,
//     isLoading,
//     error,
//     page,
//     setPage,
//     openMenu,
//     setOpenMenu,
//     totalProfiles,
//     verifiedProfiles,
//     bridesCount,
//     groomsCount,
//     activeProfiles,
//     handleViewProfile,
//     handleEditProfile,
//     closeProfileView,
//     closeProfileEdit,
//     saveProfileEdit,
//     selectedProfile,
//     profileToEdit,
//     refetch,
//   } = useAdminProfiles();


//   // Filter only active profiles
//   // Filter ONLY page data (backend paginated)
//   const activeProfilesData = useMemo(() => {
//     return data?.filter((item) => item.status === "Active") || [];
//   }, [data]);


//   // Calculate total pages for active profiles only
//   // Total active count across ALL pages (from RTK summary)
//   const totalActiveCount = activeProfiles;

//   // Pages visible for active on frontend UI
//   const totalPages = Math.ceil(totalActiveCount / 20);


//   const handlePreviousPage = () => {
//     if (page > 0) setPage(page - 1);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages - 1) setPage(page + 1);
//   };

//   const handlePageClick = (pageNumber) => {
//     setPage(pageNumber);
//   };

//   const formatDate = () => new Date().toISOString().split("T")[0];

//   if (isLoading) {
//     return (
//       <div className="bg-white rounded-xl overflow-hidden">
//         <div className="px-5 py-8 text-center">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
//           <p className="mt-2 text-gray-600">Loading active profiles...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-xl overflow-hidden">
//         <div className="px-5 py-8 text-center text-red-600">
//           <p>Error loading profiles: {error.message || "Unknown error"}</p>
//           <button
//             onClick={refetch}
//             className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }


//   return (
//     <div className="bg-white rounded-xl overflow-hidden">
//       {/* Top bar */}
//       <div className="px-5 py-4 flex justify-between items-center border-b border-gray-200">
//         <div className="flex items-center gap-6 text-sm">
//           <span className="font-medium text-gray-800 border-b-2 border-purple-600 pb-1">
//             Active Profiles ({activeProfiles})
//           </span>

//           <span className="flex items-center gap-2 text-green-600">
//             <FiCheckCircle />
//             {verifiedProfiles} Verified
//           </span>

//           <span className="flex items-center gap-2 text-purple-600">
//             <HiUserGroup />
//             {bridesCount} Brides
//           </span>

//           <span className="flex items-center gap-2 text-orange-500">
//             <HiUserGroup />
//             {groomsCount} Grooms
//           </span>

//           <span className="flex items-center gap-2 text-blue-600">
//             <HiUserGroup />
//             {activeProfiles} Active
//           </span>
//         </div>

//         <div className="flex gap-2 items-center">
//           <select className="border rounded-md px-3 py-1.5 text-sm bg-white">
//             <option>Today</option>
//             <option>This Week</option>
//             <option>This Month</option>
//           </select>

//           <div className="relative">
//             <input
//               type="date"
//               className="border rounded-md px-3 py-1.5 pr-9 text-sm bg-white"
//               defaultValue={formatDate()}
//             />
//             <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-[#F6F7FB] text-gray-600">
//             <tr>
//               <th className="px-4 py-3 text-left font-medium">Profile ID</th>
//               <th className="px-4 py-3 text-left font-medium">Name</th>
//               <th className="px-4 py-3 text-left font-medium">Gender</th>
//               <th className="px-4 py-3 text-left font-medium">Age</th>
//               <th className="px-4 py-3 text-left font-medium">City</th>
//               <th className="px-4 py-3 text-left font-medium">Religion</th>
//               <th className="px-4 py-3 text-left font-medium">Caste</th>
//               <th className="px-4 py-3 text-left font-medium">Profession</th>
//               <th className="px-4 py-3 text-left font-medium">Membership</th>
//               <th className="px-4 py-3 text-left font-medium">Verification</th>
//               <th className="px-4 py-3 text-left font-medium">Status</th>
//               <th className="px-4 py-3 text-left font-medium">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {activeProfilesData && activeProfilesData.length > 0 ? (
//               activeProfilesData.map((row, activeIndex) => {
//                 // Get original index to access statusMap correctly

//                 return (
//                   <tr
//                     key={row.userId || activeIndex}
//                     className="border-t border-gray-100 hover:bg-gray-50"
//                   >
//                     <td className="px-4 py-3">{row.profileId || `USER${row.userId?.slice(0, 8) || activeIndex}`}</td>
//                     <td className="px-4 py-3">{row.name}</td>
//                     <td className="px-4 py-3">{row.gender}</td>
//                     <td className="px-4 py-3">{row.age}</td>
//                     <td className="px-4 py-3">{row.city}</td>
//                     <td className="px-4 py-3">{row.religion}</td>
//                     <td className="px-4 py-3">{row.caste}</td>
//                     <td className="px-4 py-3">{row.profession}</td>

//                     <td className="px-4 py-3 text-purple-600 font-medium">
//                       {row.membership}
//                     </td>

//                     <td className="px-4 py-3">
//                       <span className={`px-3 py-1 text-xs rounded-full ${row.verification === "Verified"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-yellow-100 text-yellow-600"
//                         }`}>
//                         {row.verification}
//                       </span>
//                     </td>

//                     <td className="px-4 py-3">
//                       <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
//                         Active
//                       </span>
//                     </td>


//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleViewProfile(row.userId)}
//                           className="p-2 rounded-full bg-[#EEF2FF] text-blue-600 hover:bg-blue-100 transition-colors"
//                           title="View Profile"
//                         >
//                           <FiEye size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleEditProfile(row.userId)}
//                           className="p-2 rounded-full bg-[#F0FFF4] text-green-600 hover:bg-green-100 transition-colors"
//                           title="Edit Profile"
//                         >
//                           <FiEdit2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="12" className="px-4 py-8 text-center text-gray-500">
//                   No active profiles found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center py-4 border-t border-gray-200 px-5">
//         <div className="text-sm text-gray-600">
//           Showing {activeProfilesData?.length || 0} of {activeProfiles} active profiles
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={handlePreviousPage}
//             disabled={page === 0}
//             className={`p-2 rounded hover:bg-gray-100 ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             <MdKeyboardArrowLeft size={18} />
//           </button>

//           {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
//             const pageNumber = i;
//             const isActive = pageNumber === page;

//             return (
//               <button
//                 key={pageNumber}
//                 onClick={() => handlePageClick(pageNumber)}
//                 className={`w-7 h-7 rounded text-sm flex items-center justify-center transition-colors
//                   ${isActive
//                     ? "bg-gray-800 text-white"
//                     : "border border-gray-300 text-gray-700 hover:bg-gray-100"
//                   }`}
//               >
//                 {pageNumber + 1}
//               </button>
//             );
//           })}

//           <button
//             onClick={handleNextPage}
//             disabled={page >= totalPages - 1}
//             className={`p-2 rounded hover:bg-gray-100 ${page >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             <MdKeyboardArrowRight size={18} />
//           </button>
//         </div>
//       </div>

//       {/* View Profile Modal */}
//       {selectedProfile && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-gray-800">Profile Details</h3>
//                 <button
//                   onClick={closeProfileView}
//                   className="text-gray-400 hover:text-gray-600 text-2xl"
//                 >
//                   &times;
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h4>
//                   <div className="space-y-3">
//                     <div>
//                       <label className="text-sm text-gray-500">Name</label>
//                       <p className="font-medium">{selectedProfile.name}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">Email</label>
//                       <p className="font-medium">{selectedProfile.email}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">Phone</label>
//                       <p className="font-medium">{selectedProfile.mobileNumber}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">Gender</label>
//                       <p className="font-medium">{selectedProfile.gender}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">Age</label>
//                       <p className="font-medium">{selectedProfile.age}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="text-lg font-medium text-gray-700 mb-4">Additional Details</h4>
//                   <div className="space-y-3">
//                     <div>
//                       <label className="text-sm text-gray-500">City</label>
//                       <p className="font-medium">{selectedProfile.city}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">Religion</label>
//                       <p className="font-medium">{selectedProfile.religion}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">Caste</label>
//                       <p className="font-medium">{selectedProfile.caste}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">Profession</label>
//                       <p className="font-medium">{selectedProfile.profession}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">Status</label>
//                       <span className={`px-2 py-1 text-xs rounded-full ${selectedProfile.isActive
//                           ? "bg-green-100 text-green-600"
//                           : "bg-red-100 text-red-600"
//                         }`}>
//                         {selectedProfile.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={closeProfileView}
//                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Profile Modal */}
//       {profileToEdit && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>
//                 <button
//                   onClick={closeProfileEdit}
//                   className="text-gray-400 hover:text-gray-600 text-2xl"
//                 >
//                   &times;
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <input
//                     type="email"
//                     defaultValue={profileToEdit.email}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                   <input
//                     type="tel"
//                     defaultValue={profileToEdit.mobileNumber}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
//                   <input
//                     type="number"
//                     defaultValue={profileToEdit.age}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                   <input
//                     type="text"
//                     defaultValue={profileToEdit.city}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
//                   <input
//                     type="text"
//                     defaultValue={profileToEdit.profession}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>
//               </div>

//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={closeProfileEdit}
//                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => {
//                       // Implement save logic here
//                       alert('Save functionality to be implemented');
//                       closeProfileEdit();
//                     }}
//                     className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





























import React, { useState, useMemo } from "react";
import { FiEye, FiCheckCircle, FiCalendar } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { useAdminProfiles } from "../../../context/hooks/useProfileData";
import { useNavigate } from "react-router-dom";


export default function RegistrationsTable() {
  const {
    data,
    isLoading,
    error,
    page,
    setPage,
    statusMap,
    totalProfiles,
    verifiedProfiles,
    bridesCount,
    groomsCount,
    activeProfiles,
    refetch,
  } = useAdminProfiles();

  const navigate = useNavigate();

  // Get active profiles from current page ONLY
  const activeProfilesData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter((_, index) => statusMap[index] === true);
  }, [data, statusMap, page]);

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      totalActive: activeProfiles,
      verified: verifiedProfiles,
      brides: bridesCount,
      grooms: groomsCount
    };
  }, [activeProfiles, verifiedProfiles, bridesCount, groomsCount]);

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

  // Handle page navigation
  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if ((page + 1) * 20 < totalProfiles) {
      setPage(page + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const formatDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="px-5 py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="mt-2 text-gray-600">Loading active profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="px-5 py-8 text-center text-red-600">
          <p>Error loading profiles: {error.message || "Unknown error"}</p>
          <button
            onClick={refetch}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {/* Top bar */}
      <div className="px-5 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-6 text-sm">
          <span className="font-medium text-gray-800 border-b-2 border-purple-600 pb-1">
            Active Profiles ({stats.totalActive})
          </span>

          <span className="flex items-center gap-2 text-green-600">
            <FiCheckCircle />
            {stats.verified} Verified
          </span>

          <span className="flex items-center gap-2 text-purple-600">
            <HiUserGroup />
            {stats.brides} Brides
          </span>

          <span className="flex items-center gap-2 text-orange-500">
            <HiUserGroup />
            {stats.grooms} Grooms
          </span>

          <span className="text-xs text-gray-500">
            Page {page + 1} • Showing {activeProfilesData.length} active on this page
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <select className="border rounded-md px-3 py-1.5 text-sm bg-white">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>

          <div className="relative">
            <input
              type="date"
              className="border rounded-md px-3 py-1.5 pr-9 text-sm bg-white"
              defaultValue={formatDate()}
            />
            <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F6F7FB] text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Sr No.</th>
              <th className="px-4 py-3 text-left font-medium">Profile ID</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Gender</th>
              <th className="px-4 py-3 text-left font-medium">Age</th>
              <th className="px-4 py-3 text-left font-medium">City</th>
              <th className="px-4 py-3 text-left font-medium">Religion</th>
              <th className="px-4 py-3 text-left font-medium">Caste</th>
              <th className="px-4 py-3 text-left font-medium">Profession</th>
              <th className="px-4 py-3 text-left font-medium">Membership</th>
              <th className="px-4 py-3 text-left font-medium">Verification</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {activeProfilesData && activeProfilesData.length > 0 ? (
              activeProfilesData.map((row, index) => (
                <tr
                  key={row.userId || index}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-500">
                    {(page * 20) + index + 1}
                  </td>
                  <td className="px-4 py-3">{displayData(row.profileId)}</td>
                  <td className="px-4 py-3">{displayData(row.name)}</td>
                  <td className="px-4 py-3">{formatGender(row.gender)}</td>
                  <td className="px-4 py-3">{displayData(row.age)}</td>
                  <td className="px-4 py-3">{displayData(row.city)}</td>
                  <td className="px-4 py-3">{displayData(row.religion)}</td>
                  <td className="px-4 py-3">{displayData(row.caste)}</td>
                  <td className="px-4 py-3">{displayData(row.profession)}</td>

                  <td className="px-4 py-3">
                    <span className={`font-medium ${row.membership === "Premium" ? "text-purple-600" :
                        row.membership === "Gold" ? "text-yellow-600" :
                          "text-gray-600"
                      }`}>
                      {displayData(row.membership)}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-xs rounded-full ${row.verification === "Verified"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                      }`}>
                      {displayData(row.verification)}
                    </span>
                  </td>

                  {/* Status Column - Added after Verification */}
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-xs rounded-full ${row.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : row.status === "Inactive"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                      {displayData(row.status)}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/admin/profile/${row.userId}`)}
                      className="p-2 rounded-full bg-[#EEF2FF] text-blue-600 hover:bg-blue-100 transition-colors"
                      title="View Profile"
                    >
                      <FiEye size={16} />
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="px-4 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <p className="mb-2">No active profiles on this page</p>
                    <p className="text-sm text-gray-400">
                      Page {page + 1} has no active users. Try another page.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between py-4 px-5 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing page {page + 1} of {Math.ceil(totalProfiles / 20)}
          {activeProfilesData.length > 0 && (
            <span className="ml-2">({activeProfilesData.length} active users)</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Previous button */}
          {page > 0 && (
            <button
              onClick={handlePreviousPage}
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
                onClick={() => handlePageClick(pageNum - 1)}
                className={`w-8 h-8 rounded text-sm border ${page === pageNum - 1
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
              onClick={handleNextPage}
              className="w-8 h-8 rounded text-sm border border-gray-300 hover:bg-gray-800 hover:text-white flex items-center justify-center"
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}