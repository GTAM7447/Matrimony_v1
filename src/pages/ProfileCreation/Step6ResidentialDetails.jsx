// import React, { useState, useEffect, useRef } from "react";
// import { Country, State, City } from "country-state-city";
// import Stepper from "./Stepper";
// import {
//   useCreateResidentialDetailsMutation,
//   useGetResidentialDetailsQuery,
//   useUpdateResidentialDetailsMutation,
// } from "../../context/createProfile";

// const Step6ResidentialDetails = ({
//   nextStep,
//   prevStep,
//   goToStep,
//   data,
//   setData,
//   step,
//   completedStep,
//   hasDataForStep,
// }) => {
//   const autoNextRef = useRef(false);
//   const apiLoadedRef = useRef(false);

//   // Add states for country-state-city data
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [formData, setFormData] = useState(data || {});

//   /* -------------------- API HOOKS -------------------- */
//   const [createResidentialDetails] = useCreateResidentialDetailsMutation();
//   const [updateResidentialDetails] = useUpdateResidentialDetailsMutation();

//   const {
//     data: res,
//     error: residentialError,
//     isLoading: isFetching,
//     isSuccess,
//     refetch,
//   } = useGetResidentialDetailsQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   const apiData = res?.data;

//   /* STATE */
//   const [hasExistingContact, setHasExistingContact] = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const [version, setVersion] = useState(0);

//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [validationErrors, setValidationErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   // Required fields according to backend DTO
//   const requiredKeys = [
//     "fullAddress",
//     "city", 
//     "country",
//     "pinCode",
//     "mobileNumber",
//     "contactVisibility"
//   ];

//   /*  COUNTRY-STATE-CITY LOGIC  */
//   useEffect(() => {
//     const allCountries = Country.getAllCountries();
//     const sortedCountries = allCountries.sort((a, b) => 
//       a.name.localeCompare(b.name)
//     );
//     setCountries(sortedCountries);
    
//     // Set default country to India if not already set
//     if (!formData.country) {
//       const defaultCountry = sortedCountries.find(c => c.name === "India");
//       if (defaultCountry) {
//         const updatedData = { ...formData, country: "India", countryCode: "IN" };
//         setFormData(updatedData);
//         setData(updatedData);
        
//         // Load Indian states
//         const indiaStates = State.getStatesOfCountry("IN");
//         const sortedStates = indiaStates.sort((a, b) => a.name.localeCompare(b.name));
//         setStates(sortedStates);
        
//         // Load Indian cities (from Maharashtra by default)
//         const maharashtraCities = City.getCitiesOfState("IN", "MH");
//         const sortedCities = maharashtraCities.sort((a, b) => a.name.localeCompare(b.name));
//         setCities(sortedCities);
//       }
//     }
    
//   }, []);

//   // When country changes, load its states
//   useEffect(() => {
//     if (!formData.countryCode) return;

//     const countryStates = State.getStatesOfCountry(formData.countryCode);
//     const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
//     setStates(sortedStates);
    
//     // Clear cities when country changes
//     setCities([]);
    
//     if (!apiLoadedRef.current) {
//       const updated = { ...formData, state: "", stateCode: "", city: "" };
//       setFormData(updated);
//       setData(updated);
//     }
//   }, [formData.countryCode]);

//   // When state changes, load its cities
//   useEffect(() => {
//     if (!formData.countryCode || !formData.stateCode) {
//       setCities([]);
//       return;
//     }

//     const stateCities = City.getCitiesOfState(formData.countryCode, formData.stateCode);
//     const sortedCities = stateCities.sort((a, b) => a.name.localeCompare(b.name));
//     setCities(sortedCities);
    
//     // Clear city when state changes
//     if (!apiLoadedRef.current) {
//       const updated = { ...formData, city: "" };
//       setFormData(updated);
//       setData(updated);
//     }
//   }, [formData.countryCode, formData.stateCode]);

//   // AFTER countries load, map backend values properly
//   useEffect(() => {
//     if (!apiData || !countries.length) return;

//     const countryObj = countries.find(c => c.name === apiData.country);
//     if (!countryObj) return;

//     apiLoadedRef.current = true;

//     const updated = {
//       ...formData,
//       country: countryObj.name,
//       countryCode: countryObj.isoCode
//     };

//     const stateObj = State.getStatesOfCountry(countryObj.isoCode)
//       .find(s => s.name === apiData.state);

//     if (stateObj) {
//       updated.state = stateObj.name;
//       updated.stateCode = stateObj.isoCode;
      
//       // Load cities for this state
//       const stateCities = City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode);
//       const sortedCities = stateCities.sort((a, b) => a.name.localeCompare(b.name));
//       setCities(sortedCities);
//     }

//     updated.city = apiData.city || "";

//     setFormData(updated);
//     setData(updated);
//   }, [countries, apiData]);

//   // AUTO-NEXT LOGIC: Load data from API and auto-navigate if step is sequential
//   useEffect(() => {
//     if (!isSuccess || !apiData) return;
//     if (apiLoadedRef.current) return;

//     apiLoadedRef.current = true;

//     console.log("Contact fetch response:", apiData);

//     if (apiData) {
//       setHasExistingContact(true);
//       const contactData = apiData;
      
//       // Store version for optimistic locking
//       if (contactData.version) {
//         setVersion(contactData.version);
//       }

//       // Transform backend data to form format
//       const transformedData = {
//         fullAddress: contactData.fullAddress || "",
//         streetAddress: contactData.streetAddress || "",
//         city: contactData.city || "",
//         state: contactData.state || "",
//         country: contactData.country || "",
//         pinCode: contactData.pinCode || "",
//         mobileNumber: contactData.mobileNumber || "",
//         alternateNumber: contactData.alternateNumber || "",
//         whatsappNumber: contactData.whatsappNumber || "",
//         emailAddress: contactData.emailAddress || "",
//         emergencyContactName: contactData.emergencyContactName || "",
//         emergencyContactNumber: contactData.emergencyContactNumber || "",
//         emergencyContactRelation: contactData.emergencyContactRelation || "",
//         preferredContactMethod: contactData.preferredContactMethod || "",
//         contactVisibility: contactData.contactVisibility || "PRIVATE",
//       };

//       console.log("Contact form data populated:", transformedData);

//       // ✅ ALWAYS load data
//       setFormData(transformedData);
//       setData(transformedData);
//       setDataLoaded(true);

//       // ✅ auto-next only once and only in sequence
//       if (
//         !autoNextRef.current &&
//         Object.keys(transformedData).length > 0 &&
//         step === completedStep + 1
//       ) {
//         autoNextRef.current = true;
//         setTimeout(() => {
//           console.log("Auto-navigating to next step...");
//           nextStep();
//         }, 0);
//       }

//       // Find country code for the loaded country
//       if (transformedData.country) {
//         const countryObj = countries.find(c => c.name === transformedData.country);
//         if (countryObj) {
//           const updatedData = { 
//             ...transformedData, 
//             countryCode: countryObj.isoCode 
//           };
//           setFormData(updatedData);
//           setData(updatedData);
          
//           // Load states for this country
//           const countryStates = State.getStatesOfCountry(countryObj.isoCode);
//           const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
//           setStates(sortedStates);
          
//           // Load cities if state is available
//           if (transformedData.state) {
//             const stateObj = sortedStates.find(s => s.name === transformedData.state);
//             if (stateObj) {
//               const stateCities = City.getCitiesOfCountry(countryObj.isoCode)
//                 .filter(city => city.stateCode === stateObj.isoCode);
//               const sortedCities = stateCities.sort((a, b) => a.name.localeCompare(b.name));
//               setCities(sortedCities);
//             }
//           }
//         }
//       }

//       setSuccessMessage("Contact details loaded successfully");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     }
//   }, [isSuccess, apiData, step, completedStep, nextStep, setData, countries]);

//   // 404 = new user
//   useEffect(() => {
//     if (residentialError?.status === 404 && !dataLoaded) {
//       apiLoadedRef.current = true;
//       setHasExistingContact(false);
//       setDataLoaded(true);
//       setSuccessMessage("No existing contact details found. Please create new ones.");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     }
//   }, [residentialError, dataLoaded]);

//   // Handle successful query with no data (new user)
//   useEffect(() => {
//     if (isSuccess && !apiData && !dataLoaded) {
//       apiLoadedRef.current = true;
//       console.log("No contact data found - new user");
//       setHasExistingContact(false);
//       setDataLoaded(true);
//       setSuccessMessage("No existing contact details found. Please create new ones.");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     }
//   }, [isSuccess, apiData, dataLoaded]);

//   /*  VALIDATION  */
//   const validateField = (name, value) => {
//     let err = "";
//     const trimmedValue = value ? value.toString().trim() : "";
    
//     // Check required fields
//     if (requiredKeys.includes(name) && trimmedValue === "") {
//       err = "This field is required";
//     } else if (trimmedValue !== "") {
//       switch (name) {
//         case "fullAddress":
//           if (trimmedValue.length < 10) {
//             err = "Address must be at least 10 characters";
//           }
//           break;
          
//         case "streetAddress":
//           if (!/^[A-Za-z0-9\s\-.,#]+$/.test(trimmedValue)) {
//             err = "Only letters, numbers, spaces, hyphens, dots, commas and # allowed";
//           }
//           break;
          
//         case "city":
//           if (trimmedValue === "Other") {
//             // If "Other" is selected, check if full address contains city details
//             if (!formData.fullAddress || formData.fullAddress.trim().length < 10) {
//               err = "Please specify city in the full address field";
//             }
//           } else if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
//             err = "Only alphabets, spaces, dots and hyphens allowed";
//           }
//           break;
          
//         case "state":
//           if (trimmedValue && !/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
//             err = "Only alphabets, spaces, dots and hyphens allowed";
//           }
//           break;
          
//         case "country":
//           if (trimmedValue && !countries.find(c => c.name === trimmedValue)) {
//             err = "Please select a valid country from the list";
//           }
//           break;
          
//         case "pinCode":
//           if (!/^\d{6}$/.test(trimmedValue)) {
//             err = "Enter valid 6-digit PIN code";
//           }
//           break;
          
//         case "mobileNumber":
//           const cleanMobile = trimmedValue.replace(/[\s()-]/g, '');
//           if (!/^[+]?[0-9]{10,15}$/.test(cleanMobile)) {
//             err = "Enter valid 10-15 digit phone number";
//           }
//           break;
          
//         case "alternateNumber":
//           const cleanAlt = trimmedValue.replace(/[\s()-]/g, '');
//           if (cleanAlt && !/^[+]?[0-9]{10,15}$/.test(cleanAlt)) {
//             err = "Enter valid 10-15 digit phone number";
//           }
//           break;
          
//         case "whatsappNumber":
//           const cleanWhatsapp = trimmedValue.replace(/[\s()-]/g, '');
//           if (cleanWhatsapp && !/^[+]?[0-9]{10,15}$/.test(cleanWhatsapp)) {
//             err = "Enter valid 10-15 digit phone number";
//           }
//           break;
          
//         case "emailAddress":
//           if (trimmedValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
//             err = "Enter valid email address";
//           }
//           break;
          
//         case "emergencyContactName":
//           if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
//             err = "Only alphabets, spaces, dots and hyphens allowed";
//           }
//           break;
          
//         case "emergencyContactNumber":
//           const cleanEmergency = trimmedValue.replace(/[\s()-]/g, '');
//           if (cleanEmergency && !/^[+]?[0-9]{10,15}$/.test(cleanEmergency)) {
//             err = "Enter valid 10-15 digit phone number";
//           }
//           break;
          
//         case "emergencyContactRelation":
//           if (trimmedValue && !/^[A-Za-z\s]+$/.test(trimmedValue)) {
//             err = "Only alphabets and spaces allowed";
//           }
//           break;
          
//         case "preferredContactMethod":
//           if (trimmedValue && !/^[A-Za-z\s]+$/.test(trimmedValue)) {
//             err = "Only alphabets and spaces allowed";
//           }
//           break;
          
//         case "contactVisibility":
//           if (!["PRIVATE", "MEMBERS_ONLY", "PUBLIC"].includes(trimmedValue)) {
//             err = "Please select a valid visibility option";
//           }
//           break;
          
//         default:
//           break;
//       }
//     }
    
//     setValidationErrors((prev) => ({ ...prev, [name]: err }));
//     return err;
//   };

//   // Check if form is valid whenever formData changes
//   useEffect(() => {
//     // First, check all required fields are filled
//     const allRequiredFilled = requiredKeys.every(key => {
//       const value = formData[key];
//       return value && value.toString().trim() !== "";
//     });
    
//     if (!allRequiredFilled) {
//       setIsValid(false);
//       return;
//     }
    
//     // Then, check if there are any validation errors for required fields
//     const hasValidationErrors = requiredKeys.some(key => {
//       return validationErrors[key] && validationErrors[key] !== "";
//     });
    
//     setIsValid(!hasValidationErrors);
//   }, [formData, validationErrors]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedData = { ...formData, [name]: value };
    
//     // Special handling for country selection
//     if (name === "country") {
//       const selectedCountry = countries.find(country => country.name === value);
//       if (selectedCountry) {
//         updatedData = { 
//           ...updatedData, 
//           country: selectedCountry.name,
//           countryCode: selectedCountry.isoCode,
//           state: "",
//           stateCode: "",
//           city: ""
//         };
        
//         // Load states for selected country
//         const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
//         const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
//         setStates(sortedStates);
//         setCities([]); // Clear cities when country changes
//       }
//     }
    
//     // Special handling for state selection
//     if (name === "state") {
//       const selectedState = states.find(state => state.name === value);
//       if (selectedState) {
//         updatedData = { 
//           ...updatedData, 
//           state: selectedState.name,
//           stateCode: selectedState.isoCode,
//           city: "" // Reset city when state changes
//         };
        
//         // Load cities for selected state
//         if (formData.countryCode && selectedState.isoCode) {
//           const stateCities = City.getCitiesOfState(formData.countryCode, selectedState.isoCode);
//           const sortedCities = stateCities.sort((a, b) => a.name.localeCompare(b.name));
//           setCities(sortedCities);
//         }
//       }
//     }
    
//     setFormData(updatedData);
//     setData(updatedData);
    
//     // Validate the field immediately
//     validateField(name, value);

//     // Clear error message when user starts typing
//     if (apiError) setApiError("");
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     validateField(name, value);
//   };

//   const prepareApiData = () => {
//     // Check all required fields are filled
//     const missingFields = requiredKeys.filter(key => {
//       const value = formData[key];
//       return !value || value.toString().trim() === "";
//     });
    
//     console.log("Missing required fields:", missingFields);

//     if (missingFields.length > 0) {
//       throw new Error(`Please fill all required fields: ${missingFields.join(", ")}`);
//     }

//     // Prepare API data according to ContactDetails DTO structure
//     const apiData = {
//       fullAddress: (formData.fullAddress || "").trim(),
//       streetAddress: (formData.streetAddress || "").trim(),
//       city: (formData.city === "Other" ? "Other (see full address)" : (formData.city || "").trim()),
//       state: (formData.state || "").trim(),
//       country: (formData.country || "").trim(),
//       pinCode: (formData.pinCode || "").trim(),
//       mobileNumber: (formData.mobileNumber || "").trim(),
//       alternateNumber: (formData.alternateNumber || "").trim(),
//       whatsappNumber: (formData.whatsappNumber || "").trim(),
//       emailAddress: (formData.emailAddress || "").trim(),
//       emergencyContactName: (formData.emergencyContactName || "").trim(),
//       emergencyContactNumber: (formData.emergencyContactNumber || "").trim(),
//       emergencyContactRelation: (formData.emergencyContactRelation || "").trim(),
//       preferredContactMethod: (formData.preferredContactMethod || "").trim(),
//       contactVisibility: (formData.contactVisibility || "PRIVATE").trim(),
//     };

//     // For update, add version
//     if (hasExistingContact) {
//       apiData.version = version;
//     }

//     console.log("API Data:", apiData);

//     return apiData;
//   };

//   /* -------------------- SUBMIT HANDLER -------------------- */
//   const handleNext = async () => {
//     console.log("=== CONTACT FORM SUBMISSION STARTED ===");

//     // Double-check form validity
//     if (!isValid) {
//       setApiError("Please fill all required fields correctly");
//       return;
//     }

//     try {
//       setLoading(true);
//       setApiError("");
//       setSuccessMessage("");

//       // Prepare API data
//       const apiData = prepareApiData();
//       console.log("Sending contact details data to API...");

//       let response;

//       if (hasExistingContact) {
//         console.log("Using PATCH to update existing contact details");
//         response = await updateResidentialDetails(apiData).unwrap();
//       } else {
//         console.log("Using POST to create new contact details");
//         response = await createResidentialDetails(apiData).unwrap();
//       }

//       console.log("=== CONTACT API RESPONSE DETAILS ===");
//       console.log("Full response:", response);

//       // Check for multiple response formats
//       const isSuccessResponse = 
//         response.statusCode === 201 || 
//         response.statusCode === 200 || 
//         response.code === "201" || 
//         response.code === "200" ||
//         response.success === true ||
//         (response.data && (response.data.statusCode === 201 || response.data.statusCode === 200)) ||
//         response.message?.toLowerCase().includes("success") ||
//         response.message?.toLowerCase().includes("created") ||
//         response.message?.toLowerCase().includes("updated");

//       if (isSuccessResponse) {
//         const successMsg = hasExistingContact
//           ? "Contact details updated successfully!"
//           : "Contact details created successfully!";
        
//         setSuccessMessage(successMsg);
//         console.log(successMsg);

//         // Update version if available
//         if (response.data?.version) {
//           setVersion(response.data.version);
//         }

//         await refetch();
        
//         // Move to next step after short delay
//         setTimeout(() => {
//           nextStep();
//         }, 500);

//       } else {
//         const errorMsg = response.message || response.data?.message || "Failed to save contact details";
//         setApiError(errorMsg);
//         console.error("Save failed:", errorMsg);
//       }

//     } catch (error) {
//       console.error("=== API ERROR DETAILS ===");
//       console.error("Error status:", error.status);
//       console.error("Error data:", error.data);
//       console.error("Full error:", error);

//       let errorMsg = "Failed to save contact details. Please try again.";

//       if (error.data) {
//         if (error.data.errors) {
//           const validationErrors = Object.entries(error.data.errors)
//             .map(([field, message]) => `${field}: ${message}`)
//             .join(', ');
//           errorMsg = `Validation errors: ${validationErrors}`;
//         } else if (error.data.message) {
//           errorMsg = error.data.message;
//         } else if (error.data.detail) {
//           errorMsg = error.data.detail;
//         }
//       } else if (error.status === 400) {
//         errorMsg = "Invalid data. Please check all required fields are filled correctly.";
//       } else if (error.status === 500) {
//         errorMsg = "Server error. Please try again later.";
//       } else if (error.message && error.message.includes("Please fill all required fields")) {
//         errorMsg = error.message;
//       }

//       setApiError(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* -------------------- UI STYLES -------------------- */
//   const fieldStyle = {
//     backgroundColor: "#FF8C4405",
//     borderRadius: "6px",
//     padding: "14px 12px",
//     color: "#707C8B",
//     fontFamily: "'Inter', sans-serif",
//     fontWeight: 400,
//     outline: "none",
//     width: "100%",
//   };

//   const labelStyle = {
//     fontSize: "15px",
//     fontWeight: 600,
//     marginBottom: "4px",
//     fontFamily: "'Inter', sans-serif",
//   };

//   // Check authentication
//   const token = localStorage.getItem("authToken");

//   if (!token) {
//     return (
//       <div className="w-full max-w-[95%] mx-auto font-[Inter] flex flex-col min-h-[600px]">
//         <div className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl" style={{ backgroundColor: "#FF8C4426" }}>
//           <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
//         </div>
//         <div className="px-4 sm:px-6 md:px-10 py-20 flex flex-col items-center justify-center" style={{ backgroundColor: "#FF8C4405" }}>
//           <div className="text-red-500 text-lg mb-4">Authentication Required</div>
//           <p className="text-gray-600 mb-6">Please login to access your contact details.</p>
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
//       <div className="w-full max-w-[95%] mx-auto font-[Inter] flex flex-col min-h-[600px]">
//         <div className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl" style={{ backgroundColor: "#FF8C4426" }}>
//           <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
//         </div>
//         <div className="flex justify-center items-center h-64" style={{ backgroundColor: "#FF8C4405" }}>
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//           <span className="ml-3">Loading contact details...</span>
//         </div>
//       </div>
//     );
//   }

//   /* -------------------- JSX -------------------- */
//   return (
//     <div className="w-full max-w-[95%] mx-auto font-[Inter] flex flex-col min-h-[600px]">

//       {/* Stepper */}
//       <div
//         className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl"
//         style={{ backgroundColor: "#FF8C4426" }}
//       >
//         <Stepper 
//           step={step} 
//           completedStep={completedStep} 
//           goToStep={goToStep} 
//           hasDataForStep={hasDataForStep}
//         />
//       </div>

//       {/* FORM */}
//       <div className="px-4 sm:px-6 md:px-10 py-8 flex-grow" style={{ backgroundColor: "#FF8C4405" }}>
//         <h3 className="text-center text-orange-400 font-semibold uppercase mb-8 text-xl">
//           Residential Address / Contact Details
//         </h3>

//         {/* Success Message */}
//         {successMessage && (
//           <div className={`mb-6 p-3 rounded-md ${hasExistingContact ? "bg-green-50 border border-green-200 text-green-600" : "bg-blue-50 border border-blue-200 text-blue-600"}`}>
//             <p className="text-sm text-center">{successMessage}</p>
//           </div>
//         )}

//         {/* Error Message */}
//         {apiError && (
//           <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
//             <p className="text-red-600 text-sm text-center">{apiError}</p>
//             <p className="text-red-500 text-xs mt-1 text-center">
//               Please fix the errors and try again.
//             </p>
//           </div>
//         )}

//         <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {/* FULL ADDRESS */}
//           <div className="md:col-span-2 lg:col-span-3">
//             <label style={labelStyle}>Full Address <span style={{ color: "red" }}>*</span></label>
//             <textarea
//               name="fullAddress"
//               value={formData.fullAddress || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 minHeight: "100px",
//                 resize: "vertical",
//                 border: validationErrors.fullAddress ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               placeholder="Enter your complete address (minimum 10 characters)"
//               rows={3}
//             />
//             {validationErrors.fullAddress && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.fullAddress}</p>
//             )}
//           </div>

//           {/* STREET ADDRESS */}
//           <div>
//             <label style={labelStyle}>Street Address</label>
//             <input
//               name="streetAddress"
//               value={formData.streetAddress || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.streetAddress ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               placeholder="House number, street"
//             />
//             {validationErrors.streetAddress && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.streetAddress}</p>
//             )}
//           </div>

//           {/* COUNTRY */}
//           <div>
//             <label style={labelStyle}>Country <span style={{ color: "red" }}>*</span></label>
//             <select
//               name="country"
//               value={formData.country || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.country ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               required
//             >
//               <option value="">Select Country</option>
//               {countries.map((country) => (
//                 <option key={country.isoCode} value={country.name}>
//                   {country.name} ({country.isoCode})
//                 </option>
//               ))}
//             </select>
//             {validationErrors.country && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.country}</p>
//             )}
//           </div>

//           {/* STATE */}
//           <div>
//             <label style={labelStyle}>State</label>
//             <select
//               name="state"
//               value={formData.state || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.state ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               disabled={!formData.country}
//             >
//               <option value="">Select State</option>
//               {states.map((state) => (
//                 <option key={state.isoCode} value={state.name}>
//                   {state.name}
//                 </option>
//               ))}
//             </select>
//             {validationErrors.state && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.state}</p>
//             )}
//             <p className="text-xs text-gray-500 mt-1">
//               {!formData.country ? "Select a country first" : `${states.length} states available`}
//             </p>
//           </div>

//           {/* CITY - DYNAMIC FROM COUNTRY-STATE-CITY LIBRARY */}
//           <div>
//             <label style={labelStyle}>City <span style={{ color: "red" }}>*</span></label>
            
//             <select
//               name="city"
//               value={formData.city || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.city ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               required
//               disabled={!formData.state}
//             >
//               <option value="">Select City</option>
//               {cities.length > 0 ? (
//                 cities.map((city, index) => (
//                   <option key={`${city.name}-${index}`} value={city.name}>
//                     {city.name}
//                   </option>
//                 ))
//               ) : (
//                 <option value="" disabled>
//                   {!formData.state ? "Select a state first" : "Loading cities..."}
//                 </option>
//               )}
//               <option value="Other">Other (Please specify in address)</option>
//             </select>
            
//             {validationErrors.city && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
//             )}
            
//             <p className="text-xs text-gray-500 mt-1">
//               {!formData.state ? "Select a state first" : 
//                cities.length === 0 ? "Loading cities..." : 
//                `${cities.length} cities available in ${formData.state}`}
//             </p>
//           </div>

//           {/* PIN CODE */}
//           <div>
//             <label style={labelStyle}>PIN Code <span style={{ color: "red" }}>*</span></label>
//             <input
//               name="pinCode"
//               value={formData.pinCode || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.pinCode ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               placeholder="6-digit PIN code"
//               maxLength={6}
//             />
//             {validationErrors.pinCode && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.pinCode}</p>
//             )}
//           </div>

//           {/* MOBILE NUMBER */}
//           <div>
//             <label style={labelStyle}>Mobile Number <span style={{ color: "red" }}>*</span></label>
//             <input
//               name="mobileNumber"
//               value={formData.mobileNumber || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.mobileNumber ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               placeholder="e.g., +91-9876543210"
//             />
//             {validationErrors.mobileNumber && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.mobileNumber}</p>
//             )}
//           </div>

//           {/* ALTERNATE MOBILE NUMBER */}
//           <div>
//             <label style={labelStyle}>Alternate Mobile Number</label>
//             <input
//               name="alternateNumber"
//               value={formData.alternateNumber || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.alternateNumber ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               placeholder="Alternative contact number"
//             />
//             {validationErrors.alternateNumber && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.alternateNumber}</p>
//             )}
//           </div>

//           {/* WHATSAPP NUMBER */}
//           <div>
//             <label style={labelStyle}>WhatsApp Number</label>
//             <input
//               name="whatsappNumber"
//               value={formData.whatsappNumber || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.whatsappNumber ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               placeholder="WhatsApp number"
//             />
//             {validationErrors.whatsappNumber && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.whatsappNumber}</p>
//             )}
//           </div>

//           {/* EMAIL ADDRESS */}
//           <div>
//             <label style={labelStyle}>Email Address</label>
//             <input
//               type="email"
//               name="emailAddress"
//               value={formData.emailAddress || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.emailAddress ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               placeholder="your.email@example.com"
//             />
//             {validationErrors.emailAddress && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.emailAddress}</p>
//             )}
//           </div>

//           {/* EMERGENCY CONTACT NAME */}
//           <div>
//             <label style={labelStyle}>Emergency Contact Name</label>
//             <input
//               name="emergencyContactName"
//               value={formData.emergencyContactName || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.emergencyContactName ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               placeholder="Name of emergency contact"
//             />
//             {validationErrors.emergencyContactName && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.emergencyContactName}</p>
//             )}
//           </div>

//           {/* EMERGENCY CONTACT NUMBER */}
//           <div>
//             <label style={labelStyle}>Emergency Contact Number</label>
//             <input
//               name="emergencyContactNumber"
//               value={formData.emergencyContactNumber || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.emergencyContactNumber ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//               placeholder="Emergency contact phone"
//             />
//             {validationErrors.emergencyContactNumber && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.emergencyContactNumber}</p>
//             )}
//           </div>

//           {/* EMERGENCY CONTACT RELATION */}
//           <div>
//             <label style={labelStyle}>Emergency Contact Relation</label>
//             <select
//               name="emergencyContactRelation"
//               value={formData.emergencyContactRelation || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.emergencyContactRelation ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//             >
//               <option value="">Select Relation</option>
//               <option value="Father">Father</option>
//               <option value="Mother">Mother</option>
//               <option value="Brother">Brother</option>
//               <option value="Sister">Sister</option>
//               <option value="Spouse">Spouse</option>
//               <option value="Son">Son</option>
//               <option value="Daughter">Daughter</option>
//               <option value="Friend">Friend</option>
//               <option value="Other">Other</option>
//             </select>
//             {validationErrors.emergencyContactRelation && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.emergencyContactRelation}</p>
//             )}
//           </div>

//           {/* PREFERRED CONTACT METHOD */}
//           <div>
//             <label style={labelStyle}>Preferred Contact Method</label>
//             <select
//               name="preferredContactMethod"
//               value={formData.preferredContactMethod || ""}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.preferredContactMethod ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//             >
//               <option value="">Select Method</option>
//               <option value="Mobile">Mobile</option>
//               <option value="WhatsApp">WhatsApp</option>
//               <option value="Email">Email</option>
//               <option value="Alternate Number">Alternate Number</option>
//             </select>
//             {validationErrors.preferredContactMethod && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.preferredContactMethod}</p>
//             )}
//           </div>

//           {/* CONTACT VISIBILITY */}
//           <div>
//             <label style={labelStyle}>Contact Visibility <span style={{ color: "red" }}>*</span></label>
//             <select
//               name="contactVisibility"
//               value={formData.contactVisibility || "PRIVATE"}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               style={{
//                 ...fieldStyle,
//                 border: validationErrors.contactVisibility ? "1px solid #ef4444" : "1px solid #8180801c"
//               }}
//             >
//               <option value="">Select</option>
//               <option value="PRIVATE">Private (Only you)</option>
//               <option value="MEMBERS_ONLY">Members Only</option>
//               <option value="PUBLIC">Public (All users)</option>
//             </select>
//             <p className="text-xs text-gray-500 mt-1">
//               Who can see your contact information
//             </p>
//           </div>

//         </form>
//       </div>

//       {/* BUTTONS */}
//       <div 
//         className="flex justify-end gap-4 py-4 px-4 sm:px-6 md:px-10" 
//         style={{ backgroundColor: "#FF8C4405" }}
//       >
//         <button
//           onClick={prevStep}
//           className="bg-white text-orange-600 px-10 py-3 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
//           disabled={loading}
//         >
//           Previous
//         </button>

//         <button
//           disabled={!isValid || loading}
//           onClick={handleNext}
//           className={`px-10 py-3 text-white rounded-lg transition-colors ${
//             isValid && !loading
//               ? "bg-orange-400 hover:bg-orange-500 cursor-pointer"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           {loading ? (
//             <>
//               <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
//               {hasExistingContact ? "Updating..." : "Saving..."}
//             </>
//           ) : hasExistingContact ? (
//             "Update & Next"
//           ) : (
//             "Save & Next"
//           )}
//         </button>
        
//       </div>
//     </div>
//   );
// };

// export default Step6ResidentialDetails;




























import React, { useState, useEffect, useRef } from "react";
import { Country, State, City } from "country-state-city";
import Stepper from "./Stepper";
import {
  useCreateResidentialDetailsMutation,
  useGetResidentialDetailsQuery,
  useUpdateResidentialDetailsMutation,
} from "../../context/createProfile";

const Step6ResidentialDetails = ({
  nextStep,
  prevStep,
  goToStep,
  data,
  setData,
  step,
  completedStep,
  hasDataForStep,
}) => {
  const autoNextRef = useRef(false);
  const apiLoadedRef = useRef(false);

  // Add states for country-state-city data
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState(data || {});

  /* -------------------- API HOOKS -------------------- */
  const [createResidentialDetails] = useCreateResidentialDetailsMutation();
  const [updateResidentialDetails] = useUpdateResidentialDetailsMutation();

  const {
    data: res,
    error: residentialError,
    isLoading: isFetching,
    isSuccess,
    refetch,
  } = useGetResidentialDetailsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const apiData = res?.data;

  /* STATE */
  const [hasExistingContact, setHasExistingContact] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [version, setVersion] = useState(0);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // ALL fields are required now
  const requiredKeys = [
    "fullAddress",
    "streetAddress", 
    "city", 
    "state",
    "country",
    "pinCode",
    "mobileNumber",
    "alternateNumber",
    "whatsappNumber",
    "emailAddress",
    "emergencyContactName",
    "emergencyContactNumber",
    "emergencyContactRelation",
    "preferredContactMethod",
    "contactVisibility"
  ];

  /*  COUNTRY-STATE-CITY LOGIC  */
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const sortedCountries = allCountries.sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    setCountries(sortedCountries);
    
    // Set default country to India if not already set
    if (!formData.country) {
      const defaultCountry = sortedCountries.find(c => c.name === "India");
      if (defaultCountry) {
        const updatedData = { ...formData, country: "India", countryCode: "IN" };
        setFormData(updatedData);
        setData(updatedData);
        
        // Load Indian states
        const indiaStates = State.getStatesOfCountry("IN");
        const sortedStates = indiaStates.sort((a, b) => a.name.localeCompare(b.name));
        setStates(sortedStates);
        
        // Load Indian cities (from Maharashtra by default)
        const maharashtraCities = City.getCitiesOfState("IN", "MH");
        const sortedCities = maharashtraCities.sort((a, b) => a.name.localeCompare(b.name));
        setCities(sortedCities);
      }
    }
    
  }, []);

  // When country changes, load its states
  useEffect(() => {
    if (!formData.countryCode) return;

    const countryStates = State.getStatesOfCountry(formData.countryCode);
    const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
    setStates(sortedStates);
    
    // Clear cities when country changes
    setCities([]);
    
    if (!apiLoadedRef.current) {
      const updated = { ...formData, state: "", stateCode: "", city: "" };
      setFormData(updated);
      setData(updated);
    }
  }, [formData.countryCode]);

  // When state changes, load its cities
  useEffect(() => {
    if (!formData.countryCode || !formData.stateCode) {
      setCities([]);
      return;
    }

    const stateCities = City.getCitiesOfState(formData.countryCode, formData.stateCode);
    const sortedCities = stateCities.sort((a, b) => a.name.localeCompare(b.name));
    setCities(sortedCities);
    
    // Clear city when state changes
    if (!apiLoadedRef.current) {
      const updated = { ...formData, city: "" };
      setFormData(updated);
      setData(updated);
    }
  }, [formData.countryCode, formData.stateCode]);

  // AFTER countries load, map backend values properly
  useEffect(() => {
    if (!apiData || !countries.length) return;

    const countryObj = countries.find(c => c.name === apiData.country);
    if (!countryObj) return;

    apiLoadedRef.current = true;

    const updated = {
      ...formData,
      country: countryObj.name,
      countryCode: countryObj.isoCode
    };

    const stateObj = State.getStatesOfCountry(countryObj.isoCode)
      .find(s => s.name === apiData.state);

    if (stateObj) {
      updated.state = stateObj.name;
      updated.stateCode = stateObj.isoCode;
      
      // Load cities for this state
      const stateCities = City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode);
      const sortedCities = stateCities.sort((a, b) => a.name.localeCompare(b.name));
      setCities(sortedCities);
    }

    updated.city = apiData.city || "";

    setFormData(updated);
    setData(updated);
  }, [countries, apiData]);

  // AUTO-NEXT LOGIC: Load data from API and auto-navigate if step is sequential
  useEffect(() => {
    if (!isSuccess || !apiData) return;
    if (apiLoadedRef.current) return;

    apiLoadedRef.current = true;

    console.log("Contact fetch response:", apiData);

    if (apiData) {
      setHasExistingContact(true);
      const contactData = apiData;
      
      // Store version for optimistic locking
      if (contactData.version) {
        setVersion(contactData.version);
      }

      // Transform backend data to form format
      const transformedData = {
        fullAddress: contactData.fullAddress || "",
        streetAddress: contactData.streetAddress || "",
        city: contactData.city || "",
        state: contactData.state || "",
        country: contactData.country || "",
        pinCode: contactData.pinCode || "",
        mobileNumber: contactData.mobileNumber || "",
        alternateNumber: contactData.alternateNumber || "",
        whatsappNumber: contactData.whatsappNumber || "",
        emailAddress: contactData.emailAddress || "",
        emergencyContactName: contactData.emergencyContactName || "",
        emergencyContactNumber: contactData.emergencyContactNumber || "",
        emergencyContactRelation: contactData.emergencyContactRelation || "",
        preferredContactMethod: contactData.preferredContactMethod || "",
        contactVisibility: contactData.contactVisibility || "PRIVATE",
      };

      console.log("Contact form data populated:", transformedData);

      // ✅ ALWAYS load data
      setFormData(transformedData);
      setData(transformedData);
      setDataLoaded(true);

      // ✅ auto-next only once and only in sequence
      if (
        !autoNextRef.current &&
        Object.keys(transformedData).length > 0 &&
        step === completedStep + 1
      ) {
        autoNextRef.current = true;
        setTimeout(() => {
          console.log("Auto-navigating to next step...");
          nextStep();
        }, 0);
      }

      // Find country code for the loaded country
      if (transformedData.country) {
        const countryObj = countries.find(c => c.name === transformedData.country);
        if (countryObj) {
          const updatedData = { 
            ...transformedData, 
            countryCode: countryObj.isoCode 
          };
          setFormData(updatedData);
          setData(updatedData);
          
          // Load states for this country
          const countryStates = State.getStatesOfCountry(countryObj.isoCode);
          const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
          setStates(sortedStates);
          
          // Load cities if state is available
          if (transformedData.state) {
            const stateObj = sortedStates.find(s => s.name === transformedData.state);
            if (stateObj) {
              const stateCities = City.getCitiesOfCountry(countryObj.isoCode)
                .filter(city => city.stateCode === stateObj.isoCode);
              const sortedCities = stateCities.sort((a, b) => a.name.localeCompare(b.name));
              setCities(sortedCities);
            }
          }
        }
      }

      setSuccessMessage("Contact details loaded successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [isSuccess, apiData, step, completedStep, nextStep, setData, countries]);

  // 404 = new user
  useEffect(() => {
    if (residentialError?.status === 404 && !dataLoaded) {
      apiLoadedRef.current = true;
      setHasExistingContact(false);
      setDataLoaded(true);
      setSuccessMessage("No existing contact details found. Please create new ones.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [residentialError, dataLoaded]);

  // Handle successful query with no data (new user)
  useEffect(() => {
    if (isSuccess && !apiData && !dataLoaded) {
      apiLoadedRef.current = true;
      console.log("No contact data found - new user");
      setHasExistingContact(false);
      setDataLoaded(true);
      setSuccessMessage("No existing contact details found. Please create new ones.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [isSuccess, apiData, dataLoaded]);

  /*  VALIDATION  */
  const validateField = (name, value) => {
    let err = "";
    const trimmedValue = value ? value.toString().trim() : "";
    
    // Check required fields - ALL fields are required
    if (trimmedValue === "") {
      err = "This field is required";
    } else {
      switch (name) {
        case "fullAddress":
          if (trimmedValue.length < 10) {
            err = "Address must be at least 10 characters";
          }
          break;
          
        case "streetAddress":
          if (!/^[A-Za-z0-9\s\-.,#]+$/.test(trimmedValue)) {
            err = "Only letters, numbers, spaces, hyphens, dots, commas and # allowed";
          }
          break;
          
        case "city":
          if (trimmedValue === "Other") {
            // If "Other" is selected, check if full address contains city details
            if (!formData.fullAddress || formData.fullAddress.trim().length < 10) {
              err = "Please specify city in the full address field";
            }
          } else if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
            err = "Only alphabets, spaces, dots and hyphens allowed";
          }
          break;
          
        case "state":
          if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
            err = "Only alphabets, spaces, dots and hyphens allowed";
          }
          break;
          
        case "country":
          if (!countries.find(c => c.name === trimmedValue)) {
            err = "Please select a valid country from the list";
          }
          break;
          
        case "pinCode":
          if (!/^\d{6}$/.test(trimmedValue)) {
            err = "Enter valid 6-digit PIN code";
          }
          break;
          
        case "mobileNumber":
          const cleanMobile = trimmedValue.replace(/[\s()-]/g, '');
          if (!/^[+]?[0-9]{10,15}$/.test(cleanMobile)) {
            err = "Enter valid 10-15 digit phone number";
          }
          break;
          
        case "alternateNumber":
          const cleanAlt = trimmedValue.replace(/[\s()-]/g, '');
          if (!/^[+]?[0-9]{10,15}$/.test(cleanAlt)) {
            err = "Enter valid 10-15 digit phone number";
          }
          break;
          
        case "whatsappNumber":
          const cleanWhatsapp = trimmedValue.replace(/[\s()-]/g, '');
          if (!/^[+]?[0-9]{10,15}$/.test(cleanWhatsapp)) {
            err = "Enter valid 10-15 digit phone number";
          }
          break;
          
        case "emailAddress":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
            err = "Enter valid email address";
          }
          break;
          
        case "emergencyContactName":
          if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
            err = "Only alphabets, spaces, dots and hyphens allowed";
          }
          break;
          
        case "emergencyContactNumber":
          const cleanEmergency = trimmedValue.replace(/[\s()-]/g, '');
          if (!/^[+]?[0-9]{10,15}$/.test(cleanEmergency)) {
            err = "Enter valid 10-15 digit phone number";
          }
          break;
          
        case "emergencyContactRelation":
          if (!/^[A-Za-z\s]+$/.test(trimmedValue)) {
            err = "Only alphabets and spaces allowed";
          }
          break;
          
        case "preferredContactMethod":
          if (!/^[A-Za-z\s]+$/.test(trimmedValue)) {
            err = "Only alphabets and spaces allowed";
          }
          break;
          
        case "contactVisibility":
          if (!["PRIVATE", "MEMBERS_ONLY", "PUBLIC"].includes(trimmedValue)) {
            err = "Please select a valid visibility option";
          }
          break;
          
        default:
          break;
      }
    }
    
    setValidationErrors((prev) => ({ ...prev, [name]: err }));
    return err;
  };

  // Check if form is valid whenever formData changes
  useEffect(() => {
    // Check all required fields are filled
    const allRequiredFilled = requiredKeys.every(key => {
      const value = formData[key];
      return value && value.toString().trim() !== "";
    });
    
    if (!allRequiredFilled) {
      setIsValid(false);
      return;
    }
    
    // Check if there are any validation errors for required fields
    const hasValidationErrors = requiredKeys.some(key => {
      return validationErrors[key] && validationErrors[key] !== "";
    });
    
    setIsValid(!hasValidationErrors);
  }, [formData, validationErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    
    // Special handling for country selection
    if (name === "country") {
      const selectedCountry = countries.find(country => country.name === value);
      if (selectedCountry) {
        updatedData = { 
          ...updatedData, 
          country: selectedCountry.name,
          countryCode: selectedCountry.isoCode,
          state: "",
          stateCode: "",
          city: ""
        };
        
        // Load states for selected country
        const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
        const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
        setStates(sortedStates);
        setCities([]); // Clear cities when country changes
      }
    }
    
    // Special handling for state selection
    if (name === "state") {
      const selectedState = states.find(state => state.name === value);
      if (selectedState) {
        updatedData = { 
          ...updatedData, 
          state: selectedState.name,
          stateCode: selectedState.isoCode,
          city: "" // Reset city when state changes
        };
        
        // Load cities for selected state
        if (formData.countryCode && selectedState.isoCode) {
          const stateCities = City.getCitiesOfState(formData.countryCode, selectedState.isoCode);
          const sortedCities = stateCities.sort((a, b) => a.name.localeCompare(b.name));
          setCities(sortedCities);
        }
      }
    }
    
    setFormData(updatedData);
    setData(updatedData);
    
    // Validate the field immediately
    validateField(name, value);

    // Clear error message when user starts typing
    if (apiError) setApiError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const prepareApiData = () => {
    // Check all required fields are filled
    const missingFields = requiredKeys.filter(key => {
      const value = formData[key];
      return !value || value.toString().trim() === "";
    });
    
    console.log("Missing required fields:", missingFields);

    if (missingFields.length > 0) {
      throw new Error(`Please fill all required fields: ${missingFields.join(", ")}`);
    }

    // Prepare API data according to ContactDetails DTO structure
    const apiData = {
      fullAddress: (formData.fullAddress || "").trim(),
      streetAddress: (formData.streetAddress || "").trim(),
      city: (formData.city === "Other" ? "Other (see full address)" : (formData.city || "").trim()),
      state: (formData.state || "").trim(),
      country: (formData.country || "").trim(),
      pinCode: (formData.pinCode || "").trim(),
      mobileNumber: (formData.mobileNumber || "").trim(),
      alternateNumber: (formData.alternateNumber || "").trim(),
      whatsappNumber: (formData.whatsappNumber || "").trim(),
      emailAddress: (formData.emailAddress || "").trim(),
      emergencyContactName: (formData.emergencyContactName || "").trim(),
      emergencyContactNumber: (formData.emergencyContactNumber || "").trim(),
      emergencyContactRelation: (formData.emergencyContactRelation || "").trim(),
      preferredContactMethod: (formData.preferredContactMethod || "").trim(),
      contactVisibility: (formData.contactVisibility || "PRIVATE").trim(),
    };

    // For update, add version
    if (hasExistingContact) {
      apiData.version = version;
    }

    console.log("API Data:", apiData);

    return apiData;
  };

  /* -------------------- SUBMIT HANDLER -------------------- */
  const handleNext = async () => {
    console.log("=== CONTACT FORM SUBMISSION STARTED ===");

    // Double-check form validity
    if (!isValid) {
      setApiError("Please fill all required fields correctly");
      return;
    }

    try {
      setLoading(true);
      setApiError("");
      setSuccessMessage("");

      // Prepare API data
      const apiData = prepareApiData();
      console.log("Sending contact details data to API...");

      let response;

      if (hasExistingContact) {
        console.log("Using PATCH to update existing contact details");
        response = await updateResidentialDetails(apiData).unwrap();
      } else {
        console.log("Using POST to create new contact details");
        response = await createResidentialDetails(apiData).unwrap();
      }

      console.log("=== CONTACT API RESPONSE DETAILS ===");
      console.log("Full response:", response);

      // Check for multiple response formats
      const isSuccessResponse = 
        response.statusCode === 201 || 
        response.statusCode === 200 || 
        response.code === "201" || 
        response.code === "200" ||
        response.success === true ||
        (response.data && (response.data.statusCode === 201 || response.data.statusCode === 200)) ||
        response.message?.toLowerCase().includes("success") ||
        response.message?.toLowerCase().includes("created") ||
        response.message?.toLowerCase().includes("updated");

      if (isSuccessResponse) {
        const successMsg = hasExistingContact
          ? "Contact details updated successfully!"
          : "Contact details created successfully!";
        
        setSuccessMessage(successMsg);
        console.log(successMsg);

        // Update version if available
        if (response.data?.version) {
          setVersion(response.data.version);
        }

        await refetch();
        
        // Move to next step after short delay
        setTimeout(() => {
          nextStep();
        }, 500);

      } else {
        const errorMsg = response.message || response.data?.message || "Failed to save contact details";
        setApiError(errorMsg);
        console.error("Save failed:", errorMsg);
      }

    } catch (error) {
      console.error("=== API ERROR DETAILS ===");
      console.error("Error status:", error.status);
      console.error("Error data:", error.data);
      console.error("Full error:", error);

      let errorMsg = "Failed to save contact details. Please try again.";

      if (error.data) {
        if (error.data.errors) {
          const validationErrors = Object.entries(error.data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          errorMsg = `Validation errors: ${validationErrors}`;
        } else if (error.data.message) {
          errorMsg = error.data.message;
        } else if (error.data.detail) {
          errorMsg = error.data.detail;
        }
      } else if (error.status === 400) {
        errorMsg = "Invalid data. Please check all required fields are filled correctly.";
      } else if (error.status === 500) {
        errorMsg = "Server error. Please try again later.";
      } else if (error.message && error.message.includes("Please fill all required fields")) {
        errorMsg = error.message;
      }

      setApiError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI STYLES -------------------- */
  const fieldStyle = {
    backgroundColor: "#FF8C4405",
    borderRadius: "6px",
    padding: "14px 12px",
    color: "#707C8B",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    outline: "none",
    width: "100%",
  };

  const labelStyle = {
    fontSize: "15px",
    fontWeight: 600,
    marginBottom: "4px",
    fontFamily: "'Inter', sans-serif",
  };

  // Check authentication
  const token = localStorage.getItem("authToken");

  if (!token) {
    return (
      <div className="w-full max-w-[95%] mx-auto font-[Inter] flex flex-col min-h-[600px]">
        <div className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl" style={{ backgroundColor: "#FF8C4426" }}>
          <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
        </div>
        <div className="px-4 sm:px-6 md:px-10 py-20 flex flex-col items-center justify-center" style={{ backgroundColor: "#FF8C4405" }}>
          <div className="text-red-500 text-lg mb-4">Authentication Required</div>
          <p className="text-gray-600 mb-6">Please login to access your contact details.</p>
          <button onClick={() => (window.location.href = "/signin")} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isFetching && !dataLoaded) {
    return (
      <div className="w-full max-w-[95%] mx-auto font-[Inter] flex flex-col min-h-[600px]">
        <div className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl" style={{ backgroundColor: "#FF8C4426" }}>
          <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
        </div>
        <div className="flex justify-center items-center h-64" style={{ backgroundColor: "#FF8C4405" }}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <span className="ml-3">Loading contact details...</span>
        </div>
      </div>
    );
  }

  /* -------------------- JSX -------------------- */
  return (
    <div className="w-full max-w-[95%] mx-auto font-[Inter] flex flex-col min-h-[600px]">

      {/* Stepper */}
      <div
        className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl"
        style={{ backgroundColor: "#FF8C4426" }}
      >
        <Stepper 
          step={step} 
          completedStep={completedStep} 
          goToStep={goToStep} 
          hasDataForStep={hasDataForStep}
        />
      </div>

      {/* FORM */}
      <div className="px-4 sm:px-6 md:px-10 py-8 flex-grow" style={{ backgroundColor: "#FF8C4405" }}>
        <h3 className="text-center text-orange-400 font-semibold uppercase mb-8 text-xl">
          Residential Address / Contact Details
        </h3>

        {/* Success Message */}
        {successMessage && (
          <div className={`mb-6 p-3 rounded-md ${hasExistingContact ? "bg-green-50 border border-green-200 text-green-600" : "bg-blue-50 border border-blue-200 text-blue-600"}`}>
            <p className="text-sm text-center">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {apiError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm text-center">{apiError}</p>
            <p className="text-red-500 text-xs mt-1 text-center">
              Please fix the errors and try again.
            </p>
          </div>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* FULL ADDRESS */}
          <div className="md:col-span-2 lg:col-span-3">
            <label style={labelStyle}>Full Address <span style={{ color: "red" }}>*</span></label>
            <textarea
              name="fullAddress"
              value={formData.fullAddress || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                minHeight: "100px",
                resize: "vertical",
                border: validationErrors.fullAddress ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              placeholder="Enter your complete address (minimum 10 characters)"
              rows={3}
              required
            />
            {validationErrors.fullAddress && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.fullAddress}</p>
            )}
          </div>

          {/* STREET ADDRESS */}
          <div>
            <label style={labelStyle}>Street Address <span style={{ color: "red" }}>*</span></label>
            <input
              name="streetAddress"
              value={formData.streetAddress || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.streetAddress ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              placeholder="House number, street"
              required
            />
            {validationErrors.streetAddress && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.streetAddress}</p>
            )}
          </div>

          {/* COUNTRY */}
          <div>
            <label style={labelStyle}>Country <span style={{ color: "red" }}>*</span></label>
            <select
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.country ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.name}>
                  {country.name} ({country.isoCode})
                </option>
              ))}
            </select>
            {validationErrors.country && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.country}</p>
            )}
          </div>

          {/* STATE */}
          <div>
            <label style={labelStyle}>State <span style={{ color: "red" }}>*</span></label>
            <select
              name="state"
              value={formData.state || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.state ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              disabled={!formData.country}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            {validationErrors.state && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.state}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {!formData.country ? "Select a country first" : `${states.length} states available`}
            </p>
          </div>

          {/* CITY - DYNAMIC FROM COUNTRY-STATE-CITY LIBRARY */}
          <div>
            <label style={labelStyle}>City <span style={{ color: "red" }}>*</span></label>
            
            <select
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.city ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              required
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {cities.length > 0 ? (
                cities.map((city, index) => (
                  <option key={`${city.name}-${index}`} value={city.name}>
                    {city.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {!formData.state ? "Select a state first" : "Loading cities..."}
                </option>
              )}
              <option value="Other">Other (Please specify in address)</option>
            </select>
            
            {validationErrors.city && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
            )}
            
            <p className="text-xs text-gray-500 mt-1">
              {!formData.state ? "Select a state first" : 
               cities.length === 0 ? "Loading cities..." : 
               `${cities.length} cities available in ${formData.state}`}
            </p>
          </div>

          {/* PIN CODE */}
          <div>
            <label style={labelStyle}>PIN Code <span style={{ color: "red" }}>*</span></label>
            <input
              name="pinCode"
              value={formData.pinCode || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.pinCode ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              placeholder="6-digit PIN code"
              maxLength={6}
              required
            />
            {validationErrors.pinCode && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.pinCode}</p>
            )}
          </div>

          {/* MOBILE NUMBER */}
          <div>
            <label style={labelStyle}>Mobile Number <span style={{ color: "red" }}>*</span></label>
            <input
              name="mobileNumber"
              value={formData.mobileNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.mobileNumber ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              placeholder="e.g., +91-9876543210"
              required
            />
            {validationErrors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.mobileNumber}</p>
            )}
          </div>

          {/* ALTERNATE MOBILE NUMBER */}
          <div>
            <label style={labelStyle}>Alternate Mobile Number <span style={{ color: "red" }}>*</span></label>
            <input
              name="alternateNumber"
              value={formData.alternateNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.alternateNumber ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              placeholder="Alternative contact number"
              required
            />
            {validationErrors.alternateNumber && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.alternateNumber}</p>
            )}
          </div>

          {/* WHATSAPP NUMBER */}
          <div>
            <label style={labelStyle}>WhatsApp Number <span style={{ color: "red" }}>*</span></label>
            <input
              name="whatsappNumber"
              value={formData.whatsappNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.whatsappNumber ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              placeholder="WhatsApp number"
              required
            />
            {validationErrors.whatsappNumber && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.whatsappNumber}</p>
            )}
          </div>

          {/* EMAIL ADDRESS */}
          <div>
            <label style={labelStyle}>Email Address <span style={{ color: "red" }}>*</span></label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.emailAddress ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              placeholder="your.email@example.com"
              required
            />
            {validationErrors.emailAddress && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.emailAddress}</p>
            )}
          </div>

          {/* EMERGENCY CONTACT NAME */}
          <div>
            <label style={labelStyle}>Emergency Contact Name <span style={{ color: "red" }}>*</span></label>
            <input
              name="emergencyContactName"
              value={formData.emergencyContactName || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.emergencyContactName ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              placeholder="Name of emergency contact"
              required
            />
            {validationErrors.emergencyContactName && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.emergencyContactName}</p>
            )}
          </div>

          {/* EMERGENCY CONTACT NUMBER */}
          <div>
            <label style={labelStyle}>Emergency Contact Number <span style={{ color: "red" }}>*</span></label>
            <input
              name="emergencyContactNumber"
              value={formData.emergencyContactNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.emergencyContactNumber ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              placeholder="Emergency contact phone"
              required
            />
            {validationErrors.emergencyContactNumber && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.emergencyContactNumber}</p>
            )}
          </div>

          {/* EMERGENCY CONTACT RELATION */}
          <div>
            <label style={labelStyle}>Emergency Contact Relation <span style={{ color: "red" }}>*</span></label>
            <select
              name="emergencyContactRelation"
              value={formData.emergencyContactRelation || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.emergencyContactRelation ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              required
            >
              <option value="">Select Relation</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Spouse">Spouse</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
            {validationErrors.emergencyContactRelation && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.emergencyContactRelation}</p>
            )}
          </div>

          {/* PREFERRED CONTACT METHOD */}
          <div>
            <label style={labelStyle}>Preferred Contact Method <span style={{ color: "red" }}>*</span></label>
            <select
              name="preferredContactMethod"
              value={formData.preferredContactMethod || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.preferredContactMethod ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              required
            >
              <option value="">Select Method</option>
              <option value="Mobile">Mobile</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
              <option value="Alternate Number">Alternate Number</option>
            </select>
            {validationErrors.preferredContactMethod && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.preferredContactMethod}</p>
            )}
          </div>

          {/* CONTACT VISIBILITY */}
          <div>
            <label style={labelStyle}>Contact Visibility <span style={{ color: "red" }}>*</span></label>
            <select
              name="contactVisibility"
              value={formData.contactVisibility || "PRIVATE"}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                ...fieldStyle,
                border: validationErrors.contactVisibility ? "1px solid #ef4444" : "1px solid #8180801c"
              }}
              required
            >
              <option value="">Select</option>
              <option value="PRIVATE">Private (Only you)</option>
              <option value="MEMBERS_ONLY">Members Only</option>
              <option value="PUBLIC">Public (All users)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Who can see your contact information
            </p>
          </div>

        </form>
      </div>

      {/* BUTTONS */}
      <div 
        className="flex justify-end gap-4 py-4 px-4 sm:px-6 md:px-10" 
        style={{ backgroundColor: "#FF8C4405" }}
      >
        <button
          onClick={prevStep}
          className="bg-white text-orange-600 px-10 py-3 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
          disabled={loading}
        >
          Previous
        </button>

        <button
          disabled={!isValid || loading}
          onClick={handleNext}
          className={`px-10 py-3 text-white rounded-lg transition-colors ${
            isValid && !loading
              ? "bg-orange-400 hover:bg-orange-500 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              {hasExistingContact ? "Updating..." : "Saving..."}
            </>
          ) : hasExistingContact ? (
            "Update & Next"
          ) : (
            "Save & Next"
          )}
        </button>
        
      </div>
    </div>
  );
};

export default Step6ResidentialDetails;