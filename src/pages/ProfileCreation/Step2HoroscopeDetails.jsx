// import React, { useEffect, useRef, useState } from "react";
// import Stepper from "./Stepper";
// import { City } from "country-state-city";
// import {
//   useCreateHoroscopeDetailsMutation,
//   useGetHoroscopeDetailsQuery,
//   useUpdateHoroscopeDetailsMutation,
// } from "../../context/createProfile";

// const Step2HoroscopeDetails = ({
//   nextStep,
//   prevStep,
//   goToStep,
//   data,
//   setData,
//   step,
//   completedStep,
// }) => {
//   const autoNextRef = useRef(false);
//   const apiLoadedRef = useRef(false);

//   const [districts, setDistricts] = useState([]);
//   const [formData, setFormData] = useState(data || {});
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [hasExistingHoroscope, setHasExistingHoroscope] = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const [version, setVersion] = useState(0);

//   const [createHoroscopeDetails] = useCreateHoroscopeDetailsMutation();
//   const [updateHoroscopeDetails] = useUpdateHoroscopeDetailsMutation();

//   const {
//     data: res,
//     isLoading: isFetching,
//     error: horoscopeError,
//     isSuccess,
//     refetch,
//   } = useGetHoroscopeDetailsQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   const apiData = res?.data;

//   const requiredKeys = [
//     "dob",
//     "time",
//     "birthPlace",
//     "rashi",
//     "nakshatra",
//     "charan",
//     "nadi",
//     "gan",
//     "mangal",
//     "gotra",
//     "devak",
//   ];

//   const isFormValid = requiredKeys.every(
//     (key) => formData[key] !== undefined && formData[key] !== ""
//   );

//   const [validationErrors, setValidationErrors] = useState({});

//   // AUTO-NEXT LOGIC: Load data from API and auto-navigate if step is sequential
//   useEffect(() => {
//     if (!isSuccess || !apiData) return;
//     if (apiLoadedRef.current) return;

//     apiLoadedRef.current = true;

//     const horoscopeData = apiData;
//     setHasExistingHoroscope(true);
//     setVersion(horoscopeData.version || 0);

//     const formatDateForInput = (dateString) => {
//       if (!dateString) return "";
//       const d = new Date(dateString);
//       return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
//     };

//     const transformedData = {
//       dob: formatDateForInput(horoscopeData.dob),
//       time: horoscopeData.time || "",
//       birthPlace: horoscopeData.birthPlace || "",
//       rashi: horoscopeData.rashi || "",
//       nakshatra: horoscopeData.nakshatra || "",
//       charan: horoscopeData.charan || "",
//       nadi: horoscopeData.nadi || "",
//       gan: horoscopeData.gan || "",
//       mangal: horoscopeData.mangal || "",
//       gotra: horoscopeData.gotra || "",
//       devak: horoscopeData.devak || "",
//     };

//     // ✅ ALWAYS load data
//     setFormData(transformedData);
//     setData(transformedData);
//     setDataLoaded(true);

//     // ✅ auto-next only once and only in sequence
//     if (
//       !autoNextRef.current &&
//       Object.keys(transformedData).length > 0 &&
//       step === completedStep + 1
//     ) {
//       autoNextRef.current = true;
//       setTimeout(() => {
//         console.log("Auto-navigating to next step...");
//         nextStep();
//       }, 0);
//     }

//     setSuccessMessage("Horoscope details loaded successfully");
//     setTimeout(() => setSuccessMessage(""), 3000);
//   }, [isSuccess, apiData, step, completedStep, nextStep, setData]);

//   // 404 = new user
//   useEffect(() => {
//     if (horoscopeError?.status === 404 && !dataLoaded) {
//       apiLoadedRef.current = true;
//       setHasExistingHoroscope(false);
//       setDataLoaded(true);
//       setSuccessMessage("No existing horoscope found. Please create a new one.");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     }
//   }, [horoscopeError, dataLoaded]);

//   // districts
//   useEffect(() => {
//     const cities = City.getCitiesOfState("IN", "MH");
//     setDistricts(cities);
//   }, []);

//   const validateField = (name, value) => {
//     let err = "";
//     if (!value || value.toString().trim() === "") {
//       err = "This field is required";
//     }
//     setValidationErrors((prev) => ({ ...prev, [name]: err }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updated = { ...formData, [name]: value };
//     setFormData(updated);
//     setData(updated);
//     validateField(name, value);
//     if (errorMessage) setErrorMessage("");
//   };

//   const prepareApiData = () => {
//     const dob = formData.dob
//       ? new Date(formData.dob).toISOString().split("T")[0]
//       : "";

//     const base = {
//       dob,
//       time: formData.time?.trim(),
//       birthPlace: formData.birthPlace?.trim(),
//       rashi: formData.rashi?.trim(),
//       nakshatra: formData.nakshatra?.trim(),
//       charan: formData.charan?.trim(),
//       nadi: formData.nadi?.trim(),
//       gan: formData.gan?.trim(),
//       mangal: formData.mangal?.trim(),
//       gotra: formData.gotra?.trim(),
//       devak: formData.devak?.trim(),
//     };

//     return hasExistingHoroscope ? { ...base, version } : base;
//   };

//   const handleNextClick = async () => {
//     if (!isFormValid) {
//       setErrorMessage("Please fill all required fields");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setErrorMessage("");
//       setSuccessMessage("");

//       const apiData = prepareApiData();

//       if (hasExistingHoroscope) {
//         const response = await updateHoroscopeDetails(apiData).unwrap();
//         if (response?.data?.version !== undefined) {
//           setVersion(response.data.version);
//         }
//         setSuccessMessage("Horoscope details updated successfully!");
//       } else {
//         await createHoroscopeDetails(apiData).unwrap();
//         setHasExistingHoroscope(true);
//         setSuccessMessage("Horoscope details created successfully!");
//       }

//       await refetch();
      
//       // Navigate to next step after successful save
//       setTimeout(() => {
//         nextStep();
//       }, 500);
      
//     } catch (error) {
//       console.error("Horoscope save error:", error);
//       setErrorMessage("Failed to save horoscope details. Please try again.");
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

//   const token = localStorage.getItem("authToken");

//   if (!token) {
//     return (
//       <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
//         <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
//         <div className="px-4 sm:px-6 md:px-10 py-20 flex flex-col items-center justify-center" style={{ backgroundColor: "#FF8C4405" }}>
//           <div className="text-red-500 text-lg mb-4">Authentication Required</div>
//           <p className="text-gray-600 mb-6">Please login to access your profile data.</p>
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
//         <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
//         <div className="flex justify-center items-center h-64" style={{ backgroundColor: "#FF8C4405" }}>
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//           <span className="ml-3">Loading horoscope data...</span>
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
//         {/* Status Messages */}
//         {successMessage && (
//           <div
//             className={`mb-6 p-3 rounded-md ${hasExistingHoroscope
//               ? "bg-green-50 border border-green-200 text-green-600"
//               : "bg-blue-50 border border-blue-200 text-blue-600"
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

//         <h3 className="text-center text-orange-400 font-semibold uppercase mb-8 text-xl">
//           Horoscope Details
//         </h3>

//         <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-700">
//           {/* DATE OF BIRTH */}
//           <div>
//             <label style={labelStyle}>Date of Birth <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="date"
//               name="dob"
//               value={formData.dob || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             {validationErrors.dob && (
//               <p className="text-red-500 text-xs">{validationErrors.dob}</p>
//             )}
//           </div>

//           {/* TIME OF BIRTH */}
//           <div>
//             <label style={labelStyle}>Time of Birth <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="time"
//               name="time"
//               value={formData.time || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             {validationErrors.time && (
//               <p className="text-red-500 text-xs">{validationErrors.time}</p>
//             )}
//           </div>

//           {/* BIRTH PLACE */}
//           <div>
//             <label style={labelStyle}>Birth Place <span style={{ color: "red" }}>*</span></label>
//             <select
//               required
//               name="birthPlace"
//               value={formData.birthPlace || ""}
//               onChange={handleChange}
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
//               style={fieldStyle}
//             >
//               <option value="">Select Birth Place</option>
//               {districts.map((district, index) => (
//                 <option key={index} value={district.name}>
//                   {district.name}
//                 </option>
//               ))}
//             </select>
//             {validationErrors.birthPlace && (
//               <p className="text-red-500 text-xs">{validationErrors.birthPlace}</p>
//             )}
//           </div>

//           {/* RASHI */}
//           <div>
//             <label style={labelStyle}>Rashi <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="rashi"
//               value={formData.rashi || ""}
//               onChange={handleChange}
//               placeholder="Enter Rashi"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             {validationErrors.rashi && (
//               <p className="text-red-500 text-xs">{validationErrors.rashi}</p>
//             )}
//           </div>

//           {/* NAKSHATRA */}
//           <div>
//             <label style={labelStyle}>Nakshatra <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="nakshatra"
//               value={formData.nakshatra || ""}
//               onChange={handleChange}
//               placeholder="Enter Nakshatra"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             {validationErrors.nakshatra && (
//               <p className="text-red-500 text-xs">{validationErrors.nakshatra}</p>
//             )}
//           </div>

//           {/* CHARAN */}
//           <div>
//             <label style={labelStyle}>Charan <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="charan"
//               value={formData.charan || ""}
//               onChange={handleChange}
//               placeholder="Enter Charan"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             {validationErrors.charan && (
//               <p className="text-red-500 text-xs">{validationErrors.charan}</p>
//             )}
//           </div>

//           {/* NADI */}
//           <div>
//             <label style={labelStyle}>Nadi <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="nadi"
//               value={formData.nadi || ""}
//               onChange={handleChange}
//               placeholder="Enter Nadi"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             {validationErrors.nadi && (
//               <p className="text-red-500 text-xs">{validationErrors.nadi}</p>
//             )}
//           </div>

//           {/* GAN */}
//           <div>
//             <label style={labelStyle}>Gan <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="gan"
//               value={formData.gan || ""}
//               onChange={handleChange}
//               placeholder="Enter Gan"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             {validationErrors.gan && (
//               <p className="text-red-500 text-xs">{validationErrors.gan}</p>
//             )}
//           </div>

//           {/* MANGAL */}
//           <div>
//             <label style={labelStyle}>Mangal <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="mangal"
//               value={formData.mangal || ""}
//               onChange={handleChange}
//               placeholder="Enter Mangal"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             {validationErrors.mangal && (
//               <p className="text-red-500 text-xs">{validationErrors.mangal}</p>
//             )}
//           </div>

//           {/* GOTRA */}
//           <div>
//             <label style={labelStyle}>Gotra <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="gotra"
//               value={formData.gotra || ""}
//               onChange={handleChange}
//               placeholder="Enter Gotra"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             {validationErrors.gotra && (
//               <p className="text-red-500 text-xs">{validationErrors.gotra}</p>
//             )}
//           </div>

//           {/* DEVAK */}
//           <div>
//             <label style={labelStyle}>Devak <span style={{ color: "red" }}>*</span></label>
//             <input
//               required
//               type="text"
//               name="devak"
//               value={formData.devak || ""}
//               onChange={handleChange}
//               placeholder="Enter Devak"
//               className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
//               style={fieldStyle}
//             />
//             {validationErrors.devak && (
//               <p className="text-red-500 text-xs">{validationErrors.devak}</p>
//             )}
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
//           className="bg-white text-orange-600 px-10 py-3 rounded-xl border border-orange-500 hover:bg-orange-50"
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
//               {hasExistingHoroscope ? "Updating..." : "Creating..."}
//             </>
//           ) : (
//             "Save & Next"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step2HoroscopeDetails;






























import React, { useEffect, useRef, useState } from "react";
import Stepper from "./Stepper";
import { City } from "country-state-city";
import {
  useCreateHoroscopeDetailsMutation,
  useGetHoroscopeDetailsQuery,
  useUpdateHoroscopeDetailsMutation,
} from "../../context/createProfile";

const Step2HoroscopeDetails = ({
  nextStep,
  prevStep,
  goToStep,
  data,
  setData,
  step,
  completedStep,
}) => {
  const autoNextRef = useRef(false);
  const apiLoadedRef = useRef(false);

  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState(data || {});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasExistingHoroscope, setHasExistingHoroscope] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [version, setVersion] = useState(0);

  const [createHoroscopeDetails] = useCreateHoroscopeDetailsMutation();
  const [updateHoroscopeDetails] = useUpdateHoroscopeDetailsMutation();

  const {
    data: res,
    isLoading: isFetching,
    error: horoscopeError,
    isSuccess,
    refetch,
  } = useGetHoroscopeDetailsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const apiData = res?.data;

  // Dropdown options for horoscope fields
  const rashiOptions = [
    "Mesh (Aries)",
    "Vrishabh (Taurus)",
    "Mithun (Gemini)",
    "Karka (Cancer)",
    "Simha (Leo)",
    "Kanya (Virgo)",
    "Tula (Libra)",
    "Vrishchik (Scorpio)",
    "Dhanu (Sagittarius)",
    "Makar (Capricorn)",
    "Kumbh (Aquarius)",
    "Meen (Pisces)"
  ];

  const nakshatraOptions = [
    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishta",
    "Shatabhisha",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati"
  ];

  const charanOptions = ["1", "2", "3", "4"];

  const nadiOptions = [
    "Adi (Vata)",
    "Madhya (Pitta)",
    "Antya (Kapha)"
  ];

  const ganOptions = [
    "Dev (God-like)",
    "Manushya (Human)",
    "Rakshas (Demon-like)"
  ];

  const mangalOptions = [
    "Yes",
    "No",
    "Partial"
  ];

  const gotraOptions = [
    "Agastya",
    "Atri",
    "Bharadvaja",
    "Gautam",
    "Harita",
    "Jamadagni",
    "Kashyapa",
    "Koundinya",
    "Maitreya",
    "Marichi",
    "Mudgal",
    "Niyog",
    "Parashar",
    "Sandilya",
    "Sankrit",
    "Shandilya",
    "Vashishtha",
    "Vishnu",
    "Vishvamitra",
    "Yagnavalkya"
  ];

  const devakOptions = [
    "Shiva",
    "Vishnu",
    "Durga",
    "Ganesha",
    "Kartikeya",
    "Hanuman",
    "Rama",
    "Krishna",
    "Lakshmi",
    "Saraswati",
    "Brahma",
    "Surya",
    "Chandra",
    "Indra",
    "Varuna",
    "Vayu",
    "Agni",
    "Yama",
    "Kamadeva",
    "Narada"
  ];

  const requiredKeys = [
    "dob",
    "time",
    "birthPlace",
    "rashi",
    "nakshatra",
    "charan",
    "nadi",
    "gan",
    "mangal",
    "gotra",
    "devak",
  ];

  const isFormValid = requiredKeys.every(
    (key) => formData[key] !== undefined && formData[key] !== ""
  );

  const [validationErrors, setValidationErrors] = useState({});

  // AUTO-NEXT LOGIC: Load data from API and auto-navigate if step is sequential
  useEffect(() => {
    if (!isSuccess || !apiData) return;
    if (apiLoadedRef.current) return;

    apiLoadedRef.current = true;

    const horoscopeData = apiData;
    setHasExistingHoroscope(true);
    setVersion(horoscopeData.version || 0);

    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      const d = new Date(dateString);
      return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
    };

    const transformedData = {
      dob: formatDateForInput(horoscopeData.dob),
      time: horoscopeData.time || "",
      birthPlace: horoscopeData.birthPlace || "",
      rashi: horoscopeData.rashi || "",
      nakshatra: horoscopeData.nakshatra || "",
      charan: horoscopeData.charan || "",
      nadi: horoscopeData.nadi || "",
      gan: horoscopeData.gan || "",
      mangal: horoscopeData.mangal || "",
      gotra: horoscopeData.gotra || "",
      devak: horoscopeData.devak || "",
    };

    // ALWAYS load data
    setFormData(transformedData);
    setData(transformedData);
    setDataLoaded(true);

    // auto-next only once and only in sequence
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

    setSuccessMessage("Horoscope details loaded successfully");
    setTimeout(() => setSuccessMessage(""), 3000);
  }, [isSuccess, apiData, step, completedStep, nextStep, setData]);

  // 404 = new user
  useEffect(() => {
    if (horoscopeError?.status === 404 && !dataLoaded) {
      apiLoadedRef.current = true;
      setHasExistingHoroscope(false);
      setDataLoaded(true);
      setSuccessMessage("No existing horoscope found. Please create a new one.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [horoscopeError, dataLoaded]);

  // districts
  useEffect(() => {
    const cities = City.getCitiesOfState("IN", "MH");
    setDistricts(cities);
  }, []);

  const validateField = (name, value) => {
    let err = "";
    if (!value || value.toString().trim() === "") {
      err = "This field is required";
    }
    setValidationErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setData(updated);
    validateField(name, value);
    if (errorMessage) setErrorMessage("");
  };

  const prepareApiData = () => {
    const dob = formData.dob
      ? new Date(formData.dob).toISOString().split("T")[0]
      : "";

    const base = {
      dob,
      time: formData.time?.trim(),
      birthPlace: formData.birthPlace?.trim(),
      rashi: formData.rashi?.trim(),
      nakshatra: formData.nakshatra?.trim(),
      charan: formData.charan?.trim(),
      nadi: formData.nadi?.trim(),
      gan: formData.gan?.trim(),
      mangal: formData.mangal?.trim(),
      gotra: formData.gotra?.trim(),
      devak: formData.devak?.trim(),
    };

    return hasExistingHoroscope ? { ...base, version } : base;
  };

  const handleNextClick = async () => {
    if (!isFormValid) {
      setErrorMessage("Please fill all required fields");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const apiData = prepareApiData();

      if (hasExistingHoroscope) {
        const response = await updateHoroscopeDetails(apiData).unwrap();
        if (response?.data?.version !== undefined) {
          setVersion(response.data.version);
        }
        setSuccessMessage("Horoscope details updated successfully!");
      } else {
        await createHoroscopeDetails(apiData).unwrap();
        setHasExistingHoroscope(true);
        setSuccessMessage("Horoscope details created successfully!");
      }

      await refetch();
      
      // Navigate to next step after successful save
      setTimeout(() => {
        nextStep();
      }, 500);
      
    } catch (error) {
      console.error("Horoscope save error:", error);
      setErrorMessage("Failed to save horoscope details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fieldStyle = {
    backgroundColor: "#FF8C4405",
    border: "1px solid #8180801c",
    borderRadius: "6px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    color: "#646565ff",
    padding: "14px 12px",
  };

  const labelStyle = {
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    marginBottom: "4px",
  };

  const token = localStorage.getItem("authToken");

  if (!token) {
    return (
      <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
        <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
        <div className="px-4 sm:px-6 md:px-10 py-20 flex flex-col items-center justify-center" style={{ backgroundColor: "#FF8C4405" }}>
          <div className="text-red-500 text-lg mb-4">Authentication Required</div>
          <p className="text-gray-600 mb-6">Please login to access your profile data.</p>
          <button
            onClick={() => (window.location.href = "/signin")}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isFetching && !dataLoaded) {
    return (
      <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
        <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
        <div className="flex justify-center items-center h-64" style={{ backgroundColor: "#FF8C4405" }}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <span className="ml-3">Loading horoscope data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
      {/* STEP HEADER */}
      <div
        className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
        style={{ backgroundColor: "#FF8C4426" }}
      >
        <Stepper
          step={step}
          completedStep={completedStep}
          goToStep={goToStep}
        />
      </div>

      {/* MAIN FORM BOX */}
      <div
        className="px-4 sm:px-6 md:px-10 py-8"
        style={{ backgroundColor: "#FF8C4405" }}
      >
        {/* Status Messages */}
        {successMessage && (
          <div
            className={`mb-6 p-3 rounded-md ${hasExistingHoroscope
              ? "bg-green-50 border border-green-200 text-green-600"
              : "bg-blue-50 border border-blue-200 text-blue-600"
              }`}
          >
            <p className="text-sm text-center">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          </div>
        )}

        <h3 className="text-center text-orange-400 font-semibold uppercase mb-8 text-xl">
          Horoscope Details
        </h3>

        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-700">
          {/* DATE OF BIRTH */}
          <div>
            <label style={labelStyle}>Date of Birth <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            />
            {validationErrors.dob && (
              <p className="text-red-500 text-xs">{validationErrors.dob}</p>
            )}
          </div>

          {/* TIME OF BIRTH */}
          <div>
            <label style={labelStyle}>Time of Birth <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="time"
              name="time"
              value={formData.time || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            />
            {validationErrors.time && (
              <p className="text-red-500 text-xs">{validationErrors.time}</p>
            )}
          </div>

          {/* BIRTH PLACE */}
          <div>
            <label style={labelStyle}>Birth Place <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="birthPlace"
              value={formData.birthPlace || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
              style={fieldStyle}
            >
              <option value="">Select Birth Place</option>
              {districts.map((district, index) => (
                <option key={index} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
            {validationErrors.birthPlace && (
              <p className="text-red-500 text-xs">{validationErrors.birthPlace}</p>
            )}
          </div>

          {/* RASHI */}
          <div>
            <label style={labelStyle}>Rashi <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="rashi"
              value={formData.rashi || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Rashi</option>
              {rashiOptions.map((rashi, index) => (
                <option key={index} value={rashi}>{rashi}</option>
              ))}
            </select>
            {validationErrors.rashi && (
              <p className="text-red-500 text-xs">{validationErrors.rashi}</p>
            )}
          </div>

          {/* NAKSHATRA */}
          <div>
            <label style={labelStyle}>Nakshatra <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="nakshatra"
              value={formData.nakshatra || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Nakshatra</option>
              {nakshatraOptions.map((nakshatra, index) => (
                <option key={index} value={nakshatra}>{nakshatra}</option>
              ))}
            </select>
            {validationErrors.nakshatra && (
              <p className="text-red-500 text-xs">{validationErrors.nakshatra}</p>
            )}
          </div>

          {/* CHARAN */}
          <div>
            <label style={labelStyle}>Charan <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="charan"
              value={formData.charan || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Charan</option>
              {charanOptions.map((charan, index) => (
                <option key={index} value={charan}>{charan}</option>
              ))}
            </select>
            {validationErrors.charan && (
              <p className="text-red-500 text-xs">{validationErrors.charan}</p>
            )}
          </div>

          {/* NADI */}
          <div>
            <label style={labelStyle}>Nadi <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="nadi"
              value={formData.nadi || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Nadi</option>
              {nadiOptions.map((nadi, index) => (
                <option key={index} value={nadi}>{nadi}</option>
              ))}
            </select>
            {validationErrors.nadi && (
              <p className="text-red-500 text-xs">{validationErrors.nadi}</p>
            )}
          </div>

          {/* GAN */}
          <div>
            <label style={labelStyle}>Gan <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="gan"
              value={formData.gan || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Gan</option>
              {ganOptions.map((gan, index) => (
                <option key={index} value={gan}>{gan}</option>
              ))}
            </select>
            {validationErrors.gan && (
              <p className="text-red-500 text-xs">{validationErrors.gan}</p>
            )}
          </div>

          {/* MANGAL */}
          <div>
            <label style={labelStyle}>Mangal <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="mangal"
              value={formData.mangal || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Mangal</option>
              {mangalOptions.map((mangal, index) => (
                <option key={index} value={mangal}>{mangal}</option>
              ))}
            </select>
            {validationErrors.mangal && (
              <p className="text-red-500 text-xs">{validationErrors.mangal}</p>
            )}
          </div>

          {/* GOTRA */}
          <div>
            <label style={labelStyle}>Gotra <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="gotra"
              value={formData.gotra || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Gotra</option>
              {gotraOptions.map((gotra, index) => (
                <option key={index} value={gotra}>{gotra}</option>
              ))}
            </select>
            {validationErrors.gotra && (
              <p className="text-red-500 text-xs">{validationErrors.gotra}</p>
            )}
          </div>

          {/* DEVAK */}
          <div>
            <label style={labelStyle}>Devak <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="devak"
              value={formData.devak || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Devak</option>
              {devakOptions.map((devak, index) => (
                <option key={index} value={devak}>{devak}</option>
              ))}
            </select>
            {validationErrors.devak && (
              <p className="text-red-500 text-xs">{validationErrors.devak}</p>
            )}
          </div>
        </form>
      </div>

      {/* BUTTON ROW */}
      <div
        className="border-gray-300 flex justify-end items-center gap-4 py-4 px-4 sm:px-6 md:px-10"
        style={{ backgroundColor: "#FF8C4405" }}
      >
        <button
          type="button"
          onClick={prevStep}
          className="bg-white text-orange-600 px-10 py-3 rounded-xl border border-orange-500 hover:bg-orange-50"
          disabled={isLoading}
        >
          Previous
        </button>

        <button
          type="button"
          disabled={!isFormValid || isLoading}
          onClick={handleNextClick}
          className={`px-10 py-3 rounded-xl text-white flex items-center justify-center ${
            isFormValid && !isLoading
              ? "bg-orange-400 hover:bg-orange-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              {hasExistingHoroscope ? "Updating..." : "Creating..."}
            </>
          ) : (
            "Save & Next"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step2HoroscopeDetails;