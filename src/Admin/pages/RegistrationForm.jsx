import React, { useState } from "react";

import Step1BasicDetails from "../components/ProfileCreation/Step1PersonalDetails";
import Step2PersonalDetails from "../components/ProfileCreation/Step2HoroscopeDetails";
import Step3ReligionDetails from "../components/ProfileCreation/Step3EducationDetails";
import Step4EducationDetails from "../components/ProfileCreation/Step4FamilyBackground";
import Step5FamilyDetails from "../components/ProfileCreation/Step5PartnerExpectations";
import Step6ResidentialDetails from "../components/ProfileCreation/Step6ResidentialDetails";
import Step7UploadDocuments from "../components/ProfileCreation/Step7ProfilePasswordPhoto";
import AdminUserInfo from "../components/ProfileCreation/AdminUserInfo.jsx";
import SuccessModal from "../components/ProfileCreation/SuccessModal";
import { getAuthToken } from "../../utils/auth";
import { BASE_URL } from "../../apiConfig";

const RegistrationForm = () => {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredUserData, setRegisteredUserData] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];

    // Check mandatory fields
    if (!formData.email || !formData.email.trim()) {
      errors.push("Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    if (!formData.password || !formData.password.trim()) {
      errors.push("Password is required");
    } else if (formData.password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!formData.mobileNumber || !formData.mobileNumber.trim()) {
      errors.push("Mobile number is required");
    } else if (!/^[6-9][0-9]{9}$/.test(formData.mobileNumber)) {
      errors.push("Please enter a valid 10-digit mobile number");
    }

    if (!formData.gender || !formData.gender.trim()) {
      errors.push("Gender is required");
    }

    return errors;
  };

  const handleSubmit = async () => {
    try {
      // Clear previous messages
      setErrorMessage("");


      // Validate form
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        setErrorMessage(validationErrors.join(". ") + ".");
        // Scroll to top to show error
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Prepare JSON payload (backend expects @RequestBody, not multipart/form-data)
      const payload = {};

      // Add all non-file fields to payload
      Object.keys(formData).forEach((key) => {
        if (
          key !== "profilePhotoFile" &&
          key !== "idProofFile" &&
          key !== "otherDocsFile"
        ) {
          payload[key] = formData[key];
        }
      });

      console.log("REQUEST PAYLOAD:", payload);

      const token = getAuthToken();
      console.log("TOKEN USED:", token);

      // Check if token exists
      if (!token) {
        setErrorMessage("Admin session expired or not found. Please login again.");
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 2000);
        return;
      }

      // Use axios to send JSON (backend uses @RequestBody)
      const axios = (await import('axios')).default;

      const response = await axios.post(
        `${BASE_URL}/api/v1/admin/registration/complete`,
        payload,  // Send JSON, not FormData
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          maxRedirects: 0,
        }
      );

      console.log("SUCCESS RESPONSE:", response.data);

      // Store user data and show success modal
      setRegisteredUserData({ ...formData, ...response.data });
      setShowSuccessModal(true);
      setErrorMessage("");


    } catch (err) {
      console.error("Error submitting:", err);

      let errorMsg = "Failed to submit the form. Please try again.";

      // Extract error from axios error response
      if (err.response) {
        // Server responded with error status
        const errorData = err.response.data;
        console.error("BACKEND ERROR:", errorData);

        if (errorData.message) {
          errorMsg = errorData.message;
        } else if (errorData.details) {
          errorMsg = errorData.details;
        } else if (errorData.error) {
          errorMsg = errorData.error;
        }

        // Add suggested actions if available
        if (errorData.suggestedActions && errorData.suggestedActions.length > 0) {
          errorMsg += "\n\nSuggestions:\n• " + errorData.suggestedActions.join("\n• ");
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMsg = "No response from server. Please check your internet connection.";
      } else {
        // Something else happened
        errorMsg = err.message || errorMsg;
      }

      setErrorMessage(errorMsg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F9FF] px-4 py-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-12">

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Registration Error</h3>
                <div className="mt-2 text-sm text-red-700 whitespace-pre-line">
                  {errorMessage}
                </div>
                <button
                  onClick={() => setErrorMessage("")}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADMIN USER INFO ================= */}
        <AdminUserInfo
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* ================= STEP 1 ================= */}
        <Step1BasicDetails
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* ================= STEP 2 ================= */}
        <Step2PersonalDetails
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* ================= STEP 3 ================= */}
        <Step3ReligionDetails
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* ================= STEP 4 ================= */}
        <Step4EducationDetails
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* ================= STEP 5 ================= */}
        <Step5FamilyDetails
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* ================= STEP 6 ================= */}
        <Step6ResidentialDetails
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* ================= STEP 7 ================= */}
        <Step7UploadDocuments
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* ================= FINAL SUBMIT ================= */}
        <div className="flex justify-end pt-6 border-t">
          <button
            onClick={handleSubmit}
            className="bg-[#991CDD] hover:opacity-90 text-white px-8 py-3 rounded-lg text-sm font-medium"
          >
            Submit Registration
          </button>
        </div>

      </div>

      {/* Success Modal */}
      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        userData={registeredUserData}
      />
    </div>
  );
};

export default RegistrationForm;
