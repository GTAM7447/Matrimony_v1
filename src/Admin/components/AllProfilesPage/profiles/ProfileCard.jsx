import React from "react";
import { Link } from "react-router-dom";
import defaultProfileImg from "../../../../assets/DefaultImage/AvtarImg.avif";

const ProfileCard = ({ profile }) => {
  const profileImage = profile.image || defaultProfileImg;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 text-center relative hover:shadow-md transition">
      <span className="absolute top-3 right-3 text-purple-500 text-sm cursor-pointer">
        ✎
      </span>

      <img
        src={profileImage}
        alt={profile.name}
        className="w-24 h-24 rounded-full mx-auto object-cover mb-3"
        onError={(e) => (e.currentTarget.src = defaultProfileImg)}
      />

      <h3 className="font-semibold text-gray-800">
        {profile.name}
      </h3>

      <p className="text-sm text-gray-500">
        {profile.age}, {profile.city}
      </p>

      <Link
        to={`/admin/edit-profile/${profile.id}`}
        className="mt-3 w-full bg-[#991CDD] text-white py-1.5 rounded-lg text-sm block text-center"
      >
        View Profile
      </Link>
    </div>
  );
};

export default ProfileCard;
