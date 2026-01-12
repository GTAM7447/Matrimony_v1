import React, { useState } from "react";

import Step1BasicDetails from "../components/ProfileCreation/Step1PersonalDetails";
import Step2PersonalDetails from "../components/ProfileCreation/Step2HoroscopeDetails";
import Step3ReligionDetails from "../components/ProfileCreation/Step3EducationDetails";
import Step4EducationDetails from "../components/ProfileCreation/Step4FamilyBackground";
import Step5FamilyDetails from "../components/ProfileCreation/Step5PartnerExpectations";
import Step6ResidentialDetails from "../components/ProfileCreation/Step6ResidentialDetails";
import Step7UploadDocuments from "../components/ProfileCreation/Step7ProfilePasswordPhoto";
import AdminUserInfo from "../components/ProfileCreation/AdminUserInfo.jsx";

const RegistrationForm = () => {

  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      // Append non-file fields
      Object.keys(formData).forEach((key) => {
        if (
          key !== "profilePhotoFile" &&
          key !== "idProofFile" &&
          key !== "otherDocsFile"
        ) {
          fd.append(key, formData[key]);
        }
      });

      // Append files
      if (formData.profilePhotoFile) fd.append("profilePhoto", formData.profilePhotoFile);
      if (formData.idProofFile) fd.append("idProof", formData.idProofFile);
      if (formData.otherDocsFile) fd.append("otherDocs", formData.otherDocsFile);

      const token = localStorage.getItem("authToken")


      console.log("TOKEN USED:", token);

      const res = await fetch(
        "https://mttlprv1.digiledge.info/api/v1/admin/registration/complete",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
          redirect: "manual",
        }
      );

      console.log("RAW RESPONSE:", res.status, res.statusText);

      // Log all raw headers
      for (let [key, value] of res.headers.entries()) {
        console.log(`${key}: ${value}`);
      }

      // If backend returned an error
      if (!res.ok) {
        const text = await res.text();
        console.error("BACKEND ERROR RAW:", text);
        alert(text || "Submission failed");
        return;
      }

      const data = await res.json();
      console.log("Success:", data);
      alert("Registration Successful!");

    } catch (err) {
      console.error("Error submitting:", err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F9FF] px-4 py-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-12">

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
    </div>
  );
};

export default RegistrationForm;