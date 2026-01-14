// import React, { useEffect, useState } from "react";
// import Stepper from "./Stepper";
// import {
//   useCreateEducationDetailsMutation,
//   useGetEducationDetailsQuery,
//   useUpdateEducationDetailsMutation,
// } from "../../context/createProfile";

// const Step3EducationDetails = ({
//   nextStep,
//   prevStep,
//   goToStep,
//   data,
//   setData,
//   step,
//   completedStep,
// }) => {
//   const [formData, setFormData] = useState(data || {});
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [hasExistingEducation, setHasExistingEducation] = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const [showRequiredAlert, setShowRequiredAlert] = useState(false);
//   const [missingFieldsList, setMissingFieldsList] = useState([]);

//   // RTK Query hooks
//   const [createEducationDetails] = useCreateEducationDetailsMutation();
//   const [updateEducationDetails] = useUpdateEducationDetailsMutation();

//   // GET API hook - Auto fetches on mount
//   const {
//     data: educationApiResponse,
//     isLoading: isFetching,
//     error: educationError,
//     isSuccess,
//     isError
//   } = useGetEducationDetailsQuery(undefined, {
//     refetchOnMountOrArgChange: false,
//   });

//   // Valid education options (based on Indian education system)
//   const validEducationOptions = [
//     "10th Pass (SSC)",
//     "12th Pass (HSC)",
//     "Diploma",
//     "ITI",
//     "Bachelor's Degree",
//     "Bachelor of Arts (BA)",
//     "Bachelor of Science (B.Sc)",
//     "Bachelor of Commerce (B.Com)",
//     "Bachelor of Engineering (B.E)",
//     "Bachelor of Technology (B.Tech)",
//     "Bachelor of Computer Applications (BCA)",
//     "Bachelor of Business Administration (BBA)",
//     "Bachelor of Architecture (B.Arch)",
//     "Bachelor of Pharmacy (B.Pharm)",
//     "Bachelor of Education (B.Ed)",
//     "Bachelor of Law (LLB)",
//     "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
//     "Master's Degree",
//     "Master of Arts (MA)",
//     "Master of Science (M.Sc)",
//     "Master of Commerce (M.Com)",
//     "Master of Engineering (M.E)",
//     "Master of Technology (M.Tech)",
//     "Master of Computer Applications (MCA)",
//     "Master of Business Administration (MBA)",
//     "Master of Architecture (M.Arch)",
//     "Master of Pharmacy (M.Pharm)",
//     "Master of Education (M.Ed)",
//     "Master of Law (LLM)",
//     "Doctor of Philosophy (PhD)",
//     "Doctorate",
//     "Post Doctorate",
//     "Chartered Accountant (CA)",
//     "Company Secretary (CS)",
//     "Cost and Management Accountant (CMA)",
//     "Chartered Financial Analyst (CFA)",
//     "Other"
//   ];

//   // Required fields based on backend DTO
//   const requiredKeys = [
//     "education",
//     "degree",
//     "occupation",
//     "incomePerYear",
//   ];

//   // Field display names for better error messages
//   const fieldDisplayNames = {
//     education: "Education Level",
//     degree: "Degree / Specialization",
//     occupation: "Occupation",
//     incomePerYear: "Annual Income",
//     occupationDetails: "Occupation Details",
//     experienceYears: "Experience Years",
//     companyName: "Company Name",
//     workLocation: "Work Location",
//     additionalDetails: "Additional Details"
//   };

//   // Income-experience validation rule (from backend)
//   const validateIncomeWithExperience = (income, experience) => {
//     const incomeNum = parseInt(income) || 0;
//     const experienceNum = parseInt(experience) || 0;
    
//     // Backend validation: income > 50L and experience < 2 years is invalid
//     if (incomeNum > 5000000 && experienceNum < 2) {
//       return false;
//     }
//     return true;
//   };

//   // Occupation details validation (from backend)
//   const validateOccupationDetails = (occupation, occupationDetails) => {
//     if (!occupation) return true;
    
//     const lowerOccupation = occupation.toLowerCase();
//     const requiresDetails = 
//       lowerOccupation.includes("engineer") || 
//       lowerOccupation.includes("manager") || 
//       lowerOccupation.includes("consultant") ||
//       lowerOccupation.includes("developer");
    
//     if (requiresDetails && (!occupationDetails || occupationDetails.trim() === "")) {
//       return false;
//     }
    
//     return true;
//   };

//   const isFormValid = requiredKeys.every(
//     (key) => formData[key] !== undefined && formData[key] !== ""
//   );

//   const [validationErrors, setValidationErrors] = useState({});

//   // LOAD DATA FROM GET API - Only run once
//   useEffect(() => {
//     if (educationApiResponse && !dataLoaded) {
//       console.log("Education fetch response:", educationApiResponse);

//       if (educationApiResponse.data) {
//         setHasExistingEducation(true);
//         const educationData = educationApiResponse.data;

//         // Transform backend data to form format
//         const transformedData = {
//           education: educationData.education || "",
//           degree: educationData.degree || "",
//           occupation: educationData.occupation || "",
//           occupationDetails: educationData.occupationDetails || "",
//           incomePerYear: educationData.incomePerYear ? educationData.incomePerYear.toString() : "",
//           additionalDetails: educationData.additionalDetails || "",
//           workLocation: educationData.workLocation || "",
//           companyName: educationData.companyName || "",
//           experienceYears: educationData.experienceYears ? educationData.experienceYears.toString() : "",
//         };

//         console.log("Education form data populated:", transformedData);

//         setFormData(transformedData);
//         setData(transformedData);
//         setDataLoaded(true);

//         setSuccessMessage("Education details loaded successfully");
//         setTimeout(() => setSuccessMessage(""), 3000);
//       }
//     }
//   }, [educationApiResponse, dataLoaded, setData]);

//   // Handle error state from the query
//   useEffect(() => {
//     if (educationError && !dataLoaded) {
//       console.log("Education fetch error:", educationError);

//       const errorData = educationError.data || {};
//       const errorMessageText = errorData.message || "";
//       const isEducationNotFound =
//         educationError.status === 404 ||
//         errorMessageText.includes("not found") ||
//         errorMessageText.includes("No education found") ||
//         errorMessageText.includes("EducationNotFoundException");

//       if (isEducationNotFound) {
//         setHasExistingEducation(false);
//         setDataLoaded(true);
//         setSuccessMessage(
//           "No existing education details found. Please create new ones."
//         );
//         setTimeout(() => setSuccessMessage(""), 3000);
//       } else if (educationError.status === 401 || educationError.status === 403) {
//         // setErrorMessage("Session expired. Please login again.");
//         setDataLoaded(true);
//       } else {
//         console.error("Unexpected error:", educationError);
//         // setErrorMessage("Failed to load education data");
//         setDataLoaded(true);
//       }
//     }
//   }, [educationError, dataLoaded]);

//   // Handle successful query with no data (new user)
//   useEffect(() => {
//     if (isSuccess && !educationApiResponse?.data && !dataLoaded) {
//       console.log("No education data found - new user");
//       setHasExistingEducation(false);
//       setDataLoaded(true);
//       setSuccessMessage(
//         "No existing education details found. Please create new ones."
//       );
//       setTimeout(() => setSuccessMessage(""), 3000);
//     }
//   }, [isSuccess, educationApiResponse, dataLoaded]);

//   const validateField = (name, value) => {
//     let err = "";
    
//     // Required field validation
//     if (requiredKeys.includes(name) && (!value || value.toString().trim() === "")) {
//       err = "This field is required";
//     } 
    
//     // Field-specific validations
//     else if (value && value.toString().trim() !== "") {
//       // Character length validations (from DTO)
//       if (name === "education" && value.length > 100) {
//         err = "Education cannot exceed 100 characters";
//       }
//       if (name === "degree" && value.length > 100) {
//         err = "Degree cannot exceed 100 characters";
//       }
//       if (name === "occupation" && value.length > 100) {
//         err = "Occupation cannot exceed 100 characters";
//       }
//       if (name === "occupationDetails" && value.length > 500) {
//         err = "Occupation details cannot exceed 500 characters";
//       }
//       if (name === "additionalDetails" && value.length > 1000) {
//         err = "Additional details cannot exceed 1000 characters";
//       }
//       if (name === "workLocation" && value.length > 100) {
//         err = "Work location cannot exceed 100 characters";
//       }
//       if (name === "companyName" && value.length > 200) {
//         err = "Company name cannot exceed 200 characters";
//       }
      
//       // ALPHABETS-ONLY VALIDATION for text fields
//       if (["degree", "occupation", "companyName", "workLocation"].includes(name)) {
//         // Allow alphabets, spaces, dots, commas, apostrophes, hyphens, and parentheses
//         const regex = /^[A-Za-z\s.,'()\-&]+$/;
//         if (!regex.test(value)) {
//           err = "Only alphabets, spaces, and basic punctuation (. , ' - & ( )) are allowed";
//         }
//       }
      
//       // OCCUPATION DETAILS - ONLY ALPHABETS (no numbers or special punctuation)
//       if (name === "occupationDetails") {
//         // Only alphabets and spaces allowed
//         const regex = /^[A-Za-z\s]+$/;
//         if (!regex.test(value)) {
//           err = "Only alphabets and spaces are allowed";
//         }
//       }
      
//       // For additionalDetails, allow more characters but still restrict special symbols
//       if (name === "additionalDetails") {
//         // Allow alphabets, numbers, spaces, and common punctuation
//         const regex = /^[A-Za-z0-9\s.,'()\-&!?;:"]+$/;
//         if (!regex.test(value)) {
//           err = "Only alphabets, numbers, spaces, and basic punctuation are allowed";
//         }
//       }
      
//       // Numeric validations
//       if (name === "incomePerYear") {
//         const incomeNum = parseInt(value);
//         if (isNaN(incomeNum) || incomeNum < 0) {
//           err = "Income must be a positive number";
//         } else if (incomeNum > 100000000) {
//           err = "Income cannot exceed ₹10,00,00,000 (100 million)";
//         }
//       }
      
//       if (name === "experienceYears") {
//         const expNum = parseInt(value);
//         if (isNaN(expNum) || expNum < 0) {
//           err = "Experience years cannot be negative";
//         } else if (expNum > 50) {
//           err = "Experience years cannot exceed 50";
//         }
//       }
//     }
    
//     setValidationErrors((prev) => ({ ...prev, [name]: err }));
//   };

//   // Validate income when experience changes
//   useEffect(() => {
//     if (formData.incomePerYear && formData.experienceYears) {
//       if (!validateIncomeWithExperience(formData.incomePerYear, formData.experienceYears)) {
//         setValidationErrors(prev => ({
//           ...prev,
//           incomePerYear: "Income > ₹50L requires minimum 2 years experience"
//         }));
//       } else {
//         // Clear the error if validation passes
//         setValidationErrors(prev => ({
//           ...prev,
//           incomePerYear: ""
//         }));
//       }
//     }
//   }, [formData.incomePerYear, formData.experienceYears]);

//   // Validate occupation details when occupation changes
//   useEffect(() => {
//     if (formData.occupation) {
//       const lowerOccupation = formData.occupation.toLowerCase();
//       const requiresDetails = 
//         lowerOccupation.includes("engineer") || 
//         lowerOccupation.includes("manager") || 
//         lowerOccupation.includes("consultant") ||
//         lowerOccupation.includes("developer");
      
//       if (requiresDetails && (!formData.occupationDetails || formData.occupationDetails.trim() === "")) {
//         setValidationErrors(prev => ({
//           ...prev,
//           occupationDetails: "Occupation details are required for this type of occupation"
//         }));
//       } else {
//         // Clear the error if not required or details are provided
//         setValidationErrors(prev => ({
//           ...prev,
//           occupationDetails: ""
//         }));
//       }
//     }
//   }, [formData.occupation, formData.occupationDetails]);

//   const validateAllFields = () => {
//     requiredKeys.forEach((key) => validateField(key, formData[key] || ""));
//     return !Object.values(validationErrors).some((err) => err);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Special handling for alphabets-only fields
//     if (["degree", "occupation", "companyName", "workLocation"].includes(name)) {
//       // Allow only alphabets, spaces, and basic punctuation
//       const filteredValue = value.replace(/[^A-Za-z\s.,'()\-&]/g, '');
//       const updatedData = { ...formData, [name]: filteredValue };
//       setFormData(updatedData);
//       setData(updatedData);
//       validateField(name, filteredValue);
//     } 
//     // For occupationDetails - ONLY ALPHABETS AND SPACES
//     else if (name === "occupationDetails") {
//       // Only allow alphabets and spaces
//       const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
//       const updatedData = { ...formData, [name]: filteredValue };
//       setFormData(updatedData);
//       setData(updatedData);
//       validateField(name, filteredValue);
//     }
//     // For additionalDetails
//     else if (name === "additionalDetails") {
//       // Allow alphabets, numbers, spaces, and common punctuation
//       const filteredValue = value.replace(/[^A-Za-z0-9\s.,'()\-&!?;:"]/g, '');
//       const updatedData = { ...formData, [name]: filteredValue };
//       setFormData(updatedData);
//       setData(updatedData);
//       validateField(name, filteredValue);
//     }
//     // For other fields
//     else {
//       const updatedData = { ...formData, [name]: value };
//       setFormData(updatedData);
//       setData(updatedData);
//       validateField(name, value);
//     }

//     if (errorMessage) setErrorMessage("");
//     if (showRequiredAlert) setShowRequiredAlert(false);
//   };

//   const prepareApiData = () => {
//     console.log("=== PREPARING EDUCATION API DATA ===");
//     console.log("Current form data:", formData);

//     // Parse numeric values (null for optional fields)
//     const incomeValue = formData.incomePerYear ? parseInt(formData.incomePerYear) : null;
//     const experienceYearsValue = formData.experienceYears ? parseInt(formData.experienceYears) : null;

//     // Prepare API data according to backend DTOs
//     const apiData = {
//       education: (formData.education || "").trim(),
//       degree: (formData.degree || "").trim(),
//       occupation: (formData.occupation || "").trim(),
//       occupationDetails: (formData.occupationDetails || "").trim(),
//       incomePerYear: incomeValue,
//       additionalDetails: (formData.additionalDetails || "").trim(),
//       workLocation: (formData.workLocation || "").trim(),
//       companyName: (formData.companyName || "").trim(),
//       experienceYears: experienceYearsValue,
//     };

//     // For PATCH request, include version if available
//     if (hasExistingEducation && educationApiResponse?.data?.version !== undefined) {
//       apiData.version = educationApiResponse.data.version;
//     }

//     console.log("=== FINAL EDUCATION API PAYLOAD ===");
//     console.log("API Data:", apiData);
//     console.log("JSON:", JSON.stringify(apiData, null, 2));

//     return apiData;
//   };

//   // Check for missing fields and show alert
//   const checkMissingFields = () => {
//     const missingFields = requiredKeys.filter(
//       (key) => !formData[key] || formData[key].toString().trim() === ""
//     );

//     if (missingFields.length > 0) {
//       const missingFieldNames = missingFields.map(field => fieldDisplayNames[field] || field);
//       setMissingFieldsList(missingFieldNames);
//       setShowRequiredAlert(true);
      
//       // Scroll to the alert
//       setTimeout(() => {
//         const alertElement = document.getElementById("required-fields-alert");
//         if (alertElement) {
//           alertElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//       }, 100);
      
//       return false;
//     }
//     return true;
//   };

//   // Handle form submission - FIXED VERSION
//   const handleNextClick = async () => {
//     console.log("=== EDUCATION FORM SUBMISSION STARTED ===");
//     console.log("nextStep function available:", typeof nextStep === 'function');
//     console.log("nextStep function:", nextStep);

//     // Check for missing fields first
//     if (!checkMissingFields()) {
//       return;
//     }

//     // Validate education is from recognized list
//     if (formData.education && !validEducationOptions.includes(formData.education)) {
//       setErrorMessage("Please select a recognized qualification from the dropdown list");
//       return;
//     }

//     // Validate alphabets-only for text fields
//     const alphabetFields = ["degree", "occupation", "companyName", "workLocation"];
//     for (const field of alphabetFields) {
//       if (formData[field] && formData[field].trim() !== "") {
//         const regex = /^[A-Za-z\s.,'()\-&]+$/;
//         if (!regex.test(formData[field])) {
//           setErrorMessage(`${fieldDisplayNames[field]} can only contain alphabets, spaces, and basic punctuation (. , ' - & ( ))`);
//           return;
//         }
//       }
//     }

//     // Validate occupationDetails - ONLY ALPHABETS AND SPACES
//     if (formData.occupationDetails && formData.occupationDetails.trim() !== "") {
//       const regex = /^[A-Za-z\s]+$/;
//       if (!regex.test(formData.occupationDetails)) {
//         setErrorMessage("Occupation Details can only contain alphabets and spaces");
//         return;
//       }
//     }

//     // Validate additionalDetails
//     if (formData.additionalDetails && formData.additionalDetails.trim() !== "") {
//       const regex = /^[A-Za-z0-9\s.,'()\-&!?;:"]+$/;
//       if (!regex.test(formData.additionalDetails)) {
//         setErrorMessage("Additional Details can only contain alphabets, numbers, spaces, and basic punctuation");
//         return;
//       }
//     }

//     // Validate income with experience (backend business rule)
//     const incomeNum = parseInt(formData.incomePerYear) || 0;
//     const experienceNum = parseInt(formData.experienceYears) || 0;
//     if (!validateIncomeWithExperience(incomeNum, experienceNum)) {
//       setErrorMessage("Income above ₹50,00,000 requires minimum 2 years of experience");
//       return;
//     }

//     // Validate occupation details (backend business rule)
//     if (!validateOccupationDetails(formData.occupation, formData.occupationDetails)) {
//       setErrorMessage("Occupation details are required for Engineer/Manager/Consultant/Developer roles");
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
//       setErrorMessage("Please login to save education data");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setErrorMessage("");
//       setSuccessMessage("");

//       const apiData = prepareApiData();
//       console.log("Sending to endpoint:", hasExistingEducation ? "PATCH /api/v1/education-profession/me" : "POST /api/v1/education-profession");

//       let response;

//       if (hasExistingEducation) {
//         response = await updateEducationDetails(apiData).unwrap();
//       } else {
//         response = await createEducationDetails(apiData).unwrap();
//       }

//       console.log("=== EDUCATION API RESPONSE DETAILS ===");
//       console.log("Full response:", response);
//       console.log("Response keys:", Object.keys(response));
//       console.log("Response statusCode:", response.statusCode);
//       console.log("Response code:", response.code);
//       console.log("Response success:", response.success);
//       console.log("Response data:", response.data);

//       // FIXED: Check for multiple response formats
//       const isSuccess = 
//         response.statusCode === 201 || 
//         response.statusCode === 200 || 
//         response.code === "201" || 
//         response.code === "200" ||
//         response.success === true ||
//         (response.data && (response.data.statusCode === 201 || response.data.statusCode === 200)) ||
//         response.message?.toLowerCase().includes("success");

//       if (isSuccess) {
//         const successMsg = hasExistingEducation
//           ? "Education details updated successfully!"
//           : "Education details created successfully!";
        
//         setSuccessMessage(successMsg);
//         console.log(successMsg);

//         // Clear any previous errors
//         setErrorMessage("");

//         // Move to next step - FIXED: Call nextStep immediately or with very short delay
//         console.log("Moving to next step from education form...");
        
//         // Option 2: Short timeout to show success message
//         setTimeout(() => {
//           console.log("Calling nextStep function...");
//           if (typeof nextStep === 'function') {
//             nextStep();
//           } else {
//             console.error("Error: nextStep is not a function!");
//             setErrorMessage("Navigation error. Please contact support.");
//           }
//         }, 1000); // Reduced from 1500 to 1000ms
        
//       } else {
//         const errorMsg = response.message || response.data?.message || "Failed to save education details";
//         setErrorMessage(errorMsg);
//         console.error("Save failed:", errorMsg);
//       }
//     } catch (error) {
//       console.error("=== EDUCATION API ERROR DETAILS ===");
//       console.error("Error status:", error.status);
//       console.error("Error data:", error.data);
//       console.error("Full error:", error);

//       let errorMsg = "Failed to save education details. Please try again.";

//       if (error.data) {
//         // Parse the specific error message from backend
//         if (error.data.message) {
//           errorMsg = error.data.message;
//           // Provide user-friendly explanations
//           if (errorMsg.includes("Education level should be a recognized qualification")) {
//             errorMsg = "Please select a recognized qualification from the dropdown list. Do not enter custom values.";
//           } else if (errorMsg.includes("Experience and income combination seems unrealistic")) {
//             errorMsg = "Income above ₹50,00,000 requires minimum 2 years of experience. Please adjust your income or experience.";
//           } else if (errorMsg.includes("Occupation details are required")) {
//             errorMsg = "Please provide occupation details for Engineer/Manager/Consultant/Developer roles.";
//           } else if (errorMsg.includes("Education field cannot be blank")) {
//             errorMsg = "Education level is required.";
//           } else if (errorMsg.includes("Degree cannot be blank")) {
//             errorMsg = "Degree/specialization is required.";
//           } else if (errorMsg.includes("Occupation cannot be blank")) {
//             errorMsg = "Occupation is required.";
//           } else if (errorMsg.includes("Income per year is required")) {
//             errorMsg = "Annual income is required.";
//           }
//         } else if (error.data.errors) {
//           const validationErrors = Object.entries(error.data.errors)
//             .map(([field, message]) => `${field}: ${message}`)
//             .join(', ');
//           errorMsg = `Validation errors: ${validationErrors}`;
//         } else if (error.data.title) {
//           errorMsg = error.data.title || "Invalid request data";
//           if (error.data.detail) {
//             errorMsg += `: ${error.data.detail}`;
//           }
//         } else if (error.data.error) {
//           errorMsg = error.data.error;
//         }
//       } else if (error.status === 400) {
//         errorMsg = "Invalid data. Please check all required fields are filled correctly.";
//       } else if (error.status === 409) {
//         errorMsg = "Education details already exist for this user.";
//       } else if (error.status === 404) {
//         errorMsg = "Education details not found.";
//       } else if (error.status === 500) {
//         errorMsg = "Server error. Please try again later.";
//       }

//       setErrorMessage(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fieldStyle = {
//     backgroundColor: "#FF8C4405",
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

//   // Check authentication first
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return (
//       <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
//         <div
//           className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
//           style={{ backgroundColor: "#FF8C4426" }}
//         >
//           <Stepper
//             step={step}
//             completedStep={completedStep}
//             goToStep={goToStep}
//           />
//         </div>
//         <div
//           className="px-4 sm:px-6 md:px-10 py-20 flex flex-col items-center justify-center"
//           style={{ backgroundColor: "#FF8C4405" }}
//         >
//           <div className="text-red-500 text-lg mb-4">
//             Authentication Required
//           </div>
//           <p className="text-gray-600 mb-6">
//             Please login to access your education data.
//           </p>
//           <button
//             onClick={() => (window.location.href = "/signin")}
//             className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (isFetching && !dataLoaded) {
//     return (
//       <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
//         <div
//           className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
//           style={{ backgroundColor: "#FF8C4426" }}
//         >
//           <Stepper
//             step={step}
//             completedStep={completedStep}
//             goToStep={goToStep}
//           />
//         </div>
//         <div
//           className="flex justify-center items-center h-64"
//           style={{ backgroundColor: "#FF8C4405" }}
//         >
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//           <span className="ml-3">Loading education data...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
//       {/* STEP HEADER */}
//       <div
//         className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
//         style={{ backgroundColor: "#FF8C4426" }}
//       >
//         <Stepper
//           step={step}
//           completedStep={completedStep}
//           goToStep={goToStep}
//         />
//       </div>

//       {/* MAIN FORM BOX */}
//       <div
//         className="px-4 sm:px-6 md:px-10 py-8"
//         style={{ backgroundColor: "#FF8C4405" }}
//       >
//         {/* Required Fields Alert - RED BOX */}
//         {showRequiredAlert && (
//           <div 
//             id="required-fields-alert"
//             className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg"
//           >
//             <div className="flex items-start">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-red-800">
//                   Please fill all required fields
//                 </h3>
//                 <div className="mt-2 text-sm text-red-700">
//                   <p>The following required fields are missing:</p>
//                   <ul className="list-disc pl-5 mt-1">
//                     {missingFieldsList.map((fieldName, index) => (
//                       <li key={index}>{fieldName}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="mt-2">
//                   <button
//                     type="button"
//                     onClick={() => setShowRequiredAlert(false)}
//                     className="text-sm bg-red-100 hover:bg-red-200 text-red-800 font-medium py-1 px-3 rounded"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Status Messages */}
//         {successMessage && (
//           <div
//             className={`mb-6 p-3 rounded-md ${hasExistingEducation
//                 ? "bg-green-50 border border-green-200 text-green-600"
//                 : "bg-blue-50 border border-blue-200 text-blue-600"
//               }`}
//           >
//             <p className="text-sm text-center">{successMessage}</p>
//           </div>
//         )}

//         {errorMessage && (
//           <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
//             <p className="text-red-600 text-sm text-center">{errorMessage}</p>
//           </div>
//         )}

//         <h3 className="text-center text-orange-400 font-[Inter] font-semibold uppercase mb-8 tracking-wide text-xl">
//           Education & Professional Details
//         </h3>

//         {/* FORM GRID */}
//         <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-700">
//           {/* EDUCATION */}
//           <div>
//             <label style={labelStyle}>Education Level <span style={{ color: "red" }}>*</span></label>
//             <select
//               required
//               name="education"
//               value={formData.education || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.education ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//             >
//               <option value="">Select Education</option>
//               {validEducationOptions.map((edu) => (
//                 <option key={edu} value={edu}>{edu}</option>
//               ))}
//             </select>
//             {validationErrors.education && (
//               <p className="text-red-500 text-xs">{validationErrors.education}</p>
//             )}
//             <p className="text-xs text-gray-500 mt-1">
//               Must select from recognized qualifications
//             </p>
//           </div>

//           {/* DEGREE */}
//           <div className="sm:col-span-2 md:col-span-3">
//             <label style={labelStyle}>Degree / Specialization <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="degree"
//               value={formData.degree || ""}
//               onChange={handleChange}
//               placeholder="e.g., Computer Science Engineering, MBA Finance"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.degree ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               maxLength={100}
//             />
//             {validationErrors.degree && (
//               <p className="text-red-500 text-xs">{validationErrors.degree}</p>
//             )}
//             <p className="text-xs text-gray-500 mt-1">
//               Only alphabets, spaces, and basic punctuation (. , ' - & ( )) allowed
//             </p>
//           </div>

//           {/* OCCUPATION */}
//           <div>
//             <label style={labelStyle}>Occupation <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="occupation"
//               value={formData.occupation || ""}
//               onChange={handleChange}
//               placeholder="e.g., Software Engineer, Business Owner"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.occupation ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               maxLength={100}
//             />
//             {validationErrors.occupation && (
//               <p className="text-red-500 text-xs">{validationErrors.occupation}</p>
//             )}
//             <p className="text-xs text-gray-500 mt-1">
//               Note: Engineer/Manager/Consultant/Developer roles require details
//             </p>
//             <p className="text-xs text-gray-500">
//               Only alphabets, spaces, and basic punctuation (. , ' - & ( )) allowed
//             </p>
//           </div>

//           {/* OCCUPATION DETAILS */}
//           <div className="sm:col-span-2 md:col-span-3">
//             <label style={labelStyle}>Occupation Details</label>
//             <textarea
//               name="occupationDetails"
//               value={formData.occupationDetails || ""}
//               onChange={handleChange}
//               placeholder="Describe your role, responsibilities, etc. (Required for Engineer/Manager/Consultant/Developer)"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none resize-none"
//               style={{
//                 ...fieldStyle,
//                 height: "80px",
//                 border: validationErrors.occupationDetails ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               maxLength={500}
//             />
//             {validationErrors.occupationDetails && (
//               <p className="text-red-500 text-xs">{validationErrors.occupationDetails}</p>
//             )}
//             <p className="text-xs text-gray-500 mt-1">
//               {formData.occupationDetails?.length || 0}/500 characters
//             </p>
//             <p className="text-xs text-gray-500">
//               Only alphabets and spaces allowed
//             </p>
//           </div>

//           {/* EXPERIENCE YEARS */}
//           <div>
//             <label style={labelStyle}>Experience (Years)</label>
//             <input
//               type="number"
//               name="experienceYears"
//               value={formData.experienceYears || ""}
//               onChange={handleChange}
//               placeholder="e.g., 5"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.experienceYears ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               min="0"
//               max="50"
//             />
//             {validationErrors.experienceYears && (
//               <p className="text-red-500 text-xs">{validationErrors.experienceYears}</p>
//             )}
//           </div>

//           {/* INCOME PER YEAR */}
//           <div>
//             <label style={labelStyle}>Annual Income (₹) <span style={{ color: "red" }}>*</span></label>
//             <select
//               required
//               name="incomePerYear"
//               value={formData.incomePerYear || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.incomePerYear ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//             >
//               <option value="">Select Income</option>
//               <option value="0">Not Applicable / Student</option>
//               <option value="200000">2 Lakh</option>
//               <option value="300000">3 Lakh</option>
//               <option value="400000">4 Lakh</option>
//               <option value="500000">5 Lakh</option>
//               <option value="600000">6 Lakh</option>
//               <option value="700000">7 Lakh</option>
//               <option value="800000">8 Lakh</option>
//               <option value="900000">9 Lakh</option>
//               <option value="1000000">10 Lakh</option>
//               <option value="1500000">15 Lakh</option>
//               <option value="2000000">20 Lakh</option>
//               <option value="2500000">25 Lakh</option>
//               <option value="3000000">30 Lakh</option>
//               <option value="4000000">40 Lakh</option>
//               <option value="5000000">50 Lakh</option>
//               <option value="7500000">75 Lakh</option>
//               <option value="10000000">1 Crore</option>
//               <option value="15000000">1.5 Crore</option>
//               <option value="20000000">2 Crore</option>
//               <option value="30000000">3 Crore</option>
//               <option value="50000000">5 Crore</option>
//               <option value="100000000">10 Crore</option>
//             </select>
//             {validationErrors.incomePerYear && (
//               <p className="text-red-500 text-xs">{validationErrors.incomePerYear}</p>
//             )}
//             {formData.experienceYears && formData.incomePerYear && parseInt(formData.incomePerYear) > 5000000 && (
//               <p className="text-xs text-yellow-600 mt-1">
//                 Note: Income &gt; ₹50L requires minimum 2 years experience
//               </p>
//             )}
//           </div>

//           {/* COMPANY NAME */}
//           <div>
//             <label style={labelStyle}>Company / Organization</label>
//             <input
//               type="text"
//               name="companyName"
//               value={formData.companyName || ""}
//               onChange={handleChange}
//               placeholder="e.g., Google, TCS, Self-employed"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.companyName ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               maxLength={200}
//             />
//             {validationErrors.companyName && (
//               <p className="text-red-500 text-xs">{validationErrors.companyName}</p>
//             )}
//             <p className="text-xs text-gray-500 mt-1">
//               Only alphabets, spaces, and basic punctuation (. , ' - & ( )) allowed
//             </p>
//           </div>

//           {/* WORK LOCATION */}
//           <div>
//             <label style={labelStyle}>Work Location</label>
//             <input
//               type="text"
//               name="workLocation"
//               value={formData.workLocation || ""}
//               onChange={handleChange}
//               placeholder="e.g., Mumbai, Remote"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.workLocation ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               maxLength={100}
//             />
//             {validationErrors.workLocation && (
//               <p className="text-red-500 text-xs">{validationErrors.workLocation}</p>
//             )}
//             <p className="text-xs text-gray-500 mt-1">
//               Only alphabets, spaces, and basic punctuation (. , ' - & ( )) allowed
//             </p>
//           </div>

//           {/* ADDITIONAL DETAILS */}
//           <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
//             <label style={labelStyle}>Additional Details</label>
//             <textarea
//               name="additionalDetails"
//               value={formData.additionalDetails || ""}
//               onChange={handleChange}
//               placeholder="Any additional information about your education or profession"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none resize-none"
//               style={{
//                 ...fieldStyle,
//                 height: "100px",
//                 border: validationErrors.additionalDetails ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               maxLength={1000}
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               {formData.additionalDetails?.length || 0}/1000 characters
//             </p>
//             <p className="text-xs text-gray-500">
//               Only alphabets, numbers, spaces, and basic punctuation allowed
//             </p>
//           </div>
//         </form>
//       </div>

//       {/* BUTTON ROW */}
//       <div
//         className="border-gray-300 flex justify-end items-center gap-4 py-4 px-4 sm:px-6 md:px-10"
//         style={{ backgroundColor: "#FF8C4405" }}
//       >
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
//           className={`px-10 py-3 rounded-xl text-white flex items-center justify-center ${isFormValid && !isLoading
//               ? "bg-orange-400 hover:bg-orange-500"
//               : "bg-gray-400 cursor-not-allowed"
//             }`}
//         >
//           {isLoading ? (
//             <>
//               <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
//               {hasExistingEducation ? "Updating..." : "Creating..."}
//             </>
//           ) : (
//             "Save & Next"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step3EducationDetails;




















// components/registration/steps/Step3EducationDetails.jsx
import React, { useState } from "react";

const Step3EducationDetails = ({ formData, onInputChange, onNext, onBack }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Valid education options
  const validEducationOptions = [
    "10th Pass (SSC)",
    "12th Pass (HSC)",
    "Diploma",
    "ITI",
    "Bachelor's Degree",
    "Bachelor of Arts (BA)",
    "Bachelor of Science (B.Sc)",
    "Bachelor of Commerce (B.Com)",
    "Bachelor of Engineering (B.E)",
    "Bachelor of Technology (B.Tech)",
    "Bachelor of Computer Applications (BCA)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Architecture (B.Arch)",
    "Bachelor of Pharmacy (B.Pharm)",
    "Bachelor of Education (B.Ed)",
    "Bachelor of Law (LLB)",
    "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
    "Master's Degree",
    "Master of Arts (MA)",
    "Master of Science (M.Sc)",
    "Master of Commerce (M.Com)",
    "Master of Engineering (M.E)",
    "Master of Technology (M.Tech)",
    "Master of Computer Applications (MCA)",
    "Master of Business Administration (MBA)",
    "Master of Architecture (M.Arch)",
    "Master of Pharmacy (M.Pharm)",
    "Master of Education (M.Ed)",
    "Master of Law (LLM)",
    "Doctor of Philosophy (PhD)",
    "Doctorate",
    "Post Doctorate",
    "Chartered Accountant (CA)",
    "Company Secretary (CS)",
    "Cost and Management Accountant (CMA)",
    "Chartered Financial Analyst (CFA)",
    "Other"
  ];

  // Income options
  const incomeOptions = [
    { value: "0", label: "Not Applicable / Student" },
    { value: "200000", label: "2 Lakh" },
    { value: "300000", label: "3 Lakh" },
    { value: "400000", label: "4 Lakh" },
    { value: "500000", label: "5 Lakh" },
    { value: "600000", label: "6 Lakh" },
    { value: "700000", label: "7 Lakh" },
    { value: "800000", label: "8 Lakh" },
    { value: "900000", label: "9 Lakh" },
    { value: "1000000", label: "10 Lakh" },
    { value: "1500000", label: "15 Lakh" },
    { value: "2000000", label: "20 Lakh" },
    { value: "2500000", label: "25 Lakh" },
    { value: "3000000", label: "30 Lakh" },
    { value: "4000000", label: "40 Lakh" },
    { value: "5000000", label: "50 Lakh" },
    { value: "7500000", label: "75 Lakh" },
    { value: "10000000", label: "1 Crore" },
    { value: "15000000", label: "1.5 Crore" },
    { value: "20000000", label: "2 Crore" },
    { value: "30000000", label: "3 Crore" },
    { value: "50000000", label: "5 Crore" },
    { value: "100000000", label: "10 Crore" }
  ];

  // Required fields
  const requiredFields = [
    "education", "degree", "occupation", "incomePerYear"
  ];

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";
    
    if (!value || value.toString().trim() === "") {
      if (requiredFields.includes(name)) {
        error = "This field is required";
      }
    } else {
      switch(name) {
        case "education":
          if (!validEducationOptions.includes(value)) {
            error = "Please select a valid education option";
          }
          break;
          
        case "degree":
          if (value.length > 100) {
            error = "Cannot exceed 100 characters";
          } else if (!/^[A-Za-z\s.,'()\-&]+$/.test(value)) {
            error = "Only alphabets, spaces, and basic punctuation (. , ' - & ( )) allowed";
          }
          break;
          
        case "occupation":
          if (value.length > 100) {
            error = "Cannot exceed 100 characters";
          } else if (!/^[A-Za-z\s.,'()\-&]+$/.test(value)) {
            error = "Only alphabets, spaces, and basic punctuation (. , ' - & ( )) allowed";
          }
          break;
          
        case "occupationDetails":
          if (value.length > 500) {
            error = "Cannot exceed 500 characters";
          } else if (!/^[A-Za-z\s]+$/.test(value)) {
            error = "Only alphabets and spaces allowed";
          }
          break;
          
        case "experienceYears":
          const expNum = parseInt(value);
          if (isNaN(expNum) || expNum < 0) {
            error = "Experience years cannot be negative";
          } else if (expNum > 50) {
            error = "Experience years cannot exceed 50";
          }
          break;
          
        case "incomePerYear":
          const incomeNum = parseInt(value);
          if (isNaN(incomeNum) || incomeNum < 0) {
            error = "Income must be a positive number";
          } else if (incomeNum > 100000000) {
            error = "Income cannot exceed ₹10,00,00,000";
          }
          break;
          
        case "companyName":
          if (value.length > 200) {
            error = "Cannot exceed 200 characters";
          } else if (!/^[A-Za-z\s.,'()\-&]+$/.test(value)) {
            error = "Only alphabets, spaces, and basic punctuation (. , ' - & ( )) allowed";
          }
          break;
          
        case "workLocation":
          if (value.length > 100) {
            error = "Cannot exceed 100 characters";
          } else if (!/^[A-Za-z\s.,'()\-&]+$/.test(value)) {
            error = "Only alphabets, spaces, and basic punctuation (. , ' - & ( )) allowed";
          }
          break;
          
        case "additionalDetails":
          if (value.length > 1000) {
            error = "Cannot exceed 1000 characters";
          }
          break;
          
        default:
          break;
      }
    }
    
    return error;
  };

  // Validate income with experience
  const validateIncomeWithExperience = (income, experience) => {
    const incomeNum = parseInt(income) || 0;
    const experienceNum = parseInt(experience) || 0;
    
    if (incomeNum > 5000000 && experienceNum < 2) {
      return "Income > ₹50L requires minimum 2 years experience";
    }
    return "";
  };

  // Validate occupation details
  const validateOccupationDetails = (occupation, occupationDetails) => {
    if (!occupation) return "";
    
    const lowerOccupation = occupation.toLowerCase();
    const requiresDetails = 
      lowerOccupation.includes("engineer") || 
      lowerOccupation.includes("manager") || 
      lowerOccupation.includes("consultant") ||
      lowerOccupation.includes("developer");
    
    if (requiresDetails && (!occupationDetails || occupationDetails.trim() === "")) {
      return "Occupation details are required for Engineer/Manager/Consultant/Developer roles";
    }
    
    return "";
  };

  // Validate all required fields
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate required fields
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
      "occupationDetails",
      "experienceYears",
      "companyName",
      "workLocation",
      "additionalDetails"
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

    // Validate income-experience rule
    if (formData.incomePerYear && formData.experienceYears) {
      const incomeExpError = validateIncomeWithExperience(formData.incomePerYear, formData.experienceYears);
      if (incomeExpError) {
        newErrors.incomePerYear = incomeExpError;
        isValid = false;
      }
    }

    // Validate occupation details rule
    if (formData.occupation) {
      const occupationError = validateOccupationDetails(formData.occupation, formData.occupationDetails);
      if (occupationError) {
        newErrors.occupationDetails = occupationError;
        isValid = false;
      }
    }

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
    
    // Special handling for alphabets-only fields
    if (["degree", "occupation", "companyName", "workLocation"].includes(name)) {
      processedValue = value.replace(/[^A-Za-z\s.,'()\-&]/g, '');
    } 
    // For occupationDetails - ONLY ALPHABETS AND SPACES
    else if (name === "occupationDetails") {
      processedValue = value.replace(/[^A-Za-z\s]/g, '');
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
          Education & Professional Details
        </h3>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm text-gray-700 mt-2 p-3" style={{ backgroundColor: "#FDF8FF" }}>
        
        {/* EDUCATION */}
        <div>
          <label style={labelStyle}>
            Education Level <span className="text-red-500">*</span>
          </label>
          <select
            name="education"
            value={formData.education || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("education")}
          >
            <option value="">Select Education</option>
            {validEducationOptions.map((edu) => (
              <option key={edu} value={edu}>{edu}</option>
            ))}
          </select>
          {touchedFields.education && validationErrors.education && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.education}
            </p>
          )}
        </div>

        {/* DEGREE */}
        <div className="sm:col-span-2">
          <label style={labelStyle}>
            Degree / Specialization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="degree"
            value={formData.degree || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., Computer Science Engineering, MBA Finance"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("degree")}
            maxLength={100}
          />
          {touchedFields.degree && validationErrors.degree && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.degree}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.degree?.length || 0}/100 characters
          </p>
        </div>

        {/* OCCUPATION */}
        <div>
          <label style={labelStyle}>
            Occupation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., Software Engineer, Business Owner"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("occupation")}
            maxLength={100}
          />
          {touchedFields.occupation && validationErrors.occupation && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.occupation}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.occupation?.length || 0}/100 characters
          </p>
        </div>

        {/* OCCUPATION DETAILS */}
        <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
          <label style={labelStyle}>
            Occupation Details
          </label>
          <textarea
            name="occupationDetails"
            value={formData.occupationDetails || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe your role, responsibilities, etc. (Required for Engineer/Manager/Consultant/Developer)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none resize-none"
            style={{
              ...getFieldStyle("occupationDetails"),
              height: "80px"
            }}
            maxLength={500}
          />
          {touchedFields.occupationDetails && validationErrors.occupationDetails && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.occupationDetails}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.occupationDetails?.length || 0}/500 characters (Only alphabets and spaces)
          </p>
        </div>

        {/* EXPERIENCE YEARS */}
        <div>
          <label style={labelStyle}>
            Experience (Years)
          </label>
          <input
            type="number"
            name="experienceYears"
            value={formData.experienceYears || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., 5"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("experienceYears")}
            min="0"
            max="50"
          />
          {touchedFields.experienceYears && validationErrors.experienceYears && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.experienceYears}
            </p>
          )}
        </div>

        {/* INCOME PER YEAR */}
        <div>
          <label style={labelStyle}>
            Annual Income (₹) <span className="text-red-500">*</span>
          </label>
          <select
            name="incomePerYear"
            value={formData.incomePerYear || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("incomePerYear")}
          >
            <option value="">Select Income</option>
            {incomeOptions.map((income) => (
              <option key={income.value} value={income.value}>
                {income.label}
              </option>
            ))}
          </select>
          {touchedFields.incomePerYear && validationErrors.incomePerYear && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.incomePerYear}
            </p>
          )}
        </div>

        {/* COMPANY NAME */}
        <div>
          <label style={labelStyle}>
            Company / Organization
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., Google, TCS, Self-employed"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("companyName")}
            maxLength={200}
          />
          {touchedFields.companyName && validationErrors.companyName && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.companyName}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.companyName?.length || 0}/200 characters
          </p>
        </div>

        {/* WORK LOCATION */}
        <div>
          <label style={labelStyle}>
            Work Location
          </label>
          <input
            type="text"
            name="workLocation"
            value={formData.workLocation || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., Mumbai, Remote"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("workLocation")}
            maxLength={100}
          />
          {touchedFields.workLocation && validationErrors.workLocation && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.workLocation}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.workLocation?.length || 0}/100 characters
          </p>
        </div>

        {/* ADDITIONAL DETAILS */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <label style={labelStyle}>
            Additional Details
          </label>
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Any additional information about your education or profession"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none resize-none"
            style={{
              ...getFieldStyle("additionalDetails"),
              height: "100px"
            }}
            maxLength={1000}
          />
          {touchedFields.additionalDetails && validationErrors.additionalDetails && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.additionalDetails}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.additionalDetails?.length || 0}/1000 characters
          </p>
        </div>

      </div>
    </div>
  );
};

export default Step3EducationDetails;