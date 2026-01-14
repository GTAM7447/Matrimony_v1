// import React, { useState, useEffect } from "react";
// import { Country } from "country-state-city";
// import Stepper from "./Stepper";
// import {
//   useGetPartnerPreferenceQuery,
//   useCreatePartnerPreferenceMutation,
//   useUpdatePartnerPreferenceMutation
// } from "../../context/createProfile";

// const Step5PartnerExpectations = ({
//   nextStep,
//   prevStep,
//   goToStep,
//   data,
//   setData,
//   step,
//   completedStep,
// }) => {
//   const [formData, setFormData] = useState(data || {});
//   const [countries, setCountries] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [hasExistingPartner, setHasExistingPartner] = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const [version, setVersion] = useState(0); // For optimistic locking

//   // RTK Query hooks
//   const { data: partnerApiResponse, isLoading: isFetching, error: partnerError } = useGetPartnerPreferenceQuery();
//   const [createPartnerPreference] = useCreatePartnerPreferenceMutation();
//   const [updatePartnerPreference] = useUpdatePartnerPreferenceMutation();

//   // Required fields as per backend validation
//   const requiredKeys = [
//     "ageRange",
//     "lookingFor",
//     "heightRange",
//     "partnerComplexion",
//     "partnerReligion",
//     "partnerCaste",
//     "partnerEducation",
//     "residentStatus",
//     "eatingHabits",
//     "countryLivingIn",
//     "cityLivingIn",
//     "mangal",
//     "partnerOccupation",
//     "partnerIncome"
//   ];

//   const isFormValid = requiredKeys.every(
//     (key) => formData[key] !== undefined && formData[key] !== ""
//   );

//   const [validationErrors, setValidationErrors] = useState({});

//   // Initialize countries
//   useEffect(() => {
//     setCountries(Country.getAllCountries());
//   }, []);

//   // Load data from GET API
//   useEffect(() => {
//     if (partnerApiResponse && !dataLoaded) {
//       console.log("Partner API Response:", partnerApiResponse);
      
//       const response = partnerApiResponse.data || partnerApiResponse;
      
//       if (response && response.success !== false) {
//         const partnerData = response.data || response;
        
//         if (partnerData) {
//           setHasExistingPartner(true);
//           setVersion(partnerData.version || 0);
          
//           // Transform backend field names to frontend field names
//           const transformedData = {
//             ageRange: partnerData.ageRange || "",
//             lookingFor: partnerData.lookingFor || "",
//             heightRange: partnerData.heightRange || "",
//             partnerComplexion: partnerData.complexion || "",
//             partnerReligion: partnerData.religion || "",
//             partnerCaste: partnerData.caste || "",
//             partnerEducation: partnerData.education || "",
//             residentStatus: partnerData.residentStatus || "",
//             eatingHabits: partnerData.eatingHabits || "",
//             countryLivingIn: partnerData.countryLivingIn || "",
//             cityLivingIn: partnerData.cityLivingIn || "",
//             stateLivingIn: partnerData.stateLivingIn || "",
//             mangal: partnerData.mangal === true ? "Yes" : partnerData.mangal === false ? "No" : "",
//             partnerOccupation: partnerData.partnerOccupation || "",
//             partnerIncome: partnerData.partnerIncome ? partnerData.partnerIncome.toString() : "",
//             partnerSubCaste: partnerData.subCaste || "",
//             partnerMaritalStatus: partnerData.maritalStatus || "",
//             partnerMotherTongue: partnerData.motherTongue || "",
//             partnerAdditionalPreferences: partnerData.additionalPreferences || "",
//             partnerDrinkingHabits: partnerData.drinkingHabits || "",
//             partnerSmokingHabits: partnerData.smokingHabits || ""
//           };

//           console.log("Transformed Form Data:", transformedData);
          
//           setFormData(transformedData);
//           setData(transformedData);
//           setDataLoaded(true);
          
//           setSuccessMessage("Partner preferences loaded successfully");
//           setTimeout(() => setSuccessMessage(""), 3000);
//         }
//       } else {
//         // No data exists
//         setHasExistingPartner(false);
//         setDataLoaded(true);
//         setSuccessMessage("Create new partner preferences");
//         setTimeout(() => setSuccessMessage(""), 3000);
//       }
//     }
//   }, [partnerApiResponse, dataLoaded, setData]);

//   // Handle API errors
//   useEffect(() => {
//     if (partnerError && !dataLoaded) {
//       console.log("Partner fetch error:", partnerError);
      
//       if (partnerError.status === 404) {
//         // No partner preferences exist yet
//         setHasExistingPartner(false);
//         setDataLoaded(true);
//         setSuccessMessage("No existing partner preferences found. Please create new ones.");
//       } else {
//         // setErrorMessage("Failed to load partner preferences. Please try again.");
//       }
//       setDataLoaded(true);
//     }
//   }, [partnerError, dataLoaded]);

//   const validateField = (name, value) => {
//     let err = "";
    
//     if (requiredKeys.includes(name) && (!value || value.toString().trim() === "")) {
//       err = "This field is required";
//     } else if (value && value.toString().trim() !== "") {
//       // Alphabet-only validation for text fields
//       const alphabetOnlyRegex = /^[A-Za-z\s]+$/;
      
//       // Fields that should only contain alphabets and spaces
//       const textFields = [
//         "partnerCaste",
//         "partnerEducation",
//         "cityLivingIn",
//         "stateLivingIn",
//         "partnerSubCaste",
//         "partnerMotherTongue",
//         "partnerOccupation",
//         "partnerAdditionalPreferences"
//       ];
      
//       if (textFields.includes(name)) {
//         if (!alphabetOnlyRegex.test(value)) {
//           err = "Only alphabets (A-Z, a-z) and spaces allowed";
//         }
//       }

//       // Age range validation
//       if (name === "ageRange") {
//         if (!/^\d{1,2}-\d{1,2}$/.test(value)) {
//           err = "Age range must be in format 'min-max' (e.g., '25-35')";
//         } else {
//           const [min, max] = value.split('-').map(Number);
//           if (min < 18 || max > 80) {
//             err = "Age range should be between 18 and 80";
//           }
//           if (min > max) {
//             err = "Minimum age cannot be greater than maximum age";
//           }
//         }
//       }

//       // Height range validation
//       if (name === "heightRange") {
//         if (value.length < 3 || value.length > 50) {
//           err = "Height range should be 3-50 characters";
//         }
//         const lowerHeight = value.toLowerCase();
//         if (!lowerHeight.includes("'") && !lowerHeight.includes("ft") && 
//             !lowerHeight.includes("cm") && !lowerHeight.includes("inch")) {
//           err = "Include height units (ft, cm, inch, or ')";
//         }
//       }

//       // Income validation
//       if (name === "partnerIncome") {
//         const income = parseInt(value);
//         if (isNaN(income) || income < 100000 || income > 50000000) {
//           err = "Income should be between ₹1,00,000 and ₹5,00,00,000";
//         }
//       }
//     }
    
//     setValidationErrors((prev) => ({ ...prev, [name]: err }));
//   };

//   const validateAllFields = () => {
//     requiredKeys.forEach((key) => validateField(key, formData[key] || ""));
//     return !Object.values(validationErrors).some((err) => err);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedData = { ...formData, [name]: value };
//     setFormData(updatedData);
//     setData(updatedData);
//     validateField(name, value);
    
//     if (errorMessage) setErrorMessage("");
//   };

//   const prepareApiData = () => {
//     console.log("Current form data:", formData);
    
//     // Create POST/PATCH data according to backend DTO
//     const apiData = {
//       // For PATCH, include version for optimistic locking
//       ...(hasExistingPartner && { version }),
      
//       // Required fields
//       ageRange: (formData.ageRange || "").trim(),
//       lookingFor: (formData.lookingFor || "").trim(),
//       heightRange: (formData.heightRange || "").trim(),
//       complexion: (formData.partnerComplexion || "").trim(),
//       religion: (formData.partnerReligion || "").trim(),
//       caste: (formData.partnerCaste || "").trim(),
//       education: (formData.partnerEducation || "").trim(),
//       residentStatus: (formData.residentStatus || "").trim(),
//       eatingHabits: (formData.eatingHabits || "").trim(),
//       countryLivingIn: (formData.countryLivingIn || "").trim(),
//       cityLivingIn: (formData.cityLivingIn || "").trim(),
//       stateLivingIn: (formData.stateLivingIn || "").trim(),
//       mangal: formData.mangal === "Yes",
//       partnerOccupation: (formData.partnerOccupation || "").trim(),
//       partnerIncome: parseInt(formData.partnerIncome) || 0,
      
//       // Optional fields
//       ...(formData.partnerSubCaste && { subCaste: formData.partnerSubCaste.trim() }),
//       ...(formData.partnerMaritalStatus && { maritalStatus: formData.partnerMaritalStatus.trim() }),
//       ...(formData.partnerMotherTongue && { motherTongue: formData.partnerMotherTongue.trim() }),
//       ...(formData.partnerAdditionalPreferences && { additionalPreferences: formData.partnerAdditionalPreferences.trim() }),
//       ...(formData.partnerDrinkingHabits && { drinkingHabits: formData.partnerDrinkingHabits.trim() }),
//       ...(formData.partnerSmokingHabits && { smokingHabits: formData.partnerSmokingHabits.trim() })
//     };

//     console.log("API Data to send:", apiData);
//     return apiData;
//   };

//   const handleNextClick = async () => {
//     console.log("=== FORM SUBMISSION STARTED ===");
    
//     // Validate required fields
//     const missingFields = requiredKeys.filter(
//       (key) => !formData[key] || formData[key].toString().trim() === ""
//     );
    
//     if (missingFields.length > 0) {
//       setErrorMessage(`Please fill all required fields: ${missingFields.join(", ")}`);
//       console.log("Missing fields:", missingFields);
//       return;
//     }
    
//     if (!validateAllFields()) {
//       setErrorMessage("Please fix all validation errors");
//       console.log("Validation errors:", validationErrors);
//       return;
//     }
    
//     // Check authentication
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setErrorMessage("Please login to save partner preferences");
//       return;
//     }
    
//     try {
//       setIsLoading(true);
//       setErrorMessage("");
//       setSuccessMessage("");
      
//       const apiData = prepareApiData();
//       console.log("Sending to API...");
      
//       let response;

//       if (hasExistingPartner) {
//         console.log("Using PATCH to update existing partner preferences");
//         response = await updatePartnerPreference(apiData).unwrap();
//       } else {
//         console.log("Using POST to create new partner preferences");
//         response = await createPartnerPreference(apiData).unwrap();
//       }

//       console.log("API Response:", response);

//       //unwrap() guarantees success
//       setSuccessMessage(
//         hasExistingPartner
//           ? "Partner preferences updated successfully!"
//           : "Partner preferences created successfully!"
//       );

//       // MOVE TO NEXT STEP IMMEDIATELY
//       nextStep();

//     } catch (error) {
//       console.error("API Error:", error);
      
//       let errorMsg = "Failed to save partner preferences. Please try again.";
      
//       if (error.data) {
//         if (error.data.errors) {
//           const validationErrors = Object.entries(error.data.errors)
//             .map(([field, message]) => `${field}: ${message}`)
//             .join(', ');
//           errorMsg = `Validation errors: ${validationErrors}`;
//         } else if (error.data.message) {
//           errorMsg = error.data.message;
//         }
//       } else if (error.status === 400) {
//         errorMsg = "Invalid data. Please check all fields.";
//       } else if (error.status === 409) {
//         errorMsg = "Conflict - partner preferences already exist for this user";
//       } else if (error.status === 429) {
//         errorMsg = "Too many requests. Please wait and try again.";
//       }
      
//       setErrorMessage(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fieldStyle = {
//     backgroundColor: "#FF8C4405",
//     border: "1px solid #8180801c",
//     borderRadius: "6px",
//     fontFamily: "'Inter', sans-serif",
//     fontWeight: 400,
//     color: "#646565ff",
//     padding: "14px 12px",
//   };

//   const labelStyle = {
//     fontSize: "15px",
//     fontFamily: "'Inter', sans-serif",
//     fontWeight: 600,
//     marginBottom: "4px",
//   };

//   // Check authentication
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return (
//       <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
//         <div className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto" style={{ backgroundColor: "#FF8C4426" }}>
//           <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
//         </div>
//         <div className="px-4 sm:px-6 md:px-10 py-20 flex flex-col items-center justify-center" style={{ backgroundColor: "#FF8C4405" }}>
//           <div className="text-red-500 text-lg mb-4">Authentication Required</div>
//           <p className="text-gray-600 mb-6">Please login to access your partner preferences.</p>
//           <button onClick={() => (window.location.href = "/signin")} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Show loading state
//   if (isFetching && !dataLoaded) {
//     return (
//       <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
//         <div className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto" style={{ backgroundColor: "#FF8C4426" }}>
//           <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
//         </div>
//         <div className="flex justify-center items-center h-64" style={{ backgroundColor: "#FF8C4405" }}>
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//           <span className="ml-3">Loading partner preferences...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
//       {/* STEP HEADER */}
//       <div className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto" style={{ backgroundColor: "#FF8C4426" }}>
//         <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
//       </div>

//       {/* MAIN FORM BOX */}
//       <div className="px-4 sm:px-6 md:px-10 py-8" style={{ backgroundColor: "#FF8C4405" }}>
//         {/* Status Messages */}
//         {successMessage && (
//           <div className={`mb-6 p-3 rounded-md ${hasExistingPartner ? "bg-green-50 border border-green-200 text-green-600" : "bg-blue-50 border border-blue-200 text-blue-600"}`}>
//             <p className="text-sm text-center">{successMessage}</p>
//           </div>
//         )}

//         {errorMessage && (
//           <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
//             <p className="text-red-600 text-sm text-center">{errorMessage}</p>
//           </div>
//         )}

//         <h3 className="text-center text-orange-400 font-[Inter] font-semibold uppercase mb-8 tracking-wide text-xl">
//           Partner Expectations
//         </h3>

//         {/* FORM GRID */}
//         <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-700">
//           {/* AGE RANGE */}
//           <div>
//             <label style={labelStyle}>Age Range <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="ageRange"
//               value={formData.ageRange || ""}
//               onChange={handleChange}
//               placeholder="e.g., 25-35"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             <p className="text-xs text-gray-500 mt-1">Format: min-max (e.g., 25-35)</p>
//             {validationErrors.ageRange && <p className="text-red-500 text-xs mt-1">{validationErrors.ageRange}</p>}
//           </div>

//           {/* LOOKING FOR */}
//           <div>
//             <label style={labelStyle}>Looking For <span style={{ color: "red" }}>*</span></label>
//             <select
//               required
//               name="lookingFor"
//               value={formData.lookingFor || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             >
//               <option value="">Select</option>
//               <option value="Unmarried">Unmarried</option>
//               <option value="Divorced">Divorced</option>
//               <option value="Widowed">Widowed</option>
//               <option value="Separated">Separated</option>
//               <option value="Awaiting Divorce">Awaiting Divorce</option>
//               <option value="Any">Any</option>
//             </select>
//           </div>

//           {/* HEIGHT RANGE */}
//           <div>
//             <label style={labelStyle}>Height Range <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="heightRange"
//               value={formData.heightRange || ""}
//               onChange={handleChange}
//               placeholder="e.g., 5'6'' - 5'10'' or 165-178 cm"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             <p className="text-xs text-gray-500 mt-1">Include units (ft/cm/inch)</p>
//             {validationErrors.heightRange && <p className="text-red-500 text-xs mt-1">{validationErrors.heightRange}</p>}
//           </div>

//           {/* COMPLEXION */}
//           <div>
//             <label style={labelStyle}>Complexion <span style={{ color: "red" }}>*</span></label>
//             <select
//               required
//               name="partnerComplexion"
//               value={formData.partnerComplexion || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             >
//               <option value="">Select</option>
//               <option value="Fair">Fair</option>
//               <option value="Wheatish">Wheatish</option>
//               <option value="Dark">Dark</option>
//               <option value="Any">Any</option>
//             </select>
//           </div>

//           {/* RELIGION */}
//           <div>
//             <label style={labelStyle}>Religion <span style={{ color: "red" }}>*</span></label>
//             <select
//               required
//               name="partnerReligion"
//               value={formData.partnerReligion || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             >
//               <option value="">Select</option>
//               <option value="Hindu">Hindu</option>
//               <option value="Muslim">Muslim</option>
//               <option value="Christian">Christian</option>
//               <option value="Sikh">Sikh</option>
//               <option value="Jain">Jain</option>
//               <option value="Buddhist">Buddhist</option>
//               <option value="Any">Any</option>
//             </select>
//           </div>

//           {/* CASTE */}
//           <div>
//             <label style={labelStyle}>Caste <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="partnerCaste"
//               value={formData.partnerCaste || ""}
//               onChange={handleChange}
//               placeholder="Enter caste"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//               maxLength={50}
//             />
//             {validationErrors.partnerCaste && <p className="text-red-500 text-xs mt-1">{validationErrors.partnerCaste}</p>}
//           </div>

//           {/* SUB-CASTE (Optional) */}
//           <div>
//             <label style={labelStyle}>Sub-Caste</label>
//             <input
//               type="text"
//               name="partnerSubCaste"
//               value={formData.partnerSubCaste || ""}
//               onChange={handleChange}
//               placeholder="Enter sub-caste (optional)"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//               maxLength={50}
//             />
//             {validationErrors.partnerSubCaste && <p className="text-red-500 text-xs mt-1">{validationErrors.partnerSubCaste}</p>}
//           </div>

//           {/* EDUCATION */}
//           <div>
//             <label style={labelStyle}>Education <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="partnerEducation"
//               value={formData.partnerEducation || ""}
//               onChange={handleChange}
//               placeholder="Enter Education"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//               maxLength={100}
//             />
//             {validationErrors.partnerEducation && <p className="text-red-500 text-xs mt-1">{validationErrors.partnerEducation}</p>}
//           </div>

//           {/* RESIDENT STATUS */}
//           <div>
//             <label style={labelStyle}>Resident Status <span style={{ color: "red" }}>*</span></label>
//             <select
//               required
//               name="residentStatus"
//               value={formData.residentStatus || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             >
//               <option value="">Select</option>
//               <option value="Citizen">Citizen</option>
//               <option value="Permanent Resident">Permanent Resident</option>
//               <option value="Work Permit">Work Permit</option>
//               <option value="Student Visa">Student Visa</option>
//               <option value="Temporary Visa">Temporary Visa</option>
//             </select>
//           </div>

//           {/* OCCUPATION */}
//           <div>
//             <label style={labelStyle}>Occupation <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="partnerOccupation"
//               value={formData.partnerOccupation || ""}
//               onChange={handleChange}
//               placeholder="Enter Occupation"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//               maxLength={100}
//             />
//             {validationErrors.partnerOccupation && <p className="text-red-500 text-xs mt-1">{validationErrors.partnerOccupation}</p>}
//           </div>

//           {/* INCOME */}
//           <div>
//             <label style={labelStyle}>Income (per year) <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="number"
//               name="partnerIncome"
//               value={formData.partnerIncome || ""}
//               onChange={handleChange}
//               placeholder="Enter income in rupees"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//               min="100000"
//               max="50000000"
//             />
//             <p className="text-xs text-gray-500 mt-1">Annual income (₹1,00,000 - ₹5,00,00,000)</p>
//             {validationErrors.partnerIncome && <p className="text-red-500 text-xs mt-1">{validationErrors.partnerIncome}</p>}
//           </div>

//           {/* COUNTRY */}
//           <div>
//             <label style={labelStyle}>Country Living in <span style={{ color: "red" }}>*</span></label>
//             <select
//               required
//               name="countryLivingIn"
//               value={formData.countryLivingIn || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             >
//               <option value="">Select Country</option>
//               {countries.map((c) => (
//                 <option key={c.isoCode} value={c.name}>{c.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* CITY */}
//           <div>
//             <label style={labelStyle}>City Living in <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="cityLivingIn"
//               value={formData.cityLivingIn || ""}
//               onChange={handleChange}
//               placeholder="Enter city"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//               maxLength={50}
//             />
//             {validationErrors.cityLivingIn && <p className="text-red-500 text-xs mt-1">{validationErrors.cityLivingIn}</p>}
//           </div>

//           {/* STATE (Optional) */}
//           <div>
//             <label style={labelStyle}>State Living in</label>
//             <input
//               type="text"
//               name="stateLivingIn"
//               value={formData.stateLivingIn || ""}
//               onChange={handleChange}
//               placeholder="Enter state (optional)"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//               maxLength={50}
//             />
//             {validationErrors.stateLivingIn && <p className="text-red-500 text-xs mt-1">{validationErrors.stateLivingIn}</p>}
//           </div>

//           {/* EATING HABITS */}
//           <div>
//             <label style={labelStyle}>Eating Habits <span style={{ color: "red" }}>*</span></label>
//             <select
//               required
//               name="eatingHabits"
//               value={formData.eatingHabits || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             >
//               <option value="">Select</option>
//               <option value="Vegetarian">Vegetarian</option>
//               <option value="Non-Vegetarian">Non-Vegetarian</option>
//               <option value="Vegan">Vegan</option>
//               <option value="Jain Vegetarian">Jain Vegetarian</option>
//               <option value="Eggetarian">Eggetarian</option>
//               <option value="Occasionally Non-Vegetarian">Occasionally Non-Vegetarian</option>
//             </select>
//           </div>

//           {/* DRINKING HABITS (Optional) */}
//           <div>
//             <label style={labelStyle}>Drinking Habits</label>
//             <select
//               name="partnerDrinkingHabits"
//               value={formData.partnerDrinkingHabits || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             >
//               <option value="">Select (optional)</option>
//               <option value="Non-drinker">Non-drinker</option>
//               <option value="Drinks socially">Drinks socially</option>
//               <option value="Drinks regularly">Drinks regularly</option>
//               <option value="Occasional drinker">Occasional drinker</option>
//             </select>
//           </div>

//           {/* SMOKING HABITS (Optional) */}
//           <div>
//             <label style={labelStyle}>Smoking Habits</label>
//             <select
//               name="partnerSmokingHabits"
//               value={formData.partnerSmokingHabits || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             >
//               <option value="">Select (optional)</option>
//               <option value="Non-smoker">Non-smoker</option>
//               <option value="Light smoker">Light smoker</option>
//               <option value="Regular smoker">Regular smoker</option>
//               <option value="Occasional smoker">Occasional smoker</option>
//             </select>
//           </div>

//           {/* MANGAL */}
//           <div>
//             <label style={labelStyle}>Mangal (Kuja Dosha) <span style={{ color: "red" }}>*</span></label>
//             <select
//               required
//               name="mangal"
//               value={formData.mangal || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             >
//               <option value="">Select</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//               <option value="Doesn't Matter">Doesn't Matter</option>
//             </select>
//           </div>

//           {/* MARITAL STATUS (Optional) */}
//           <div>
//             <label style={labelStyle}>Marital Status</label>
//             <select
//               name="partnerMaritalStatus"
//               value={formData.partnerMaritalStatus || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             >
//               <option value="">Select (optional)</option>
//               <option value="Never Married">Never Married</option>
//               <option value="Divorced">Divorced</option>
//               <option value="Widowed">Widowed</option>
//               <option value="Separated">Separated</option>
//               <option value="Awaiting Divorce">Awaiting Divorce</option>
//             </select>
//           </div>

//           {/* MOTHER TONGUE (Optional) */}
//           <div>
//             <label style={labelStyle}>Mother Tongue</label>
//             <input
//               type="text"
//               name="partnerMotherTongue"
//               value={formData.partnerMotherTongue || ""}
//               onChange={handleChange}
//               placeholder="Mother tongue (optional)"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//               maxLength={50}
//             />
//             {validationErrors.partnerMotherTongue && <p className="text-red-500 text-xs mt-1">{validationErrors.partnerMotherTongue}</p>}
//           </div>

//           {/* ADDITIONAL PREFERENCES (Optional) */}
//           <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
//             <label style={labelStyle}>Additional Preferences</label>
//             <textarea
//               name="partnerAdditionalPreferences"
//               value={formData.partnerAdditionalPreferences || ""}
//               onChange={handleChange}
//               placeholder="Any other preferences (optional)"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={{ ...fieldStyle, minHeight: "80px" }}
//               rows={3}
//               maxLength={500}
//             />
//             {validationErrors.partnerAdditionalPreferences && <p className="text-red-500 text-xs mt-1">{validationErrors.partnerAdditionalPreferences}</p>}
//           </div>
//         </form>
//       </div>

//       {/* BUTTON ROW */}
//       <div className="border-gray-300 flex justify-end items-center gap-4 py-4 px-4 sm:px-6 md:px-10" style={{ backgroundColor: "#FF8C4405" }}>
//         <button
//           type="button"
//           onClick={prevStep}
//           className="bg-white text-orange-600 px-10 py-3 rounded-xl cursor-pointer border border-orange-500 hover:bg-orange-50"
//           disabled={isLoading}
//         >
//           Previous
//         </button>
//         <button
//           type="button"
//           disabled={!isFormValid || isLoading}
//           onClick={handleNextClick}
//           className={`px-10 py-3 rounded-xl text-white flex items-center justify-center ${
//             isFormValid && !isLoading 
//               ? "bg-orange-400 hover:bg-orange-500" 
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           {isLoading ? (
//             <>
//               <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
//               {hasExistingPartner ? "Updating..." : "Creating..."}
//             </>
//           ) : (
//             "Save & Next"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step5PartnerExpectations;






























// components/registration/steps/Step5PartnerExpectations.jsx
import React, { useState, useEffect } from "react";
import { Country } from "country-state-city";

const Step5PartnerExpectations = ({ formData, onInputChange, onNext, onBack }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [countries, setCountries] = useState([]);

  // Required fields
  const requiredFields = [
    "ageRange",
    "lookingFor",
    "heightRange",
    "partnerComplexion",
    "partnerReligion",
    "partnerCaste",
    "partnerEducation",
    "residentStatus",
    "eatingHabits",
    "countryLivingIn",
    "cityLivingIn",
    "mangal",
    "partnerOccupation",
    "partnerIncome"
  ];

  // Dropdown options
  const lookingForOptions = [
    "Unmarried", "Divorced", "Widowed", "Separated", "Awaiting Divorce", "Any"
  ];
  
  const complexionOptions = ["Fair", "Wheatish", "Dark", "Any"];
  
  const religionOptions = [
    "Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Any"
  ];
  
  const residentStatusOptions = [
    "Citizen", "Permanent Resident", "Work Permit", "Student Visa", "Temporary Visa"
  ];
  
  const eatingHabitsOptions = [
    "Vegetarian", "Non-Vegetarian", "Vegan", "Jain Vegetarian", 
    "Eggetarian", "Occasionally Non-Vegetarian"
  ];
  
  const drinkingHabitsOptions = [
    "Non-drinker", "Drinks socially", "Drinks regularly", "Occasional drinker"
  ];
  
  const smokingHabitsOptions = [
    "Non-smoker", "Light smoker", "Regular smoker", "Occasional smoker"
  ];
  
  const mangalOptions = ["Yes", "No", "Doesn't Matter"];
  
  const maritalStatusOptions = [
    "Never Married", "Divorced", "Widowed", "Separated", "Awaiting Divorce"
  ];

  // Initialize countries
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const sortedCountries = allCountries.sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    setCountries(sortedCountries);
  }, []);

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";
    
    if (!value || value.toString().trim() === "") {
      if (requiredFields.includes(name)) {
        error = "This field is required";
      }
    } else {
      switch(name) {
        case "ageRange":
          if (!/^\d{1,2}-\d{1,2}$/.test(value)) {
            error = "Format must be min-max (e.g., 25-35)";
          } else {
            const [min, max] = value.split('-').map(Number);
            if (min < 18 || max > 80) {
              error = "Age range should be between 18 and 80";
            }
            if (min > max) {
              error = "Minimum age cannot be greater than maximum age";
            }
          }
          break;
          
        case "heightRange":
          if (value.length < 3 || value.length > 50) {
            error = "Height range should be 3-50 characters";
          }
          const lowerHeight = value.toLowerCase();
          if (!lowerHeight.includes("'") && !lowerHeight.includes("ft") && 
              !lowerHeight.includes("cm") && !lowerHeight.includes("inch")) {
            error = "Include height units (ft, cm, inch, or ')";
          }
          break;
          
        case "partnerCaste":
        case "partnerSubCaste":
          if (!/^[A-Za-z\s]+$/.test(value)) {
            error = "Only alphabets and spaces allowed";
          } else if (value.length > 50) {
            error = "Cannot exceed 50 characters";
          }
          break;
          
        case "partnerEducation":
        case "partnerOccupation":
          if (!/^[A-Za-z\s.,'()\-&]+$/.test(value)) {
            error = "Only alphabets, spaces, and basic punctuation allowed";
          } else if (value.length > 100) {
            error = "Cannot exceed 100 characters";
          }
          break;
          
        case "partnerIncome":
          const income = parseInt(value);
          if (isNaN(income) || income < 100000) {
            error = "Income must be at least ₹1,00,000";
          } else if (income > 50000000) {
            error = "Income cannot exceed ₹5,00,00,000";
          }
          break;
          
        case "cityLivingIn":
        case "stateLivingIn":
        case "partnerMotherTongue":
          if (!/^[A-Za-z\s]+$/.test(value)) {
            error = "Only alphabets and spaces allowed";
          } else if (value.length > 50) {
            error = "Cannot exceed 50 characters";
          }
          break;
          
        case "partnerAdditionalPreferences":
          if (value.length > 500) {
            error = "Cannot exceed 500 characters";
          }
          break;
          
        default:
          break;
      }
    }
    
    return error;
  };

  // Validate all required fields
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate all required fields
    requiredFields.forEach(field => {
      const value = formData[field] || "";
      const error = validateField(field, value);
      
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Validate optional fields if they have value
    const optionalFields = [
      "partnerSubCaste",
      "stateLivingIn",
      "partnerMaritalStatus",
      "partnerMotherTongue",
      "partnerAdditionalPreferences",
      "partnerDrinkingHabits",
      "partnerSmokingHabits"
    ];
    
    optionalFields.forEach(field => {
      const value = formData[field] || "";
      if (value && value.toString().trim() !== "") {
        const error = validateField(field, value);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });

    setValidationErrors(newErrors);
    
    // Mark all fields as touched to show errors
    const allTouched = {};
    [...requiredFields, ...optionalFields].forEach(field => {
      allTouched[field] = true;
    });
    setTouchedFields(prev => ({ ...prev, ...allTouched }));
    
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    let processedValue = value;
    
    // Apply character restrictions based on field type
    switch(name) {
      case "ageRange":
        // Only allow digits and dash
        processedValue = value.replace(/[^0-9-]/g, '');
        // Ensure only one dash
        const dashCount = (processedValue.match(/-/g) || []).length;
        if (dashCount > 1) {
          processedValue = processedValue.replace(/-.*-/, '-');
        }
        break;
        
      case "partnerCaste":
      case "partnerSubCaste":
      case "cityLivingIn":
      case "stateLivingIn":
      case "partnerMotherTongue":
        processedValue = value.replace(/[^A-Za-z\s]/g, '');
        break;
        
      case "partnerEducation":
      case "partnerOccupation":
        processedValue = value.replace(/[^A-Za-z\s.,'()\-&]/g, '');
        break;
        
      case "partnerIncome":
        processedValue = value.replace(/\D/g, '');
        break;
        
      default:
        break;
    }
    
    // Update form data
    onInputChange(name, processedValue);
    
    // Validate the field
    const error = validateField(name, processedValue);
    setValidationErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setValidationErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleNextClick = () => {
    if (validateAllFields()) {
      onNext();
    }
  };

  const getFieldStyle = (fieldName) => {
    const baseStyle = {
      backgroundColor: "#FDF8FF",
      border: "1px solid #8180801c",
      borderRadius: "6px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      color: "#646565ff",
      padding: "14px 12px",
      width: "100%",
    };

    // Highlight field with red border if it has an error AND has been touched
    if (touchedFields[fieldName] && validationErrors[fieldName]) {
      return {
        ...baseStyle,
        border: "2px solid #ef4444",
        backgroundColor: "#fef2f2",
      };
    }

    return baseStyle;
  };

  const labelStyle = {
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    marginBottom: "4px",
    display: "block",
  };

  // Check if all required fields are filled
  const isFormValid = requiredFields.every(
    field => formData[field] && formData[field].toString().trim() !== ""
  );

  return (
    <div className="w-full mx-auto font-[Inter]">
      {/* FORM HEADER */}
      <div
        className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
        style={{ backgroundColor: "#991CDD26" }}
      >
        <h3 className="text-center text-[#991CDD] font-[Inter] font-semibold uppercase mb-4 mt-4 tracking-wide text-xl">
          Partner Expectations
        </h3>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm text-gray-700 mt-2 p-3" style={{ backgroundColor: "#FDF8FF" }}>
        
        {/* AGE RANGE */}
        <div>
          <label style={labelStyle}>
            Age Range <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ageRange"
            value={formData.ageRange || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., 25-35"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("ageRange")}
            maxLength={5}
          />
          {touchedFields.ageRange && validationErrors.ageRange && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.ageRange}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Format: min-max (e.g., 25-35)
          </p>
        </div>

        {/* LOOKING FOR */}
        <div>
          <label style={labelStyle}>
            Looking For <span className="text-red-500">*</span>
          </label>
          <select
            name="lookingFor"
            value={formData.lookingFor || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("lookingFor")}
          >
            <option value="">Select</option>
            {lookingForOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {touchedFields.lookingFor && validationErrors.lookingFor && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.lookingFor}
            </p>
          )}
        </div>

        {/* HEIGHT RANGE */}
        <div>
          <label style={labelStyle}>
            Height Range <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="heightRange"
            value={formData.heightRange || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., 5'6'' - 5'10'' or 165-178 cm"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("heightRange")}
            maxLength={50}
          />
          {touchedFields.heightRange && validationErrors.heightRange && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.heightRange}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Include units (ft/cm/inch)
          </p>
        </div>

        {/* COMPLEXION */}
        <div>
          <label style={labelStyle}>
            Complexion <span className="text-red-500">*</span>
          </label>
          <select
            name="partnerComplexion"
            value={formData.partnerComplexion || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerComplexion")}
          >
            <option value="">Select</option>
            {complexionOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {touchedFields.partnerComplexion && validationErrors.partnerComplexion && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerComplexion}
            </p>
          )}
        </div>

        {/* RELIGION */}
        <div>
          <label style={labelStyle}>
            Religion <span className="text-red-500">*</span>
          </label>
          <select
            name="partnerReligion"
            value={formData.partnerReligion || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerReligion")}
          >
            <option value="">Select</option>
            {religionOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {touchedFields.partnerReligion && validationErrors.partnerReligion && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerReligion}
            </p>
          )}
        </div>

        {/* CASTE */}
        <div>
          <label style={labelStyle}>
            Caste <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="partnerCaste"
            value={formData.partnerCaste || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter caste"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerCaste")}
            maxLength={50}
          />
          {touchedFields.partnerCaste && validationErrors.partnerCaste && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerCaste}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.partnerCaste?.length || 0}/50 characters
          </p>
        </div>

        {/* SUB-CASTE (Optional) */}
        <div>
          <label style={labelStyle}>
            Sub-Caste
          </label>
          <input
            type="text"
            name="partnerSubCaste"
            value={formData.partnerSubCaste || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter sub-caste (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerSubCaste")}
            maxLength={50}
          />
          {touchedFields.partnerSubCaste && validationErrors.partnerSubCaste && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerSubCaste}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.partnerSubCaste?.length || 0}/50 characters
          </p>
        </div>

        {/* EDUCATION */}
        <div>
          <label style={labelStyle}>
            Education <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="partnerEducation"
            value={formData.partnerEducation || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Education"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerEducation")}
            maxLength={100}
          />
          {touchedFields.partnerEducation && validationErrors.partnerEducation && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerEducation}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.partnerEducation?.length || 0}/100 characters
          </p>
        </div>

        {/* RESIDENT STATUS */}
        <div>
          <label style={labelStyle}>
            Resident Status <span className="text-red-500">*</span>
          </label>
          <select
            name="residentStatus"
            value={formData.residentStatus || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("residentStatus")}
          >
            <option value="">Select</option>
            {residentStatusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {touchedFields.residentStatus && validationErrors.residentStatus && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.residentStatus}
            </p>
          )}
        </div>

        {/* OCCUPATION */}
        <div>
          <label style={labelStyle}>
            Occupation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="partnerOccupation"
            value={formData.partnerOccupation || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Occupation"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerOccupation")}
            maxLength={100}
          />
          {touchedFields.partnerOccupation && validationErrors.partnerOccupation && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerOccupation}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.partnerOccupation?.length || 0}/100 characters
          </p>
        </div>

        {/* INCOME */}
        <div>
          <label style={labelStyle}>
            Income (per year) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="partnerIncome"
            value={formData.partnerIncome || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter income in rupees"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerIncome")}
            maxLength={9}
          />
          {touchedFields.partnerIncome && validationErrors.partnerIncome && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerIncome}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Annual income (₹1,00,000 - ₹5,00,00,000)
          </p>
        </div>

        {/* COUNTRY */}
        <div>
          <label style={labelStyle}>
            Country Living in <span className="text-red-500">*</span>
          </label>
          <select
            name="countryLivingIn"
            value={formData.countryLivingIn || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("countryLivingIn")}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {touchedFields.countryLivingIn && validationErrors.countryLivingIn && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.countryLivingIn}
            </p>
          )}
        </div>

        {/* CITY */}
        <div>
          <label style={labelStyle}>
            City Living in <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="cityLivingIn"
            value={formData.cityLivingIn || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter city"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("cityLivingIn")}
            maxLength={50}
          />
          {touchedFields.cityLivingIn && validationErrors.cityLivingIn && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.cityLivingIn}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.cityLivingIn?.length || 0}/50 characters
          </p>
        </div>

        {/* STATE (Optional) */}
        <div>
          <label style={labelStyle}>
            State Living in
          </label>
          <input
            type="text"
            name="stateLivingIn"
            value={formData.stateLivingIn || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter state (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("stateLivingIn")}
            maxLength={50}
          />
          {touchedFields.stateLivingIn && validationErrors.stateLivingIn && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.stateLivingIn}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.stateLivingIn?.length || 0}/50 characters
          </p>
        </div>

        {/* EATING HABITS */}
        <div>
          <label style={labelStyle}>
            Eating Habits <span className="text-red-500">*</span>
          </label>
          <select
            name="eatingHabits"
            value={formData.eatingHabits || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("eatingHabits")}
          >
            <option value="">Select</option>
            {eatingHabitsOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {touchedFields.eatingHabits && validationErrors.eatingHabits && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.eatingHabits}
            </p>
          )}
        </div>

        {/* DRINKING HABITS (Optional) */}
        <div>
          <label style={labelStyle}>
            Drinking Habits
          </label>
          <select
            name="partnerDrinkingHabits"
            value={formData.partnerDrinkingHabits || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerDrinkingHabits")}
          >
            <option value="">Select (optional)</option>
            {drinkingHabitsOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {touchedFields.partnerDrinkingHabits && validationErrors.partnerDrinkingHabits && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerDrinkingHabits}
            </p>
          )}
        </div>

        {/* SMOKING HABITS (Optional) */}
        <div>
          <label style={labelStyle}>
            Smoking Habits
          </label>
          <select
            name="partnerSmokingHabits"
            value={formData.partnerSmokingHabits || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerSmokingHabits")}
          >
            <option value="">Select (optional)</option>
            {smokingHabitsOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {touchedFields.partnerSmokingHabits && validationErrors.partnerSmokingHabits && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerSmokingHabits}
            </p>
          )}
        </div>

        {/* MANGAL */}
        <div>
          <label style={labelStyle}>
            Mangal (Kuja Dosha) <span className="text-red-500">*</span>
          </label>
          <select
            name="mangal"
            value={formData.mangal || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("mangal")}
          >
            <option value="">Select</option>
            {mangalOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {touchedFields.mangal && validationErrors.mangal && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.mangal}
            </p>
          )}
        </div>

        {/* MARITAL STATUS (Optional) */}
        <div>
          <label style={labelStyle}>
            Marital Status
          </label>
          <select
            name="partnerMaritalStatus"
            value={formData.partnerMaritalStatus || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerMaritalStatus")}
          >
            <option value="">Select (optional)</option>
            {maritalStatusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {touchedFields.partnerMaritalStatus && validationErrors.partnerMaritalStatus && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerMaritalStatus}
            </p>
          )}
        </div>

        {/* MOTHER TONGUE (Optional) */}
        <div>
          <label style={labelStyle}>
            Mother Tongue
          </label>
          <input
            type="text"
            name="partnerMotherTongue"
            value={formData.partnerMotherTongue || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Mother tongue (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerMotherTongue")}
            maxLength={50}
          />
          {touchedFields.partnerMotherTongue && validationErrors.partnerMotherTongue && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerMotherTongue}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.partnerMotherTongue?.length || 0}/50 characters
          </p>
        </div>

        {/* ADDITIONAL PREFERENCES (Optional) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <label style={labelStyle}>
            Additional Preferences
          </label>
          <textarea
            name="partnerAdditionalPreferences"
            value={formData.partnerAdditionalPreferences || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Any other preferences (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={{
              ...getFieldStyle("partnerAdditionalPreferences"),
              minHeight: "80px"
            }}
            rows={3}
            maxLength={500}
          />
          {touchedFields.partnerAdditionalPreferences && validationErrors.partnerAdditionalPreferences && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.partnerAdditionalPreferences}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.partnerAdditionalPreferences?.length || 0}/500 characters
          </p>
        </div>

      </div>
    </div>
  );
};

export default Step5PartnerExpectations;