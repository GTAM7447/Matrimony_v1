import React, { useState, useEffect, useRef } from "react";
import Stepper from "./Stepper";
import {
  useCreateFamilyBackgroundMutation,
  useGetFamilyBackgroundQuery,
  useUpdateFamilyBackgroundMutation
} from "../../context/createProfile";

const Step4FamilyBackground = ({
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
  const [formData, setFormData] = useState(data || {});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasExistingFamily, setHasExistingFamily] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [version, setVersion] = useState(null);

  // RTK Query hooks
  const [createFamilyBackground] = useCreateFamilyBackgroundMutation();
  const [updateFamilyBackground] = useUpdateFamilyBackgroundMutation();

  // GET API hook
  const {
    data: res,
    isLoading: isFetching,
    error: familyError,
    isSuccess,
    refetch,
  } = useGetFamilyBackgroundQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const apiData = res?.data;

  const requiredKeys = [
    "fathersName",
    "fatherOccupation",
    "mothersName",
    "motherOccupation",
    "brothers",
    "marriedBrothers",
    "sisters",
    "marriedSisters",
    "interCasteInFamily",
    "parentResiding",
    "mamaSurname",
    "mamaPlace",
    "familyWealth",
    "relativeSurnames",
  ];

  const isFormValid = requiredKeys.every(
    (key) => formData[key] !== undefined && formData[key] !== ""
  );

  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // AUTO-NEXT LOGIC: Load data from API and auto-navigate if step is sequential
  useEffect(() => {
    if (!isSuccess || !apiData) return;
    if (apiLoadedRef.current) return;

    apiLoadedRef.current = true;

    console.log("Family fetch response:", apiData);

    setHasExistingFamily(true);
    const familyData = apiData;

    // Get version from familyData
    setVersion(familyData.version || 0);

    // Transform backend data to form format
    const transformedData = {
      fathersName: familyData.fathersName || "",
      fatherOccupation: familyData.fatherOccupation || "",
      mothersName: familyData.mothersName || "",
      motherOccupation: familyData.motherOccupation || "",
      brothers: familyData.brother !== undefined && familyData.brother !== null ? familyData.brother.toString() : "",
      marriedBrothers: familyData.marriedBrothers !== undefined && familyData.marriedBrothers !== null ? familyData.marriedBrothers.toString() : "",
      sisters: familyData.sisters ? familyData.sisters.toString() : "",
      marriedSisters: familyData.marriedSisters ? familyData.marriedSisters.toString() : "",
      interCasteInFamily: familyData.interCasteInFamily === true ? "Yes" : "No",
      parentResiding: familyData.parentResiding || "",
      mamaSurname: familyData.mamaSurname || "",
      mamaPlace: familyData.mamaPlace || "",
      familyWealth: familyData.familyWealth || "",
      relativeSurnames: familyData.relativeSurnames || "",
    };

    console.log("Family form data populated:", transformedData);

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

    setSuccessMessage("Family background loaded successfully");
    setTimeout(() => setSuccessMessage(""), 3000);
  }, [isSuccess, apiData, step, completedStep, nextStep, setData]);

  // 404 = new user
  useEffect(() => {
    if (familyError?.status === 404 && !dataLoaded) {
      apiLoadedRef.current = true;
      setHasExistingFamily(false);
      setDataLoaded(true);
      setSuccessMessage(
        "No existing family background found. Please create new ones."
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [familyError, dataLoaded]);

  const validateField = (name, value) => {
    let err = "";
    if (!value || value.toString().trim() === "") {
      err = "This field is required";
    } else {
      // All text fields should only contain alphabets and spaces
      const alphabetOnlyRegex = /^[A-Za-z\s]+$/;

      // Fields that must contain only alphabets and spaces
      const textFields = [
        "fathersName",
        "fatherOccupation",
        "mothersName",
        "motherOccupation",
        "parentResiding",
        "mamaSurname",
        "mamaPlace",
        "familyWealth",
        "relativeSurnames"
      ];

      if (textFields.includes(name)) {
        if (!alphabetOnlyRegex.test(value)) {
          err = "Only alphabets (A-Z, a-z) and spaces allowed";
        }
      }

      if (name === "interCasteInFamily") {
        if (!/^(Yes|No)$/i.test(value)) return "Please select Yes or No";
      }

      if (["brothers", "marriedBrothers", "sisters", "marriedSisters"].includes(name)) {
        if (!/^[0-9]+$/.test(value)) return "Please select a valid number";
      }

    }
    return err;
  };

  const parseFormNumber = (value) => {
    if (!value) return 0;
    if (value === "6+") return 6;
    const num = parseInt(value, 10);
    return isNaN(num) ? 0 : num;
  };

  const validateAllFields = () => {
    // Clear previous validation errors
    const newErrors = {};

    // Validate all required fields
    requiredKeys.forEach((key) => {
      const value = formData[key] || "";
      if (!value || value.toString().trim() === "") {
        newErrors[key] = "This field is required";
      } else {
        const error = validateField(key, value);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    // Parse numbers for validation
    const brothersCount = parseFormNumber(formData.brothers);
    const marriedBrothersCount = parseFormNumber(formData.marriedBrothers);
    const sistersCount = parseFormNumber(formData.sisters);
    const marriedSistersCount = parseFormNumber(formData.marriedSisters);

    // Validate married brothers cannot exceed total brothers
    if (marriedBrothersCount > brothersCount) {
      newErrors.marriedBrothers = `Married brothers (${marriedBrothersCount}) cannot exceed total brothers (${brothersCount})`;
    }

    // Validate married sisters cannot exceed total sisters
    if (marriedSistersCount > sistersCount) {
      newErrors.marriedSisters = `Married sisters (${marriedSistersCount}) cannot exceed total sisters (${sistersCount})`;
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mark field as touched
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    const updatedData = { ...formData, [name]: value };

    // Auto-reset married brothers/sisters when total is set to None or 0
    if (name === "brothers") {
      if (value === "0") {
        updatedData.marriedBrothers = "0";
      } else if (parseFormNumber(updatedData.marriedBrothers) > parseFormNumber(value)) {
        updatedData.marriedBrothers = "0";
      }
    }

    if (name === "sisters") {
      if (value === "0") {
        updatedData.marriedSisters = "0";
      } else if (parseFormNumber(updatedData.marriedSisters) > parseFormNumber(value)) {
        updatedData.marriedSisters = "0";
      }
    }

    setFormData(updatedData);
    setData(updatedData);

    // Clear messages when user starts typing
    if (errorMessage) setErrorMessage("");

    // Validate the field
    const error = validateField(name, value);
    setValidationErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Mark field as touched
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    // Validate the field on blur
    const error = validateField(name, value);
    setValidationErrors(prev => ({ ...prev, [name]: error }));
  };

  const prepareApiData = () => {
    // Convert Yes/No → boolean
    const interCasteBool = formData.interCasteInFamily === "Yes";

    const parseNumber = (value) => {
      if (!value) return 0;
      if (value === "6+") return 6;
      const num = parseInt(value, 10);
      return isNaN(num) ? 0 : num;
    };

    const brothersCount = parseNumber(formData.brothers);
    const marriedBrothersCount = parseNumber(formData.marriedBrothers);
    const sistersCount = parseNumber(formData.sisters);
    const marriedSistersCount = parseNumber(formData.marriedSisters);

    const apiData = {
      fathersName: (formData.fathersName || "").trim(),
      fatherOccupation: (formData.fatherOccupation || "").trim(),
      mothersName: (formData.mothersName || "").trim(),
      motherOccupation: (formData.motherOccupation || "").trim(),
      brother: brothersCount,
      marriedBrothers: marriedBrothersCount,
      sisters: sistersCount,
      marriedSisters: marriedSistersCount,
      interCasteInFamily: interCasteBool,
      parentResiding: (formData.parentResiding || "").trim(),
      familyWealth: (formData.familyWealth || "").trim(),
      mamaSurname: (formData.mamaSurname || "").trim(),
      mamaPlace: (formData.mamaPlace || "").trim(),
      relativeSurnames: (formData.relativeSurnames || "").trim(),
    };

    // PATCH requires version
    if (hasExistingFamily) {
      // Use the version from state or default to 0
      apiData.version = version !== null && version !== undefined ? version : 0;
    }

    console.log("API data being sent:", apiData);
    return apiData;
  };

  // Handle form submission
  const handleNextClick = async () => {
    console.log("=== FAMILY FORM SUBMISSION STARTED ===");
    console.log("Has existing family:", hasExistingFamily);
    console.log("Current version:", version);

    // Mark all fields as touched when trying to submit
    const allTouched = {};
    requiredKeys.forEach(key => {
      allTouched[key] = true;
    });
    setTouchedFields(allTouched);

    // Check all required fields are filled
    const missingFields = requiredKeys.filter(
      (key) => !formData[key] || formData[key].toString().trim() === ""
    );

    if (missingFields.length > 0) {
      setErrorMessage(`Please fill all required fields: ${missingFields.join(", ")}`);
      console.log("Missing fields:", missingFields);
      return;
    }

    if (!validateAllFields()) {
      setErrorMessage("Please fix all validation errors");
      console.log("Validation errors:", validationErrors);
      return;
    }

    // Check authentication
    const token = localStorage.getItem("authToken");

    if (!token) {
      setErrorMessage("Please login to save family background data");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      // Prepare API data
      const apiData = prepareApiData();
      console.log("Sending family background data to API...", apiData);

      let response;

      if (hasExistingFamily) {
        console.log("Using PATCH to update existing family background");
        response = await updateFamilyBackground(apiData).unwrap();
      } else {
        console.log("Using POST to create new family background");
        response = await createFamilyBackground(apiData).unwrap();
      }

      console.log("API Response:", response);

      // Check for success response
      const isSuccessResponse =
        response.code === "201" ||
        response.statusCode === 201 ||
        response.statusCode === 200 ||
        response.success === true ||
        response.message?.toLowerCase().includes("success") ||
        response.message?.toLowerCase().includes("created") ||
        response.message?.toLowerCase().includes("updated");

      if (isSuccessResponse) {
        const successMsg = hasExistingFamily
          ? "Family background updated successfully!"
          : "Family background created successfully!";

        setSuccessMessage(successMsg);

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
        setErrorMessage(response.message || "Failed to save family background");
      }
    } catch (error) {
      console.error("=== API ERROR DETAILS ===");
      console.error("Error:", error);
      console.error("Error data:", error.data);
      console.error("Error status:", error.status);

      let errorMsg = "Failed to save family background. Please try again.";

      if (error.data) {
        // Parse the details string
        if (error.data.details) {
          // The details string looks like: "{marriedBrothersValid=Married brothers cannot exceed total brothers, version=Version is required for updates to prevent conflicts}"
          try {
            // Extract error messages from the details string
            const detailsStr = error.data.details;
            // Remove curly braces and split by comma
            const cleaned = detailsStr.replace(/[{}]/g, '');
            const errors = cleaned.split(', ');

            // Extract error messages
            const errorMessages = errors.map(err => {
              const parts = err.split('=');
              return parts.length > 1 ? parts[1] : parts[0];
            });

            errorMsg = errorMessages.join('. ');
          } catch (e) {
            // If parsing fails, use the raw details
            errorMsg = error.data.details;
          }
        } else if (error.data.message) {
          errorMsg = error.data.message;
        } else if (error.data.errors) {
          const validationErrors = Object.entries(error.data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          errorMsg = `Validation errors: ${validationErrors}`;
        }
      } else if (error.status === 400) {
        errorMsg = "Invalid data. Please check all required fields are filled correctly.";
      } else if (error.status === 500) {
        errorMsg = "Server error. Please try again later.";
      }

      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldStyle = (fieldName) => {
    const baseStyle = {
      backgroundColor: "#FF8C4405",
      border: "1px solid #8180801c",
      borderRadius: "6px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      color: "#646565ff",
      padding: "14px 12px",
    };

    // If field has been touched and has validation error, show red border
    if (touchedFields[fieldName] && validationErrors[fieldName]) {
      return {
        ...baseStyle,
        border: "1px solid #ef4444",
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
  };

  const getMarriedBrothersOptions = () => {
    const brothersValue = formData.brothers || "";

    if (!brothersValue || brothersValue === "0") {
      return [];
    }

    const maxBrothers = brothersValue === "6+" ? 6 : parseInt(brothersValue, 10);
    const options = [];

    for (let i = 0; i <= maxBrothers; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  };

  // Generate options for married sisters based on selected sisters
  const getMarriedSistersOptions = () => {
    const sistersValue = formData.sisters || "";

    if (!sistersValue || sistersValue === "0") {
      return [];
    }

    const maxSisters = sistersValue === "6+" ? 6 : parseInt(sistersValue, 10);
    const options = [];

    for (let i = 0; i <= maxSisters; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  };

  // Check authentication first
  const token = localStorage.getItem("authToken");

  if (!token) {
    return (
      <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
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
        <div
          className="px-4 sm:px-6 md:px-10 py-20 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#FF8C4405" }}
        >
          <div className="text-red-500 text-lg mb-4">
            Authentication Required
          </div>
          <p className="text-gray-600 mb-6">
            Please login to access your family background data.
          </p>
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

  // Show loading state
  if (isFetching && !dataLoaded) {
    return (
      <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
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
        <div
          className="flex justify-center items-center h-64"
          style={{ backgroundColor: "#FF8C4405" }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <span className="ml-3">Loading family background data...</span>
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
            className={`mb-6 p-3 rounded-md ${hasExistingFamily
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

        <h3 className="text-center text-orange-400 font-[Inter] font-semibold uppercase mb-8 tracking-wide text-xl">
          Family Background
        </h3>

        {/* FORM GRID */}
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-700">
          {/* FATHER'S NAME */}
          <div>
            <label style={labelStyle}>Father's Name <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="fathersName"
              value={formData.fathersName || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Father's Name"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("fathersName")}
              maxLength={50}
            />
            {touchedFields.fathersName && validationErrors.fathersName && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.fathersName}</p>
            )}
          </div>

          {/* FATHER OCCUPATION */}
          <div>
            <label style={labelStyle}>Father Occupation <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="fatherOccupation"
              value={formData.fatherOccupation || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Father Occupation"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("fatherOccupation")}
              maxLength={50}
            />
            {touchedFields.fatherOccupation && validationErrors.fatherOccupation && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.fatherOccupation}</p>
            )}
          </div>

          {/* MOTHER'S NAME */}
          <div>
            <label style={labelStyle}>Mother's Name <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="mothersName"
              value={formData.mothersName || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Mother's Name"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("mothersName")}
              maxLength={50}
            />
            {touchedFields.mothersName && validationErrors.mothersName && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.mothersName}</p>
            )}
          </div>

          {/* MOTHER OCCUPATION */}
          <div>
            <label style={labelStyle}>Mother Occupation <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="motherOccupation"
              value={formData.motherOccupation || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Mother Occupation"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("motherOccupation")}
              maxLength={50}
            />
            {touchedFields.motherOccupation && validationErrors.motherOccupation && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.motherOccupation}</p>
            )}
          </div>

          {/* BROTHERS */}
          <div>
            <label style={labelStyle}>Brothers <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="brothers"
              value={formData.brothers || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("brothers")}
            >
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6+">6+</option>
            </select>
            {touchedFields.brothers && validationErrors.brothers && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.brothers}</p>
            )}
          </div>

          {/* MARRIED BROTHERS */}
          <div>
            <label style={labelStyle}>Married Brothers <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="marriedBrothers"
              value={formData.marriedBrothers || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("marriedBrothers")}
              disabled={!formData.brothers}
            >
              {formData.brothers === "0" ? (
                <option value="0">0</option>
              ) : (
                <>
                  <option value="">Select</option>
                  {getMarriedBrothersOptions()}
                </>
              )}

            </select>
            {touchedFields.marriedBrothers && validationErrors.marriedBrothers && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.marriedBrothers}</p>
            )}
          </div>

          {/* SISTERS */}
          <div>
            <label style={labelStyle}>Sisters <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="sisters"
              value={formData.sisters || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("sisters")}
            >
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6+">6+</option>
            </select>
            {touchedFields.sisters && validationErrors.sisters && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.sisters}</p>
            )}
          </div>

          {/* MARRIED SISTERS */}
          <div>
            <label style={labelStyle}>Married Sisters <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="marriedSisters"
              value={formData.marriedSisters || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("marriedSisters")}
              disabled={!formData.sisters || formData.sisters === "0"}
            >
              {formData.sisters === "0" ? (
                <option value="0">0</option>
              ) : (
                <>
                  <option value="">Select</option>
                  {getMarriedSistersOptions()}
                </>
              )}

            </select>
            {touchedFields.marriedSisters && validationErrors.marriedSisters && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.marriedSisters}</p>
            )}
          </div>

          {/* INTER-CASTE IN FAMILY */}
          <div>
            <label style={labelStyle}>Inter-caste in Family <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="interCasteInFamily"
              value={formData.interCasteInFamily || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("interCasteInFamily")}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {touchedFields.interCasteInFamily && validationErrors.interCasteInFamily && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.interCasteInFamily}</p>
            )}
          </div>

          {/* PARENT RESIDING */}
          <div>
            <label style={labelStyle}>Parent Residing In <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="parentResiding"
              value={formData.parentResiding || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter parent residing location"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("parentResiding")}
              maxLength={100}
            />
            {touchedFields.parentResiding && validationErrors.parentResiding && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.parentResiding}</p>
            )}
          </div>

          {/* MAMA SURNAME */}
          <div>
            <label style={labelStyle}>Mama Surname <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="mamaSurname"
              value={formData.mamaSurname || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Mama Surname"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("mamaSurname")}
              maxLength={50}
            />
            {touchedFields.mamaSurname && validationErrors.mamaSurname && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.mamaSurname}</p>
            )}
          </div>

          {/* MAMA PLACE */}
          <div>
            <label style={labelStyle}>Mama Place <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="mamaPlace"
              value={formData.mamaPlace || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Mama Place"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("mamaPlace")}
              maxLength={100}
            />
            {touchedFields.mamaPlace && validationErrors.mamaPlace && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.mamaPlace}</p>
            )}
          </div>

          {/* FAMILY WEALTH */}
          <div>
            <label style={labelStyle}>Family Wealth <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="familyWealth"
              value={formData.familyWealth || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Family Wealth details"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("familyWealth")}
              maxLength={100}
            />
            {touchedFields.familyWealth && validationErrors.familyWealth && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.familyWealth}</p>
            )}
          </div>

          {/* RELATIVE SURNAMES */}
          <div>
            <label style={labelStyle}>Relative Surnames <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="relativeSurnames"
              value={formData.relativeSurnames || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Relative Surnames (comma separated)"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("relativeSurnames")}
              maxLength={200}
            />
            {touchedFields.relativeSurnames && validationErrors.relativeSurnames && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.relativeSurnames}</p>
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
          className="bg-white text-orange-600 px-10 py-3 rounded-xl cursor-pointer border border-orange-500 hover:bg-orange-50"
          disabled={isLoading}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!isFormValid || isLoading}
          onClick={handleNextClick}
          className={`px-10 py-3 rounded-xl text-white flex items-center justify-center ${isFormValid && !isLoading
            ? "bg-orange-400 hover:bg-orange-500"
            : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              {hasExistingFamily ? "Updating..." : "Creating..."}
            </>
          ) : (
            "Save & Next"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step4FamilyBackground;