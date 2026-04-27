
// components/registration/steps/Step5PartnerExpectations.jsx
import React, { useState, useEffect } from "react";
import { Country } from "country-state-city";

const Step5PartnerExpectations = ({ formData, onInputChange, onNext, onBack }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [countries, setCountries] = useState([]);

  // No required fields - all are optional
  const requiredFields = [];

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

  // Validate a single field (only format validation, no required validation)
  const validateField = (name, value) => {
    let error = "";
    
    if (value && value.toString().trim() !== "") {
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
            error = "Income must be at least â‚¹1,00,000";
          } else if (income > 50000000) {
            error = "Income cannot exceed â‚¹5,00,00,000";
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

  // Validate all fields (only format validation)
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate all fields if they have value
    const allFields = [
      "ageRange",
      "lookingFor",
      "heightRange",
      "partnerComplexion",
      "partnerReligion",
      "partnerCaste",
      "partnerSubCaste",
      "partnerEducation",
      "residentStatus",
      "partnerOccupation",
      "partnerIncome",
      "countryLivingIn",
      "cityLivingIn",
      "stateLivingIn",
      "eatingHabits",
      "partnerDrinkingHabits",
      "partnerSmokingHabits",
      "mangal",
      "partnerMaritalStatus",
      "partnerMotherTongue",
      "partnerAdditionalPreferences"
    ];
    
    allFields.forEach(field => {
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
    
    // Mark all filled fields as touched to show errors
    const allTouched = {};
    allFields.forEach(field => {
      if (formData[field] && formData[field].toString().trim() !== "") {
        allTouched[field] = true;
      }
    });
    setTouchedFields(prev => ({ ...prev, ...allTouched }));
    
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched only if it has a value
    if (value && value.toString().trim() !== "") {
      setTouchedFields(prev => ({ ...prev, [name]: true }));
    }
    
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
    
    // Validate the field only if it has a value
    if (processedValue && processedValue.toString().trim() !== "") {
      const error = validateField(name, processedValue);
      setValidationErrors(prev => ({ ...prev, [name]: error }));
    } else {
      // Clear error if field is empty
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark as touched only if it has a value
    if (value && value.toString().trim() !== "") {
      setTouchedFields(prev => ({ ...prev, [name]: true }));
      
      const error = validateField(name, value);
      setValidationErrors(prev => ({ ...prev, [name]: error }));
    }
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

  return (
    <div className="w-full mx-auto font-[Inter]">
      {/* FORM HEADER */}
      <div
        className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
        style={{ backgroundColor: "#991CDD26" }}
      >
        <h3 className="text-center text-[#991CDD] font-[Inter] font-semibold uppercase mb-4 mt-4 tracking-wide text-xl">
          Partner Expectations (Optional)
        </h3>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm text-gray-700 mt-2 p-3" style={{ backgroundColor: "#FDF8FF" }}>
        
        {/* AGE RANGE */}
        <div>
          <label style={labelStyle}>
            Age Range
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
            Looking For
          </label>
          <select
            name="lookingFor"
            value={formData.lookingFor || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("lookingFor")}
          >
            <option value="">Select (optional)</option>
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
            Height Range
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
            Complexion
          </label>
          <select
            name="partnerComplexion"
            value={formData.partnerComplexion || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerComplexion")}
          >
            <option value="">Select (optional)</option>
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
            Religion
          </label>
          <select
            name="partnerReligion"
            value={formData.partnerReligion || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("partnerReligion")}
          >
            <option value="">Select (optional)</option>
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
            Caste
          </label>
          <input
            type="text"
            name="partnerCaste"
            value={formData.partnerCaste || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter caste (optional)"
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

        {/* SUB-CASTE */}
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
            Education
          </label>
          <input
            type="text"
            name="partnerEducation"
            value={formData.partnerEducation || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Education (optional)"
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
            Resident Status
          </label>
          <select
            name="residentStatus"
            value={formData.residentStatus || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("residentStatus")}
          >
            <option value="">Select (optional)</option>
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
            Occupation
          </label>
          <input
            type="text"
            name="partnerOccupation"
            value={formData.partnerOccupation || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Occupation (optional)"
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
            Income (per year)
          </label>
          <input
            type="text"
            name="partnerIncome"
            value={formData.partnerIncome || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter income in rupees (optional)"
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
            Annual income (â‚¹1,00,000 - â‚¹5,00,00,000)
          </p>
        </div>

        {/* COUNTRY */}
        <div>
          <label style={labelStyle}>
            Country Living in
          </label>
          <select
            name="countryLivingIn"
            value={formData.countryLivingIn || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("countryLivingIn")}
          >
            <option value="">Select Country (optional)</option>
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
            City Living in
          </label>
          <input
            type="text"
            name="cityLivingIn"
            value={formData.cityLivingIn || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter city (optional)"
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

        {/* STATE */}
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
            Eating Habits
          </label>
          <select
            name="eatingHabits"
            value={formData.eatingHabits || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("eatingHabits")}
          >
            <option value="">Select (optional)</option>
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

        {/* DRINKING HABITS */}
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

        {/* SMOKING HABITS */}
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
            Mangal (Kuja Dosha)
          </label>
          <select
            name="mangal"
            value={formData.mangal || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("mangal")}
          >
            <option value="">Select (optional)</option>
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

        {/* MARITAL STATUS */}
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

        {/* MOTHER TONGUE */}
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

        {/* ADDITIONAL PREFERENCES */}
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