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

const RegistrationForm = () => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= ADMIN REQUIRED VALIDATION ONLY ================= */
  const validateAdminRequiredFields = () => {
    if (!formData.email?.trim()) return "Email is required";
    if (!formData.password?.trim()) return "Password is required";
    if (!formData.mobileNumber) return "Mobile number is required";
    if (!formData.gender) return "Gender is required";
    return null;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login first!");
        return;
      }

      const validationError = validateAdminRequiredFields();
      if (validationError) {
        alert(validationError);
        return;
      }

      /* ================= BASE PAYLOAD ================= */
      const payload = {
        email: formData.email,
        password: formData.password,
        mobileNumber: String(formData.mobileNumber),
        gender: formData.gender,
        autoActivate: true,
        skipEmailVerification: true,
        adminNotes: formData.adminNotes || "",
      };

      /* ================= OPTIONAL SECTIONS (ADD ONLY IF FILLED) ================= */

      if (formData.firstName || formData.lastName) {
        payload.profileDetails = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age ? Number(formData.age) : null,
          gender: formData.gender,
          religion: formData.religion,
          caste: formData.caste,
          maritalStatus: formData.maritalStatus,
          diet: formData.diet,
          bloodGroup: formData.bloodGroup,
          height: formData.height ? Number(formData.height) : null,
          weight: formData.weight ? Number(formData.weight) : null,
          complexion: formData.complexion,
          address: formData.fullAddress,
          currentCity: formData.city,
          district: formData.district,
          taluka: formData.taluka,
          pinCode: formData.pinCode ? Number(formData.pinCode) : null,
          physicallyChallenged: formData.physicallyChallenged === "Yes",
          spectacle: formData.spectacle === "Yes",
          lens: formData.lens === "Yes",
        };
      }

      if (formData.dob) {
        payload.horoscopeDetails = {
          dob: formData.dob,
          time: formData.time
            ? {
                hour: Number(formData.time.split(":")[0]),
                minute: Number(formData.time.split(":")[1]),
                second: 0,
                nano: 0,
              }
            : null,
          birthPlace: formData.birthPlace,
          nakshatra: formData.nakshatra,
          rashi: formData.rashi,
          mangal: formData.mangal,
          gotra: formData.gotra,
        };
      }

      if (formData.education || formData.occupation) {
        payload.educationDetails = {
          education: formData.education,
          degree: formData.degree,
          occupation: formData.occupation,
          occupationDetailsValid: formData.occupationDetails,
          incomePerYear: formData.incomePerYear
            ? Number(formData.incomePerYear)
            : null,
        };
      }

      if (formData.fathersName || formData.mothersName) {
        payload.familyBackground = {
          fathersName: formData.fathersName,
          fatherOccupation: formData.fatherOccupation,
          mothersName: formData.mothersName,
          motherOccupation: formData.motherOccupation,
          brother: Number(formData.brothers || 0),
          sisters: Number(formData.sisters || 0),
          marriedBrothers: Number(formData.marriedBrothers || 0),
          marriedSisters: Number(formData.marriedSisters || 0),
          interCasteInFamily: formData.interCasteInFamily === "Yes",
        };
      }

      if (formData.country || formData.city) {
        payload.contactDetails = {
          mobileNumber: String(formData.mobileNumber),
          email: formData.email,
          address: formData.fullAddress,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pinCode: formData.pinCode ? Number(formData.pinCode) : null,
          visibility: formData.contactVisibility,
        };
      }

      if (formData.lookingFor) {
        payload.partnerPreferences = {
          lookingFor: formData.lookingFor,
          ageRange: formData.ageRange,
          heightRange: formData.heightRange,
          religion: formData.partnerReligion,
          caste: formData.partnerCaste,
          education: formData.partnerEducation,
          occupation: formData.partnerOccupation,
          incomeRange: formData.incomeRange,
          maritalStatus: formData.partnerMaritalStatus,
          eatingHabits: formData.eatingHabits,
          drinkingHabits: formData.drinkingHabits,
          smokingHabits: formData.smokingHabits,
        };
      }

      console.log("FINAL PAYLOAD", payload);

      const res = await fetch(
        "https://mttlprv1.digiledge.info/api/v1/admin/registration/complete",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      alert("Registration Successful!");
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
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