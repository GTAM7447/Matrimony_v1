// import React, { useState, useEffect } from "react";
// import { Country, State } from "country-state-city";
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
//   // Add states for country-state-city data
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [formData, setFormData] = useState(data || {});

//   /* -------------------- API HOOKS -------------------- */
//   const [createResidentialDetails] = useCreateResidentialDetailsMutation();
//   const [updateResidentialDetails] = useUpdateResidentialDetailsMutation();

//   const {
//     data: residentialResponse,
//     error: residentialError,
//     isLoading: residentialLoading,
//     isFetching,
//     isSuccess,
//   } = useGetResidentialDetailsQuery(undefined, {
//     refetchOnMountOrArgChange: false,
//   });

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

//   // HARDCODED COMMON CITIES (Will always show these)
//   const commonCities = [
//     "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad",
//     "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
//     "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane",
//     "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
//     "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
//     "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi",
//     "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai",
//     "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur",
//     "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
//     "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad",
//     "Bareilly", "Moradabad", "Mysore", "Gurgaon", "Aligarh",
//     "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Mira-Bhayandar",
//     "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Gorakhpur", "Guntur",
//     "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai",
//     "Warangal", "Cuttack", "Firozabad", "Kochi", "Bhavnagar",
//     "Dehradun", "Durgapur", "Asansol", "Nanded", "Kolhapur",
//     "Ajmer", "Gulbarga", "Jamnagar", "Ujjain", "Loni",
//     "Siliguri", "Jhansi", "Ulhasnagar", "Nellore", "Jammu",
//     "Sangli-Miraj", "Belgaum", "Mangalore", "Ambattur", "Tirunelveli",
//     "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala"
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
//       }
//     }
    
//     // ALWAYS SET CITIES - no matter what
//     const sortedCommonCities = [...commonCities].sort((a, b) => a.localeCompare(b));
//     setCities(sortedCommonCities.map(city => ({ name: city })));
    
//   }, []);

//   // When country changes, load its states
//   useEffect(() => {
//     if (formData.countryCode) {
//       const countryStates = State.getStatesOfCountry(formData.countryCode);
//       const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
//       setStates(sortedStates);
      
//       // Reset state and city when country changes
//       const updatedData = { ...formData, state: "", stateCode: "", city: "" };
//       setFormData(updatedData);
//       setData(updatedData);
//     }
//   }, [formData.countryCode]);

//   /* LOAD DATA FROM GET API  */
//   useEffect(() => {
//     if (residentialResponse && !dataLoaded) {
//       console.log("Contact fetch response:", residentialResponse);

//       if (residentialResponse.data) {
//         setHasExistingContact(true);
//         const contactData = residentialResponse.data;
        
//         // Store version for optimistic locking
//         if (contactData.version) {
//           setVersion(contactData.version);
//         }

//         // Transform backend data to form format
//         const transformedData = {
//           fullAddress: contactData.fullAddress || "",
//           streetAddress: contactData.streetAddress || "",
//           city: contactData.city || "",
//           state: contactData.state || "",
//           country: contactData.country || "",
//           pinCode: contactData.pinCode || "",
//           mobileNumber: contactData.mobileNumber || "",
//           alternateNumber: contactData.alternateNumber || "",
//           whatsappNumber: contactData.whatsappNumber || "",
//           emailAddress: contactData.emailAddress || "",
//           emergencyContactName: contactData.emergencyContactName || "",
//           emergencyContactNumber: contactData.emergencyContactNumber || "",
//           emergencyContactRelation: contactData.emergencyContactRelation || "",
//           preferredContactMethod: contactData.preferredContactMethod || "",
//           contactVisibility: contactData.contactVisibility || "PRIVATE",
//         };

//         console.log("Contact form data populated:", transformedData);

//         setFormData(transformedData);
//         setData(transformedData);
//         setDataLoaded(true);

//         // Find country code for the loaded country
//         if (transformedData.country) {
//           const countryObj = countries.find(c => c.name === transformedData.country);
//           if (countryObj) {
//             const updatedData = { 
//               ...transformedData, 
//               countryCode: countryObj.isoCode 
//             };
//             setFormData(updatedData);
//             setData(updatedData);
            
//             // Load states for this country
//             const countryStates = State.getStatesOfCountry(countryObj.isoCode);
//             const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
//             setStates(sortedStates);
//           }
//         }

//         setSuccessMessage("Contact details loaded successfully");
//         setTimeout(() => setSuccessMessage(""), 3000);
//       }
//     }
//   }, [residentialResponse, dataLoaded, setData, countries]);

//   // Handle error state from the query
//   useEffect(() => {
//     if (residentialError && !dataLoaded) {
//       console.log("Contact fetch error:", residentialError);

//       const errorData = residentialError.data || {};
//       const errorMessageText = errorData.message || "";
//       const isContactNotFound =
//         residentialError.status === 500 ||
//         errorMessageText.includes("contact not found") ||
//         errorMessageText.includes("Contact not found") ||
//         errorMessageText.includes("No contact found") ||
//         errorMessageText.includes("ContactNotFoundException");

//       if (isContactNotFound) {
//         setHasExistingContact(false);
//         setDataLoaded(true);
//         setSuccessMessage("No existing contact details found. Please create new ones.");
//         setTimeout(() => setSuccessMessage(""), 3000);
//       } else if (residentialError.status === 401 || residentialError.status === 403) {
//         setDataLoaded(true);
//       } else {
//         console.error("Unexpected error:", residentialError);
//         setDataLoaded(true);
//       }
//     }
//   }, [residentialError, dataLoaded]);

//   // Handle successful query with no data (new user)
//   useEffect(() => {
//     if (isSuccess && !residentialResponse?.data && !dataLoaded) {
//       console.log("No contact data found - new user");
//       setHasExistingContact(false);
//       setDataLoaded(true);
//       setSuccessMessage("No existing contact details found. Please create new ones.");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     }
//   }, [isSuccess, residentialResponse, dataLoaded]);

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
//           if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
//             err = "Only alphabets, spaces, dots and hyphens allowed";
//           }
//           break;
          
//         case "state":
//           if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
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
//       city: (formData.city || "").trim(),
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

//         // Clear any previous errors
//         setApiError("");

//         // Test if nextStep is a function
//         if (typeof nextStep === 'function') {
//           setTimeout(() => {
//             try {
//               nextStep();
//             } catch (error) {
//               console.error("Error calling nextStep:", error);
//               setApiError("Navigation failed. Please try again.");
//             }
//           }, 1000);
//         } else {
//           console.error("nextStep is not a function! Type:", typeof nextStep);
//           setApiError("Navigation error. Please contact support.");
//         }
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

//         {/* Loading State */}
//         {(isFetching || residentialLoading) && !dataLoaded && (
//           <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
//             <p className="text-blue-600 text-sm text-center">Loading your contact details...</p>
//           </div>
//         )}

//         {/* Success Message */}
//         {successMessage && (
//           <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
//             <p className="text-green-600 text-sm text-center">{successMessage}</p>
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

//           {/* CITY - SIMPLE DROPDOWN WITH HARDCODED CITIES */}
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
//             >
//               <option value="">Select City</option>
//               {cities.map((city, index) => (
//                 <option key={index} value={city.name}>
//                   {city.name}
//                 </option>
//               ))}
//               <option value="Other">Other (Please specify in address)</option>
//             </select>
            
//             {validationErrors.city && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
//             )}
            
//             <p className="text-xs text-gray-500 mt-1">
//               {cities.length} Indian cities available
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
//               placeholder="WhatsApp number (if different)"
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
//           disabled={loading || (isFetching && !dataLoaded)}
//         >
//           Previous
//         </button>

//         <button
//           disabled={!isValid || loading || (isFetching && !dataLoaded)}
//           onClick={handleNext}
//           className={`px-10 py-3 text-white rounded-lg transition-colors ${
//             isValid && !loading && !(isFetching && !dataLoaded)
//               ? "bg-orange-400 hover:bg-orange-500 cursor-pointer"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           {loading ? (
//             <>
//               <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
//               {hasExistingContact ? "Updating..." : "Saving..."}
//             </>
//           ) : (isFetching && !dataLoaded) ? (
//             "Loading..."
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















// components/registration/steps/Step6ResidentialDetails.jsx
import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";

const Step6ResidentialDetails = ({ formData, onInputChange, onNext, onBack }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Required fields
  const requiredFields = [
    "fullAddress",
    "city",
    "country",
    "pinCode",
    "mobileNumber",
    "contactVisibility"
  ];

  // Hardcoded common Indian cities
  const commonIndianCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad",
    "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane",
    "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
    "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
    "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi",
    "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai",
    "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur",
    "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
    "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad",
    "Bareilly", "Moradabad", "Mysore", "Gurgaon", "Aligarh",
    "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Mira-Bhayandar",
    "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Gorakhpur", "Guntur",
    "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai",
    "Warangal", "Cuttack", "Firozabad", "Kochi", "Bhavnagar",
    "Dehradun", "Durgapur", "Asansol", "Nanded", "Kolhapur",
    "Ajmer", "Gulbarga", "Jamnagar", "Ujjain", "Loni",
    "Siliguri", "Jhansi", "Ulhasnagar", "Nellore", "Jammu",
    "Sangli-Miraj", "Belgaum", "Mangalore", "Ambattur", "Tirunelveli",
    "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala"
  ];

  // Contact visibility options
  const contactVisibilityOptions = [
    { value: "PRIVATE", label: "Private (Only you)" },
    { value: "MEMBERS_ONLY", label: "Members Only" },
    { value: "PUBLIC", label: "Public (All users)" }
  ];

  // Emergency contact relation options
  const emergencyContactRelationOptions = [
    "Father", "Mother", "Brother", "Sister", "Spouse", 
    "Son", "Daughter", "Friend", "Other"
  ];

  // Preferred contact method options
  const preferredContactMethodOptions = [
    "Mobile", "WhatsApp", "Email", "Alternate Number"
  ];

  // Initialize countries and set default to India
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
        onInputChange("country", "India");
        onInputChange("countryCode", "IN");
        
        // Load Indian states
        const indiaStates = State.getStatesOfCountry("IN");
        const sortedStates = indiaStates.sort((a, b) => a.name.localeCompare(b.name));
        setStates(sortedStates);
      }
    }
    
    // Set cities from hardcoded list
    const sortedCities = [...commonIndianCities].sort((a, b) => a.localeCompare(b));
    setCities(sortedCities.map(city => ({ name: city })));
  }, []);

  // When country changes, load its states
  useEffect(() => {
    if (formData.countryCode) {
      const countryStates = State.getStatesOfCountry(formData.countryCode);
      const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
      setStates(sortedStates);
      
      // Reset state and city when country changes
      if (formData.state || formData.city) {
        onInputChange("state", "");
        onInputChange("stateCode", "");
        onInputChange("city", "");
      }
    }
  }, [formData.countryCode]);

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";
    const trimmedValue = value ? value.toString().trim() : "";
    
    if (requiredFields.includes(name) && trimmedValue === "") {
      error = "This field is required";
    } else if (trimmedValue !== "") {
      switch (name) {
        case "fullAddress":
          if (trimmedValue.length < 10) {
            error = "Address must be at least 10 characters";
          } else if (trimmedValue.length > 500) {
            error = "Address cannot exceed 500 characters";
          }
          break;
          
        case "streetAddress":
          if (!/^[A-Za-z0-9\s\-.,#]+$/.test(trimmedValue)) {
            error = "Only letters, numbers, spaces, hyphens, dots, commas and # allowed";
          } else if (trimmedValue.length > 200) {
            error = "Cannot exceed 200 characters";
          }
          break;
          
        case "city":
          if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
            error = "Only alphabets, spaces, dots and hyphens allowed";
          } else if (trimmedValue.length > 50) {
            error = "Cannot exceed 50 characters";
          }
          break;
          
        case "state":
          if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
            error = "Only alphabets, spaces, dots and hyphens allowed";
          } else if (trimmedValue.length > 50) {
            error = "Cannot exceed 50 characters";
          }
          break;
          
        case "pinCode":
          if (!/^\d{6}$/.test(trimmedValue)) {
            error = "Enter valid 6-digit PIN code";
          }
          break;
          
        case "mobileNumber":
          const cleanMobile = trimmedValue.replace(/[\s()-]/g, '');
          if (!/^[+]?[0-9]{10,15}$/.test(cleanMobile)) {
            error = "Enter valid 10-15 digit phone number";
          }
          break;
          
        case "alternateNumber":
          const cleanAlt = trimmedValue.replace(/[\s()-]/g, '');
          if (cleanAlt && !/^[+]?[0-9]{10,15}$/.test(cleanAlt)) {
            error = "Enter valid 10-15 digit phone number";
          }
          break;
          
        case "whatsappNumber":
          const cleanWhatsapp = trimmedValue.replace(/[\s()-]/g, '');
          if (cleanWhatsapp && !/^[+]?[0-9]{10,15}$/.test(cleanWhatsapp)) {
            error = "Enter valid 10-15 digit phone number";
          }
          break;
          
        case "emailAddress":
          if (trimmedValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
            error = "Enter valid email address";
          }
          break;
          
        case "emergencyContactName":
          if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
            error = "Only alphabets, spaces, dots and hyphens allowed";
          } else if (trimmedValue.length > 50) {
            error = "Cannot exceed 50 characters";
          }
          break;
          
        case "emergencyContactNumber":
          const cleanEmergency = trimmedValue.replace(/[\s()-]/g, '');
          if (cleanEmergency && !/^[+]?[0-9]{10,15}$/.test(cleanEmergency)) {
            error = "Enter valid 10-15 digit phone number";
          }
          break;
          
        case "emergencyContactRelation":
          if (trimmedValue && !/^[A-Za-z\s]+$/.test(trimmedValue)) {
            error = "Only alphabets and spaces allowed";
          }
          break;
          
        case "preferredContactMethod":
          if (trimmedValue && !/^[A-Za-z\s]+$/.test(trimmedValue)) {
            error = "Only alphabets and spaces allowed";
          }
          break;
          
        case "contactVisibility":
          if (!["PRIVATE", "MEMBERS_ONLY", "PUBLIC"].includes(trimmedValue)) {
            error = "Please select a valid visibility option";
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
      "streetAddress",
      "state",
      "alternateNumber",
      "whatsappNumber",
      "emailAddress",
      "emergencyContactName",
      "emergencyContactNumber",
      "emergencyContactRelation",
      "preferredContactMethod"
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
    
    // Special handling for country selection
    if (name === "country") {
      const selectedCountry = countries.find(country => country.name === value);
      if (selectedCountry) {
        onInputChange("country", selectedCountry.name);
        onInputChange("countryCode", selectedCountry.isoCode);
        onInputChange("state", "");
        onInputChange("stateCode", "");
        onInputChange("city", "");
        
        // Load states for this country
        const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
        const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
        setStates(sortedStates);
        
        // Validate the country field
        const error = validateField(name, selectedCountry.name);
        setValidationErrors(prev => ({ ...prev, [name]: error }));
        return;
      }
    }
    
    // Special handling for state selection
    if (name === "state") {
      const selectedState = states.find(state => state.name === value);
      if (selectedState) {
        onInputChange("state", selectedState.name);
        onInputChange("stateCode", selectedState.isoCode);
        onInputChange("city", "");
        
        // Validate the state field
        const error = validateField(name, selectedState.name);
        setValidationErrors(prev => ({ ...prev, [name]: error }));
        return;
      }
    }
    
    // Apply character restrictions based on field type
    switch(name) {
      case "city":
      case "state":
      case "emergencyContactName":
      case "emergencyContactRelation":
      case "preferredContactMethod":
        processedValue = value.replace(/[^A-Za-z\s.-]/g, '');
        break;
        
      case "streetAddress":
        processedValue = value.replace(/[^A-Za-z0-9\s\-.,#]/g, '');
        break;
        
      case "pinCode":
        processedValue = value.replace(/\D/g, '').slice(0, 6);
        break;
        
      case "mobileNumber":
      case "alternateNumber":
      case "whatsappNumber":
      case "emergencyContactNumber":
        processedValue = value.replace(/[^0-9+\-()\s]/g, '');
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
          Residential Address / Contact Details
        </h3>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700 mt-2 p-3" style={{ backgroundColor: "#FDF8FF" }}>
        
        {/* FULL ADDRESS */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <label style={labelStyle}>
            Full Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="fullAddress"
            value={formData.fullAddress || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your complete address (minimum 10 characters)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={{
              ...getFieldStyle("fullAddress"),
              minHeight: "80px"
            }}
            rows={3}
          />
          {touchedFields.fullAddress && validationErrors.fullAddress && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.fullAddress}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.fullAddress?.length || 0}/500 characters
          </p>
        </div>

        {/* STREET ADDRESS */}
        <div>
          <label style={labelStyle}>
            Street Address
          </label>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="House number, street"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("streetAddress")}
            maxLength={200}
          />
          {touchedFields.streetAddress && validationErrors.streetAddress && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.streetAddress}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.streetAddress?.length || 0}/200 characters
          </p>
        </div>

        {/* COUNTRY */}
        <div>
          <label style={labelStyle}>
            Country <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("country")}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.name}>
                {country.name} ({country.isoCode})
              </option>
            ))}
          </select>
          {touchedFields.country && validationErrors.country && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.country}
            </p>
          )}
        </div>

        {/* STATE */}
        <div>
          <label style={labelStyle}>
            State
          </label>
          <select
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("state")}
            disabled={!formData.country}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {touchedFields.state && validationErrors.state && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.state}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {!formData.country ? "Select a country first" : `${states.length} states available`}
          </p>
        </div>

        {/* CITY */}
        <div>
          <label style={labelStyle}>
            City <span className="text-red-500">*</span>
          </label>
          <select
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("city")}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
            <option value="Other">Other (Please specify in address)</option>
          </select>
          {touchedFields.city && validationErrors.city && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.city}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {cities.length} Indian cities available
          </p>
        </div>

        {/* PIN CODE */}
        <div>
          <label style={labelStyle}>
            PIN Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="6-digit PIN code"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("pinCode")}
            maxLength={6}
          />
          {touchedFields.pinCode && validationErrors.pinCode && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.pinCode}
            </p>
          )}
        </div>

        {/* MOBILE NUMBER */}
        <div>
          <label style={labelStyle}>
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., +91-9876543210"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("mobileNumber")}
            maxLength={15}
          />
          {touchedFields.mobileNumber && validationErrors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.mobileNumber}
            </p>
          )}
        </div>

        {/* ALTERNATE MOBILE NUMBER */}
        <div>
          <label style={labelStyle}>
            Alternate Mobile Number
          </label>
          <input
            type="text"
            name="alternateNumber"
            value={formData.alternateNumber || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Alternative contact number"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("alternateNumber")}
            maxLength={15}
          />
          {touchedFields.alternateNumber && validationErrors.alternateNumber && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.alternateNumber}
            </p>
          )}
        </div>

        {/* WHATSAPP NUMBER */}
        <div>
          <label style={labelStyle}>
            WhatsApp Number
          </label>
          <input
            type="text"
            name="whatsappNumber"
            value={formData.whatsappNumber || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="WhatsApp number"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("whatsappNumber")}
            maxLength={15}
          />
          {touchedFields.whatsappNumber && validationErrors.whatsappNumber && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.whatsappNumber}
            </p>
          )}
        </div>

        {/* EMAIL ADDRESS */}
        <div>
          <label style={labelStyle}>
            Email Address
          </label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="your.email@example.com"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("emailAddress")}
            maxLength={100}
          />
          {touchedFields.emailAddress && validationErrors.emailAddress && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.emailAddress}
            </p>
          )}
        </div>

        {/* EMERGENCY CONTACT NAME */}
        <div>
          <label style={labelStyle}>
            Emergency Contact Name
          </label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Name of emergency contact"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("emergencyContactName")}
            maxLength={50}
          />
          {touchedFields.emergencyContactName && validationErrors.emergencyContactName && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.emergencyContactName}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.emergencyContactName?.length || 0}/50 characters
          </p>
        </div>

        {/* EMERGENCY CONTACT NUMBER */}
        <div>
          <label style={labelStyle}>
            Emergency Contact Number
          </label>
          <input
            type="text"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Emergency contact phone"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("emergencyContactNumber")}
            maxLength={15}
          />
          {touchedFields.emergencyContactNumber && validationErrors.emergencyContactNumber && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.emergencyContactNumber}
            </p>
          )}
        </div>

        {/* EMERGENCY CONTACT RELATION */}
        <div>
          <label style={labelStyle}>
            Emergency Contact Relation
          </label>
          <select
            name="emergencyContactRelation"
            value={formData.emergencyContactRelation || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("emergencyContactRelation")}
          >
            <option value="">Select Relation</option>
            {emergencyContactRelationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {touchedFields.emergencyContactRelation && validationErrors.emergencyContactRelation && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.emergencyContactRelation}
            </p>
          )}
        </div>

        {/* PREFERRED CONTACT METHOD */}
        <div>
          <label style={labelStyle}>
            Preferred Contact Method
          </label>
          <select
            name="preferredContactMethod"
            value={formData.preferredContactMethod || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("preferredContactMethod")}
          >
            <option value="">Select Method</option>
            {preferredContactMethodOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {touchedFields.preferredContactMethod && validationErrors.preferredContactMethod && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.preferredContactMethod}
            </p>
          )}
        </div>

        {/* CONTACT VISIBILITY */}
        <div>
          <label style={labelStyle}>
            Contact Visibility <span className="text-red-500">*</span>
          </label>
          <select
            name="contactVisibility"
            value={formData.contactVisibility || "PRIVATE"}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("contactVisibility")}
          >
            {contactVisibilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Who can see your contact information
          </p>
          {touchedFields.contactVisibility && validationErrors.contactVisibility && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.contactVisibility}
            </p>
          )}
        </div>

      </div>

    </div>
  );
};

export default Step6ResidentialDetails;