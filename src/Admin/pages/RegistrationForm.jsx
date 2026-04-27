// import React, { useState } from "react";
// import Step1BasicDetails from "../components/ProfileCreation/Step1PersonalDetails";
// import Step2PersonalDetails from "../components/ProfileCreation/Step2HoroscopeDetails";
// import Step3ReligionDetails from "../components/ProfileCreation/Step3EducationDetails";
// import Step4EducationDetails from "../components/ProfileCreation/Step4FamilyBackground";
// import Step5FamilyDetails from "../components/ProfileCreation/Step5PartnerExpectations";
// import Step6ResidentialDetails from "../components/ProfileCreation/Step6ResidentialDetails";
// import Step7UploadDocuments from "../components/ProfileCreation/Step7ProfilePasswordPhoto";
// import AdminUserInfo from "../components/ProfileCreation/AdminUserInfo.jsx";

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({});

//   const handleInputChange = (name, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* ================= ADMIN VALIDATION ================= */
//   const validateAdminRequiredFields = () => {
//     if (!formData.email) return "Email is required";
//     if (!formData.password) return "Password is required";
//     if (!formData.mobileNumber) return "Mobile number is required";
//     if (!formData.gender) return "Gender is required";
//     return null;
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         alert("Please login first!");
//         return;
//       }

//       const adminError = validateAdminRequiredFields();
//       if (adminError) {
//         alert(adminError);
//         return;
//       }

//       /* ================= SAFE ADDRESS BUILD ================= */
//       const safeAddress =
//         formData.fullAddress ||
//         formData.address ||
//         [formData.city, formData.state, formData.country]
//           .filter(Boolean)
//           .join(", ") ||
//         "NA";

//       const safePinCode = formData.pinCode
//         ? Number(formData.pinCode)
//         : 999999;

//       /* ================= PAYLOAD ================= */
//       const payload = {
//         email: formData.email,
//         password: formData.password,
//         mobileNumber: String(formData.mobileNumber),
//         gender: formData.gender,
//         adminNotes: formData.adminNotes || "",
//         skipEmailVerification: true,
//         autoActivate: true,
//       };

//       /* ================= PROFILE DETAILS ================= */
//       if (formData.firstName || formData.age) {
//         payload.profileDetails = {
//           age: Number(formData.age),
//           gender: formData.gender,
//           religion: formData.religion,
//           caste: formData.caste,
//           maritalStatus: formData.maritalStatus,
//           status: "ACTIVE",
//           diet: formData.diet,
//           bloodGroup: formData.bloodGroup,
//           height:
//             formData.heightFt && formData.heightIn
//               ? Number(formData.heightFt) * 30.48 +
//                 Number(formData.heightIn) * 2.54
//               : undefined,
//           weight: Number(formData.weight),
//           complexion: formData.complexion,
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           address: safeAddress,
//           currentCity: formData.city,
//           district: formData.district,
//           taluka: formData.taluka,
//           pinCode: safePinCode,
//           homeTownDistrict: formData.homeTownDistrict,
//           nativeTaluka: formData.nativeTaluka,
//           physicallyChallenged: formData.physicallyChallenged === "Yes",
//           spectacle: formData.spectacle === "Yes",
//           lens: formData.lens === "Yes",
//         };
//       }

//       /* ================= HOROSCOPE ================= */
//       if (formData.dob) {
//         payload.horoscopeDetails = {
//           dob: formData.dob,
//           time: formData.time
//             ? {
//                 hour: Number(formData.time.split(":")[0]),
//                 minute: Number(formData.time.split(":")[1]),
//                 second: 0,
//                 nano: 0,
//               }
//             : undefined,
//           birthPlace: formData.birthPlace,
//           nakshatra: formData.nakshatra,
//           rashi: formData.rashi,
//           charan: formData.charan,
//           nadi: formData.nadi,
//           devak: formData.devak,
//           gan: formData.gan,
//           gotra: formData.gotra,
//           mangal: formData.mangal,
//         };
//       }

//       /* ================= EDUCATION ================= */
//       if (formData.education || formData.occupation) {
//         payload.educationDetails = {
//           education: formData.education,
//           degree: formData.degree,
//           occupation: formData.occupation,
//           occupationDetailsValid: formData.occupationDetails,
//           incomePerYear: Number(formData.incomePerYear || 0),
//         };
//       }

//       /* ================= FAMILY ================= */
//       if (formData.fathersName) {
//         payload.familyBackground = {
//           fathersName: formData.fathersName,
//           mothersName: formData.mothersName,
//           fatherOccupation: formData.fatherOccupation,
//           motherOccupation: formData.motherOccupation,
//           brother: Number(formData.brothers || 0),
//           sisters: Number(formData.sisters || 0),
//           marriedBrothers: Number(formData.marriedBrothers || 0),
//           marriedSisters: Number(formData.marriedSisters || 0),
//           mamaSurname: formData.mamaSurname,
//           mamaPlace: formData.mamaPlace,
//           parentResiding: formData.parentResiding,
//           interCasteInFamily: formData.interCasteInFamily === "Yes",
//         };
//       }

//       /* ================= CONTACT (BACKEND SAFE) ================= */
//       payload.contactDetails = {
//         mobileNumber: Number(formData.mobileNumber),
//         email: formData.email,
//         address: safeAddress,
//         city: formData.city || "NA",
//         state: formData.state || "NA",
//         country: formData.country || "India",
//         pinCode: safePinCode,
//         visibility: formData.contactVisibility || "PRIVATE",
//       };

//       console.log("FINAL PAYLOAD", payload);

//       const res = await fetch(
//         "https://mttlprv1.digiledge.info/api/v1/admin/registration/complete",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!res.ok) {
//         const err = await res.text();
//         throw new Error(err);
//       }

//       alert("Registration Successful!");
//     } catch (err) {
//       console.error(err);
//       alert("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#F4F9FF] px-4 py-6">
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-12">
//         <AdminUserInfo formData={formData} onInputChange={handleInputChange} />
//         <Step1BasicDetails formData={formData} onInputChange={handleInputChange} />
//         <Step2PersonalDetails formData={formData} onInputChange={handleInputChange} />
//         <Step3ReligionDetails formData={formData} onInputChange={handleInputChange} />
//         <Step4EducationDetails formData={formData} onInputChange={handleInputChange} />
//         <Step5FamilyDetails formData={formData} onInputChange={handleInputChange} />
//         <Step6ResidentialDetails formData={formData} onInputChange={handleInputChange} />
//         <Step7UploadDocuments formData={formData} onInputChange={handleInputChange} />

//         <div className="flex justify-end pt-6 border-t">
//           <button
//             onClick={handleSubmit}
//             className="bg-[#991CDD] hover:opacity-90 text-white px-8 py-3 rounded-lg text-sm font-medium"
//           >
//             Submit Registration
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;




















// import React, { useState } from "react";
// import Step1BasicDetails from "../components/ProfileCreation/Step1PersonalDetails";
// import Step2PersonalDetails from "../components/ProfileCreation/Step2HoroscopeDetails";
// import Step3ReligionDetails from "../components/ProfileCreation/Step3EducationDetails";
// import Step4EducationDetails from "../components/ProfileCreation/Step4FamilyBackground";
// import Step5FamilyDetails from "../components/ProfileCreation/Step5PartnerExpectations";
// import Step6ResidentialDetails from "../components/ProfileCreation/Step6ResidentialDetails";
// import Step7UploadDocuments from "../components/ProfileCreation/Step7ProfilePasswordPhoto";
// import AdminUserInfo from "../components/ProfileCreation/AdminUserInfo.jsx";

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({});

//   const handleInputChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   /* ================= ADMIN VALIDATION ================= */
//   const validateAdminRequiredFields = () => {
//     if (!formData.email) return "Email is required";
//     if (!formData.password) return "Password is required";
//     if (!formData.mobileNumber) return "Mobile number is required";
//     if (!formData.gender) return "Gender is required";
//     return null;
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         alert("Please login first!");
//         return;
//       }

//       const adminError = validateAdminRequiredFields();
//       if (adminError) {
//         alert(adminError);
//         return;
//       }

//       /* ================= PAYLOAD (SCHEMA MATCHED) ================= */
//       const payload = {
//         email: formData.email,
//         password: formData.password,
//         mobileNumber: String(formData.mobileNumber),
//         gender: formData.gender,
//         skipEmailVerification: true,
//         autoActivate: true,
//         adminNotes: formData.adminNotes || "",

//         /* ================= PROFILE DETAILS ================= */
//         profileDetails: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           age: Number(formData.age),
//           gender: formData.gender,
//           religion: formData.religion,
//           caste: formData.caste,
//           maritalStatus: formData.maritalStatus,
//           status: "ACTIVE",
//           diet: formData.diet,
//           bloodGroup: formData.bloodGroup,
//           height: Number(formData.height),
//           weight: Number(formData.weight),
//           complexion: formData.complexion,
//           address: formData.fullAddress,
//           currentCity: formData.city,
//           district: formData.district,
//           taluka: formData.taluka,
//           pinCode: Number(formData.pinCode),
//           homeTownDistrict: formData.homeTownDistrict,
//           nativeTaluka: formData.nativeTaluka,
//           physicallyChallenged: formData.physicallyChallenged === "Yes",
//           spectacle: formData.spectacle === "Yes",
//           lens: formData.lens === "Yes",
//         },

//         /* ================= HOROSCOPE DETAILS ================= */
//         horoscopeDetails: {
//           dob: formData.dob,
//           time: {
//             hour: Number(formData.time?.split(":")[0] || 0),
//             minute: Number(formData.time?.split(":")[1] || 0),
//             second: 0,
//             nano: 0,
//           },
//           birthPlace: formData.birthPlace,
//           nakshatra: formData.nakshatra,
//           rashi: formData.rashi,
//           charan: formData.charan,
//           nadi: formData.nadi,
//           devak: formData.devak,
//           gan: formData.gan,
//           gotra: formData.gotra,
//           mangal: formData.mangal,
//         },

//         /* ================= EDUCATION DETAILS ================= */
//         educationDetails: {
//           education: formData.education,
//           degree: formData.degree,
//           occupation: formData.occupation,
//           occupationDetailsValid: formData.occupationDetails,
//           incomePerYear: Number(formData.incomePerYear),
//         },

//         /* ================= FAMILY BACKGROUND ================= */
//         familyBackground: {
//           fathersName: formData.fathersName,
//           fatherOccupation: formData.fatherOccupation,
//           mothersName: formData.mothersName,
//           motherOccupation: formData.motherOccupation,
//           brother: Number(formData.brothers),
//           sisters: Number(formData.sisters),
//           marriedBrothers: Number(formData.marriedBrothers),
//           marriedSisters: Number(formData.marriedSisters),
//           interCasteInFamily: formData.interCasteInFamily === "Yes",
//           parentResiding: formData.parentResiding,
//           mamaSurname: formData.mamaSurname,
//           mamaPlace: formData.mamaPlace,
//         },

//         /* ================= CONTACT DETAILS ================= */
//         contactDetails: {
//           mobileNumber: Number(formData.mobileNumber),
//           email: formData.email,
//           address: formData.fullAddress,
//           city: formData.city,
//           state: formData.state,
//           country: formData.country,
//           pinCode: Number(formData.pinCode),
//           visibility: formData.contactVisibility,
//         },

//         /* ================= PARTNER PREFERENCES ================= */
//         partnerPreferences: {
//           lookingFor: formData.lookingFor,
//           ageRange: formData.ageRange,
//           heightRange: formData.heightRange,
//           religion: formData.partnerReligion,
//           caste: formData.partnerCaste,
//           education: formData.partnerEducation,
//           occupation: formData.partnerOccupation,
//           incomeRange: formData.incomeRange,
//           location: formData.location,
//           maritalStatus: formData.partnerMaritalStatus,
//           eatingHabits: formData.eatingHabits,
//           drinkingHabits: formData.drinkingHabits,
//           smokingHabits: formData.smokingHabits,
//         },
//       };

//       console.log("FINAL PAYLOAD (SCHEMA OK)", payload);

//       const res = await fetch(
//         "https://mttlprv1.digiledge.info/api/v1/admin/registration/complete",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!res.ok) {
//         const err = await res.text();
//         throw new Error(err);
//       }

//       alert("Registration Successful!");
//     } catch (err) {
//       console.error(err);
//       alert("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#F4F9FF] px-4 py-6">
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-12">
//         <AdminUserInfo formData={formData} onInputChange={handleInputChange} />
//         <Step1BasicDetails formData={formData} onInputChange={handleInputChange} />
//         <Step2PersonalDetails formData={formData} onInputChange={handleInputChange} />
//         <Step3ReligionDetails formData={formData} onInputChange={handleInputChange} />
//         <Step4EducationDetails formData={formData} onInputChange={handleInputChange} />
//         <Step5FamilyDetails formData={formData} onInputChange={handleInputChange} />
//         <Step6ResidentialDetails formData={formData} onInputChange={handleInputChange} />
//         <Step7UploadDocuments formData={formData} onInputChange={handleInputChange} />

//         <div className="flex justify-end pt-6 border-t">
//           <button
//             onClick={handleSubmit}
//             className="bg-[#991CDD] hover:opacity-90 text-white px-8 py-3 rounded-lg text-sm font-medium"
//           >
//             Submit Registration
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;





















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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        <AdminUserInfo formData={formData} onInputChange={handleInputChange} />
        <Step1BasicDetails formData={formData} onInputChange={handleInputChange} />
        <Step2PersonalDetails formData={formData} onInputChange={handleInputChange} />
        <Step3ReligionDetails formData={formData} onInputChange={handleInputChange} />
        <Step4EducationDetails formData={formData} onInputChange={handleInputChange} />
        <Step5FamilyDetails formData={formData} onInputChange={handleInputChange} />
        <Step6ResidentialDetails formData={formData} onInputChange={handleInputChange} />
        <Step7UploadDocuments formData={formData} onInputChange={handleInputChange} />

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
