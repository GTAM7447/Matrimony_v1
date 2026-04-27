import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown, ChevronUp, User, Mail, Phone, UserCircle, CreditCard } from "lucide-react";
import SubscriptionSelection from "./SubscriptionSelection";

const SuccessModal = ({ show, onClose, userData }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [view, setView] = useState("SUCCESS"); // SUCCESS | SUBSCRIPTION

  if (!show) return null;

  // Helper function to display field value
  const displayValue = (value) => {
    if (value === null || value === undefined || value === '') return <span className="text-gray-400">-</span>;
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return value;
  };

  // Section component for organized display
  const DetailSection = ({ title, fields }) => (
    <div className="mb-4">
      <h4 className="text-sm font-bold text-purple-700 mb-2 pb-1 border-b border-purple-200">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        {fields.map(({ label, value }, idx) => (
          <div key={idx} className="flex justify-between py-1">
            <span className="text-xs font-medium text-gray-600">{label}:</span>
            <span className="text-xs font-semibold text-gray-800 text-right">{displayValue(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-[Inter] p-4 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl text-center w-[90%] sm:w-[900px] max-h-[90vh] overflow-hidden relative flex flex-col"
      >
        {/* Decorative gradient background - Changed for Subscription View */}
        <div className={`absolute top-0 left-0 right-0 h-32 rounded-t-2xl opacity-10 transition-colors duration-500
          ${view === "SUBSCRIPTION" ? "bg-gradient-to-br from-orange-400 via-orange-500 to-red-500" : "bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500"}`}
        ></div>

        {view === "SUCCESS" ? (
          <>
            {/* Fixed Header */}
            <div className="relative p-8 pb-4">
              {/* Animated Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-lg">
                    <CheckCircle className="text-white w-12 h-12" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>

              {/* Success Text */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-800 mb-2"
              >
                Registration Successful!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-sm mb-4"
              >
                User account has been created successfully
              </motion.p>

              {/* Quick Summary Card */}
              {userData && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-3 border border-purple-100"
                >
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 text-left">Quick Summary</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-medium text-gray-600">User ID</span>
                      </div>
                      <span className="text-xs font-bold text-purple-600">#{userData.userId}</span>
                    </div>

                    {userData.email && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-medium text-gray-600">Email</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-800 truncate max-w-[250px]">{userData.email}</span>
                      </div>
                    )}

                    {userData.mobileNumber && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-green-500" />
                          <span className="text-xs font-medium text-gray-600">Mobile</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-800">{userData.mobileNumber}</span>
                      </div>
                    )}

                    {userData.gender && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserCircle className="w-4 h-4 text-pink-500" />
                          <span className="text-xs font-medium text-gray-600">Gender</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-800 capitalize">{userData.gender.toLowerCase()}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* See More Details Button */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-semibold text-sm rounded-lg hover:from-purple-200 hover:to-pink-200 transition-all duration-200"
              >
                {showDetails ? 'Hide Details' : 'See All Details'}
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Scrollable Details Section */}
            <AnimatePresence>
              {showDetails && userData && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-y-auto max-h-[50vh] px-8 pb-4"
                >
                  <div className="bg-gray-50 rounded-xl p-4 text-left">

                    {/* Personal Information */}
                    <DetailSection
                      title="Personal Information"
                      fields={[
                        { label: "First Name", value: userData.firstName },
                        { label: "Middle Name", value: userData.middleName },
                        { label: "Last Name", value: userData.lastName },
                        { label: "Age", value: userData.age },
                        { label: "Status", value: userData.status },
                        { label: "Height", value: userData.heightFt && userData.heightIn ? `${userData.heightFt}'${userData.heightIn}"` : null },
                        { label: "Weight", value: userData.weight ? `${userData.weight} kg` : null },
                        { label: "Blood Group", value: userData.bloodGroup },
                        { label: "Complexion", value: userData.complexion },
                        { label: "Diet", value: userData.diet },
                        { label: "Spectacles", value: userData.spectacle },
                        { label: "Contact Lens", value: userData.lens },
                        { label: "Physically Challenged", value: userData.physicallyChallenged },
                        { label: "Marital Status", value: userData.maritalStatus },
                      ]}
                    />

                    {/* Location Details */}
                    <DetailSection
                      title="Location Details"
                      fields={[
                        { label: "Address", value: userData.address },
                        { label: "Taluka", value: userData.taluka },
                        { label: "District", value: userData.district },
                        { label: "Pin Code", value: userData.pinCode },
                        { label: "Current City", value: userData.currentCity },
                        { label: "Hometown District", value: userData.homeTownDistrict },
                        { label: "Native Taluka", value: userData.nativeTaluka },
                      ]}
                    />

                    {/* Religious Details */}
                    <DetailSection
                      title="Religious Details"
                      fields={[
                        { label: "Religion", value: userData.religion },
                        { label: "Caste", value: userData.caste },
                      ]}
                    />

                    {/* Horoscope Details */}
                    <DetailSection
                      title="Horoscope Details"
                      fields={[
                        { label: "Birth Date", value: userData.birthDate },
                        { label: "Birth Time", value: userData.birthTime },
                        { label: "Birth Place", value: userData.birthPlace },
                        { label: "Rashi", value: userData.rashi },
                        { label: "Nakshatra", value: userData.nakshatra },
                        { label: "Charan", value: userData.charan },
                        { label: "Nadi", value: userData.nadi },
                        { label: "Gan", value: userData.gan },
                        { label: "Mangal", value: userData.mangal },
                        { label: "Gotra", value: userData.gotra },
                      ]}
                    />

                    {/* Education & Career */}
                    <DetailSection
                      title="Education & Career"
                      fields={[
                        { label: "Education Level", value: userData.educationLevel },
                        { label: "Degree/Specialization", value: userData.degree },
                        { label: "Occupation", value: userData.occupation },
                        { label: "Annual Income", value: userData.annualIncome ? `₹${userData.annualIncome}` : null },
                      ]}
                    />

                    {/* Family Background */}
                    <DetailSection
                      title="Family Background"
                      fields={[
                        { label: "Father's Name", value: userData.fatherName },
                        { label: "Father's Occupation", value: userData.fatherOccupation },
                        { label: "Mother's Name", value: userData.motherName },
                        { label: "Mother's Occupation", value: userData.motherOccupation },
                        { label: "Brothers", value: userData.brothers },
                        { label: "Married Brothers", value: userData.marriedBrothers },
                        { label: "Sisters", value: userData.sisters },
                        { label: "Married Sisters", value: userData.marriedSisters },
                        { label: "Intercaste in Family", value: userData.intercasteInFamily },
                        { label: "Parent Residing In", value: userData.parentResidingIn },
                        { label: "Mama Surname", value: userData.mamaSurname },
                        { label: "Mama Place", value: userData.mamaPlace },
                        { label: "Family Wealth", value: userData.familyWealth },
                        { label: "Relative Surnames", value: userData.relativeSurnames },
                      ]}
                    />

                    {/* Partner Expectations */}
                    <DetailSection
                      title="Partner Expectations"
                      fields={[
                        { label: "Age Range", value: userData.partnerAgeRange },
                        { label: "Looking For", value: userData.partnerLookingFor },
                        { label: "Height Range", value: userData.partnerHeightRange },
                        { label: "Complexion", value: userData.partnerComplexion },
                        { label: "Religion", value: userData.partnerReligion },
                        { label: "Caste", value: userData.partnerCaste },
                        { label: "Education", value: userData.partnerEducation },
                        { label: "Resident Status", value: userData.partnerResidentStatus },
                        { label: "Occupation", value: userData.partnerOccupation },
                        { label: "Income", value: userData.partnerIncome },
                        { label: "Country Living In", value: userData.partnerCountryLivingIn },
                        { label: "City Living In", value: userData.partnerCityLivingIn },
                        { label: "Eating Habits", value: userData.partnerEatingHabits },
                        { label: "Mangal", value: userData.partnerMangal },
                      ]}
                    />

                    {/* Account Status */}
                    <DetailSection
                      title="Account Status"
                      fields={[
                        { label: "Account Active", value: userData.accountActive },
                        { label: "Email Verified", value: userData.emailVerified },
                        { label: "Profile Completion", value: userData.completionPercentage ? `${userData.completionPercentage}%` : null },
                      ]}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fixed Footer - Action Buttons */}
            <div className="p-6 pt-3 border-t border-gray-100">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <button
                  onClick={() => setView("SUBSCRIPTION")}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Assign Subscription
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                >
                  Create Another User
                </button>
                <button
                  onClick={onClose}
                  className="flex-none bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 transform hover:-translate-y-0.5 text-sm"
                >
                  Close
                </button>
              </motion.div>
            </div>
          </>
        ) : (
          /* SUBSCRIPTION VIEW */
          <div className="p-4 h-full flex flex-col pt-12">
            <div className="overflow-y-auto flex-grow">
              <SubscriptionSelection
                userId={userData.userId}
                onSuccess={() => {
                  // You can add logic here: e.g., show a toast or close modal
                  window.location.reload(); // Reload after successful assignment to clear form
                }}
                onSkip={() => window.location.reload()}
              />
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-center">
              <button
                onClick={() => setView("SUCCESS")}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Back to Registration Details
              </button>
            </div>
          </div>
        )}

        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-300 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
