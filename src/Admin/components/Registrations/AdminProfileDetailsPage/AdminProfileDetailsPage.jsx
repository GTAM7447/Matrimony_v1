// AdminProfileDetailsPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAdminProfileByUserIdQuery } from "../../../context/adminApi";

export default function AdminProfileDetailsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } =
    useGetAdminProfileByUserIdQuery(userId);

  const d = (v) => v || "--";

  if (isLoading)
    return (
      <div className="p-10 text-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 font-semibold">Error loading profile...</p>
        <button
          onClick={refetch}
          className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-xl p-8 relative mt-20">

        {/* CLOSE BTN */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 right-5 text-2xl font-light text-gray-700 hover:text-gray-900"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-center text-xl font-semibold tracking-wide">
          PROFILE DETAILS
        </h2>

        {/* TOP DIVIDER */}
        <div className="mt-3 border-t border-gray-300"></div>

        {/* FLEX GRID */}
        <div className="mt-6 flex gap-10">
          {/* LEFT SIDE */}
          <div className="flex-1">
            {/* PHOTO + NAME */}
            <div className="flex items-start gap-4">
              <img
                src={
                  data?.profilePhotoBase64
                    ? `data:${data.profilePhotoContentType};base64,${data.profilePhotoBase64}`
                    : "https://via.placeholder.com/120"
                }
                alt="Profile"
                className="w-28 h-28 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold text-xl text-gray-800 capitalize">
                  {d(data.userProfile?.firstName)} {d(data.userProfile?.lastName)}
                </h3>
                <p className="text-sm mt-1">
                  Profile ID:{" "}
                  <span className="text-purple-600 font-medium cursor-pointer">
                    {userId}
                  </span>
                </p>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="mt-6 grid grid-cols-3 gap-y-2 text-sm text-gray-900">
              <p><b>Name</b><br />{d(data.userProfile?.firstName)}</p>
              <p><b>Gender</b><br />{d(data.userProfile?.gender)}</p>
              <p><b>Profile Completion</b><br />{data.completionPercentage}%</p>

              <p><b>DOB</b><br />{d(data.horoscopeDetails?.dob)}</p>
              <p><b>Age</b><br />{d(data.userProfile?.age)}</p>
              <p><b>Religion</b><br />{d(data.userProfile?.religion)}</p>

              <p><b>Caste</b><br />{d(data.userProfile?.caste)}</p>
              <p><b>City</b><br />{d(data.userProfile?.currentCity)}</p>
              <p><b>State</b><br />{d(data.contactDetails?.state)}</p>

              <p><b>Country</b><br />{d(data.contactDetails?.country)}</p>
              <p><b>Phone</b><br />{d(data.contactDetails?.mobileNumber)}</p>
              <p><b>Email</b><br />{d(data.contactDetails?.emailAddress)}</p>

              <p><b>Marital Status</b><br />{d(data.userProfile?.maritalStatus)}</p>
              <p><b>Height</b><br />{d(data.userProfile?.height)}</p>
              <p><b>Weight</b><br />{d(data.userProfile?.weight)}</p>

              <p><b>Mother Tongue</b><br />{d(data.userProfile?.motherTongue)}</p>
            </div>

            {/* EDUCATION + WORK */}
            <div className="mt-8 border-t border-gray-300 pt-4 grid grid-cols-3 gap-y-2 text-sm">
              <p><b>Education</b><br />{d(data.educationAndProfession?.education)}</p>
              <p><b>Profession</b><br />{d(data.educationAndProfession?.occupation)}</p>
              <p><b>Company</b><br />{d(data.educationAndProfession?.companyName)}</p>

              <p><b>Annual Income</b><br />{d(data.educationAndProfession?.formattedIncome)}</p>
              <p><b>Work Location</b><br />{d(data.educationAndProfession?.workLocation)}</p>
            </div>
          </div>

          {/* MIDDLE DIVIDER */}
          <div className="w-px bg-gray-300"></div>

          {/* RIGHT SIDE */}
          <div className="flex-1 text-sm text-gray-900">
            <p><b>Father’s Occupation</b><br />{d(data.familyBackground?.fatherOccupation)}</p>
            <p className="mt-2"><b>Mother’s Occupation</b><br />{d(data.familyBackground?.motherOccupation)}</p>
            <p className="mt-2"><b>Brothers</b><br />{d(data.familyBackground?.brother)}</p>

            <p className="mt-2"><b>Family Type</b><br />{d(data.familyBackground?.familyType)}</p>
            <p className="mt-2"><b>Family Values</b><br />{d(data.familyBackground?.familyValues)}</p>

            <div className="mt-6 border-t border-gray-300 pt-4 grid grid-cols-3 gap-y-2">
              <p><b>Status</b><br />{d(data.userProfile?.status)}</p>
              <p><b>Verification</b><br />{d(data.verificationStatus)}</p>
              <p><b>Membership</b><br />{d(data.membershipType)}</p>

              <p><b>Profile Created</b><br />{String(data.createdAt).split("T")[0]}</p>
              <p><b>Last Updated</b><br />{String(data.lastUpdated).split("T")[0]}</p>
              <p><b>Profile Completion</b><br />{data.completionPercentage}%</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
