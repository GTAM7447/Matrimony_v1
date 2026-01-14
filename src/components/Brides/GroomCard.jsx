// import React, { useMemo, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import { useAddToFavoriteMutation } from "../../context/profileApi";
// import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";

// const GroomCard = ({ profile }) => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();

//   if (!profile) return null;

//   const {
//     userProfileId,
//     firstName,
//     age,
//     gender,
//     religion,
//     caste,
//     height,
//     currentCity,
//     maritalStatus,
//     hasProfilePhoto,
//     profilePhotoBase64,
//     profilePhotoContentType,
//     isFavorited,
//   } = profile;

//   /* IMAGE (SAFE + MEMOIZED) */
//   const profileImageSrc = useMemo(() => {
//     if (hasProfilePhoto && profilePhotoBase64 && profilePhotoContentType) {
//       return `data:${profilePhotoContentType};base64,${profilePhotoBase64}`;
//     }
//     return defaultProfileImg;
//   }, [hasProfilePhoto, profilePhotoBase64, profilePhotoContentType]);

//   /* FAVORITE HANDLER (MEMOIZED) */
//   const handleFavorite = useCallback(async () => {
//     if (!isLoggedIn) {
//       navigate("/signin");
//       return;
//     }
//     await addToFavorite(userProfileId);
//   }, [isLoggedIn, navigate, addToFavorite, userProfileId]);

//   return (
//     <div className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
//       {/* IMAGE */}
//       <img
//         src={profileImageSrc}
//         alt="profile"
//         className="w-40 h-48 object-cover"
//         loading="lazy"
//         onError={(e) => (e.currentTarget.src = defaultProfileImg)}
//       />

//       {/* DETAILS */}
//       <div className="p-4 flex-1">
//         <div className="flex justify-between items-center">
//           <h3 className="font-semibold text-gray-800">
//             {firstName || "Profile"}
//           </h3>

//           {isLoggedIn && (
//             <button
//               onClick={handleFavorite}
//               disabled={isFavorited || isLoading}
//               className={`p-2 rounded-full transition
//                 ${
//                   isFavorited
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-red-500 hover:bg-red-600 text-white"
//                 }`}
//               title={isFavorited ? "Added to Favorites" : "Add to Favorites"}
//             >
//               <Heart size={16} fill={isFavorited ? "gray" : "white"} />
//             </button>
//           )}
//         </div>

//         <ul className="mt-2 text-sm text-gray-700 space-y-0.5">
//           {age && <li>Age: {age}</li>}
//           {gender && <li>Gender: {gender}</li>}
//           {religion && <li>Religion: {religion}</li>}
//           {caste && <li>Caste: {caste}</li>}
//           {currentCity && <li>City: {currentCity}</li>}
//           {maritalStatus && <li>Status: {maritalStatus}</li>}
//         </ul>

//         <button
//           onClick={() =>
//             navigate("/OthersEmptyBiodataPage", {
//               state: { userProfileId },
//             })
//           }
//           className="mt-3 bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600"
//         >
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// /* --------------------------------------------------
//    REACT.MEMO WITH CUSTOM COMPARISON
// -------------------------------------------------- */
// export default React.memo(GroomCard, (prevProps, nextProps) => {
//   return (
//     prevProps.profile.userProfileId ===
//       nextProps.profile.userProfileId &&
//     prevProps.profile.isFavorited ===
//       nextProps.profile.isFavorited
//   );
// });















import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAddToFavoriteMutation } from "../../context/profileApi";
import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";

const GroomCard = ({ profile }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();

  if (!profile) return null;

  const {
    userProfileId,
    completeProfileId,
    firstName,
    age,
    gender,
    religion,
    caste,
    currentCity,
    maritalStatus,
    hasProfilePhoto,
    profilePhotoBase64,
    profilePhotoContentType,
    isFavorited,
  } = profile;

  /* IMAGE */
  const profileImageSrc = useMemo(() => {
    if (hasProfilePhoto && profilePhotoBase64 && profilePhotoContentType) {
      return `data:${profilePhotoContentType};base64,${profilePhotoBase64}`;
    }
    return defaultProfileImg;
  }, [hasProfilePhoto, profilePhotoBase64, profilePhotoContentType]);

  /* FAVORITE HANDLER */
  const handleFavorite = useCallback(async () => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    await addToFavorite(userProfileId);
  }, [isLoggedIn, navigate, addToFavorite, userProfileId]);

  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden">
      {/* IMAGE */}
      <img
        src={profileImageSrc}
        alt="profile"
        className="w-40 h-48 object-cover"
        loading="lazy"
        onError={(e) => (e.currentTarget.src = defaultProfileImg)}
      />

      {/* DETAILS */}
      <div className="p-4 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">
            {firstName || "Profile"}
          </h3>

          {isLoggedIn && (
            <div className="flex items-center gap-2">
              {/* PROFILE ID BADGE */}
              <span className="text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md">
                ID: {userProfileId}
              </span>

              {/* FAVORITE BUTTON */}
              <button
                onClick={handleFavorite}
                disabled={isFavorited || isLoading}
                className={`p-2 rounded-full transition ${
                  isFavorited
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                title={isFavorited ? "Added to Favorites" : "Add to Favorites"}
              >
                <Heart size={16} fill={isFavorited ? "gray" : "white"} />
              </button>
            </div>
          )}
        </div>

        {/* INFO */}
        <ul className="mt-2 text-sm space-y-0.5 text-gray-700">
          {age && <li>Age: {age}</li>}
          {gender && <li>Gender: {gender}</li>}
          {religion && <li>Religion: {religion}</li>}
          {caste && <li>Caste: {caste}</li>}
          {currentCity && <li>City: {currentCity}</li>}
          {maritalStatus && <li>Status: {maritalStatus}</li>}
        </ul>

        {/* VIEW PROFILE */}
        <button
          onClick={() => navigate(`/profile/${completeProfileId}`)}
          className="mt-3 bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default React.memo(GroomCard);