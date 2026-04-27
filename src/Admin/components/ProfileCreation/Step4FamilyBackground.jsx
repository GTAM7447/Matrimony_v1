
// components/registration/steps/Step4FamilyBackground.jsx
import React, { useState } from "react";

const Step4FamilyBackground = ({ formData, onInputChange, onNext, onBack }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Number options
  const numberOptions = ["0", "1", "2", "3", "4", "5", "6+"];

  // Validate a single field (only format validation, no required check)
  const validateField = (name, value) => {
    let error = "";
    
    if (value && value.toString().trim() !== "") {
      switch(name) {
        case "fathersName":
        case "mothersName":
        case "mamaSurname":
          if (!/^[A-Za-z\s]+$/.test(value)) {
            error = "Only alphabets and spaces allowed";
          } else if (value.length > 50) {
            error = "Cannot exceed 50 characters";
          }
          break;
          
        case "fatherOccupation":
        case "motherOccupation":
        case "parentResiding":
        case "mamaPlace":
          if (!/^[A-Za-z\s.,'()\-&]+$/.test(value)) {
            error = "Only alphabets, spaces, and basic punctuation (. , ' - & ( )) allowed";
          } else if (name === "parentResiding" || name === "mamaPlace") {
            if (value.length > 100) {
              error = "Cannot exceed 100 characters";
            }
          } else if (value.length > 50) {
            error = "Cannot exceed 50 characters";
          }
          break;
          
        case "familyWealth":
          if (!/^[A-Za-z0-9\s.,'()\-&]+$/.test(value)) {
            error = "Only alphabets, numbers, spaces, and basic punctuation allowed";
          } else if (value.length > 100) {
            error = "Cannot exceed 100 characters";
          }
          break;
          
        case "relativeSurnames":
          if (!/^[A-Za-z,\s]+$/.test(value)) {
            error = "Only alphabets, commas, and spaces allowed";
          } else if (value.length > 200) {
            error = "Cannot exceed 200 characters";
          }
          break;
          
        case "interCasteInFamily":
          if (!["Yes", "No"].includes(value)) {
            error = "Please select Yes or No";
          }
          break;
          
        case "brothers":
        case "sisters":
          if (!numberOptions.includes(value)) {
            error = "Please select a valid number";
          }
          break;
          
        case "marriedBrothers":
        case "marriedSisters":
          const brothersValue = formData.brothers || "0";
          const sistersValue = formData.sisters || "0";
          
          if (value) {
            const marriedNum = parseInt(value);
            let maxAllowed = 0;
            
            if (name === "marriedBrothers") {
              maxAllowed = brothersValue === "6+" ? 6 : parseInt(brothersValue);
            } else {
              maxAllowed = sistersValue === "6+" ? 6 : parseInt(sistersValue);
            }
            
            if (marriedNum > maxAllowed) {
              error = `Cannot exceed total ${name === 'marriedBrothers' ? 'brothers' : 'sisters'}`;
            }
          }
          break;
          
        default:
          break;
      }
    }
    
    return error;
  };

  // Parse form number values
  const parseFormNumber = (value) => {
    if (!value) return 0;
    if (value === "6+") return 6;
    const num = parseInt(value, 10);
    return isNaN(num) ? 0 : num;
  };

  // Validate all fields (only format validation, not required check)
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate only fields that have values
    const allFields = [
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

    // Parse numbers for validation only if they have values
    const brothersCount = formData.brothers ? parseFormNumber(formData.brothers) : 0;
    const marriedBrothersCount = formData.marriedBrothers ? parseFormNumber(formData.marriedBrothers) : 0;
    const sistersCount = formData.sisters ? parseFormNumber(formData.sisters) : 0;
    const marriedSistersCount = formData.marriedSisters ? parseFormNumber(formData.marriedSisters) : 0;

    // Validate married brothers cannot exceed total brothers (only if both have values)
    if (formData.marriedBrothers && formData.marriedBrothers.trim() !== "" && 
        formData.brothers && formData.brothers.trim() !== "") {
      if (marriedBrothersCount > brothersCount) {
        newErrors.marriedBrothers = `Married brothers (${marriedBrothersCount}) cannot exceed total brothers (${brothersCount})`;
        isValid = false;
      }
    }

    // Validate married sisters cannot exceed total sisters (only if both have values)
    if (formData.marriedSisters && formData.marriedSisters.trim() !== "" && 
        formData.sisters && formData.sisters.trim() !== "") {
      if (marriedSistersCount > sistersCount) {
        newErrors.marriedSisters = `Married sisters (${marriedSistersCount}) cannot exceed total sisters (${sistersCount})`;
        isValid = false;
      }
    }

    setValidationErrors(newErrors);
    
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    let processedValue = value;
    
    // Apply character restrictions based on field type
    switch(name) {
      case "fathersName":
      case "mothersName":
      case "mamaSurname":
        processedValue = value.replace(/[^A-Za-z\s]/g, '');
        break;
        
      case "fatherOccupation":
      case "motherOccupation":
      case "parentResiding":
      case "mamaPlace":
        processedValue = value.replace(/[^A-Za-z\s.,'()\-&]/g, '');
        break;
        
      case "familyWealth":
        processedValue = value.replace(/[^A-Za-z0-9\s.,'()\-&]/g, '');
        break;
        
      case "relativeSurnames":
        processedValue = value.replace(/[^A-Za-z,\s]/g, '');
        break;
        
      default:
        break;
    }
    
    // Auto-reset married brothers/sisters when total is set to 0
    if (name === "brothers") {
      if (value === "0") {
        onInputChange("marriedBrothers", "0");
      } else if (parseFormNumber(formData.marriedBrothers) > parseFormNumber(value)) {
        onInputChange("marriedBrothers", "0");
      }
    }

    if (name === "sisters") {
      if (value === "0") {
        onInputChange("marriedSisters", "0");
      } else if (parseFormNumber(formData.marriedSisters) > parseFormNumber(value)) {
        onInputChange("marriedSisters", "0");
      }
    }
    
    // Update form data
    onInputChange(name, processedValue);
    
    // Validate the field (only if it has a value)
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

    // Highlight field with red border only if it has a validation error AND has been touched
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

  // Get married brothers options based on selected brothers
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

  // Get married sisters options based on selected sisters
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

  return (
    <div className="w-full mx-auto font-[Inter]">
      {/* FORM HEADER */}
      <div
        className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
        style={{ backgroundColor: "#991CDD26" }}
      >
        <h3 className="text-center text-[#991CDD] font-[Inter] font-semibold uppercase mb-4 mt-4 tracking-wide text-xl">
          Family Background
        </h3>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm text-gray-700 mt-2 p-3" style={{ backgroundColor: "#FDF8FF" }}>
        
        {/* FATHER'S NAME */}
        <div>
          <label style={labelStyle}>
            Father's Name
          </label>
          <input
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
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.fathersName}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.fathersName?.length || 0}/50 characters
          </p>
        </div>

        {/* FATHER OCCUPATION */}
        <div>
          <label style={labelStyle}>
            Father Occupation
          </label>
          <input
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
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.fatherOccupation}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.fatherOccupation?.length || 0}/50 characters
          </p>
        </div>

        {/* MOTHER'S NAME */}
        <div>
          <label style={labelStyle}>
            Mother's Name
          </label>
          <input
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
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.mothersName}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.mothersName?.length || 0}/50 characters
          </p>
        </div>

        {/* MOTHER OCCUPATION */}
        <div>
          <label style={labelStyle}>
            Mother Occupation
          </label>
          <input
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
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.motherOccupation}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.motherOccupation?.length || 0}/50 characters
          </p>
        </div>

        {/* BROTHERS */}
        <div>
          <label style={labelStyle}>
            Brothers
          </label>
          <select
            name="brothers"
            value={formData.brothers || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("brothers")}
          >
            <option value="">Select</option>
            {numberOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {touchedFields.brothers && validationErrors.brothers && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.brothers}
            </p>
          )}
        </div>

        {/* MARRIED BROTHERS */}
        <div>
          <label style={labelStyle}>
            Married Brothers
          </label>
          <select
            name="marriedBrothers"
            value={formData.marriedBrothers || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("marriedBrothers")}
          >
            <option value="">Select</option>
            {getMarriedBrothersOptions()}
          </select>
          {touchedFields.marriedBrothers && validationErrors.marriedBrothers && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.marriedBrothers}
            </p>
          )}
        </div>

        {/* SISTERS */}
        <div>
          <label style={labelStyle}>
            Sisters
          </label>
          <select
            name="sisters"
            value={formData.sisters || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("sisters")}
          >
            <option value="">Select</option>
            {numberOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {touchedFields.sisters && validationErrors.sisters && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.sisters}
            </p>
          )}
        </div>

        {/* MARRIED SISTERS */}
        <div>
          <label style={labelStyle}>
            Married Sisters
          </label>
          <select
            name="marriedSisters"
            value={formData.marriedSisters || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("marriedSisters")}
          >
            <option value="">Select</option>
            {getMarriedSistersOptions()}
          </select>
          {touchedFields.marriedSisters && validationErrors.marriedSisters && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.marriedSisters}
            </p>
          )}
        </div>

        {/* INTER-CASTE IN FAMILY */}
        <div>
          <label style={labelStyle}>
            Inter-caste in Family
          </label>
          <select
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
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.interCasteInFamily}
            </p>
          )}
        </div>

        {/* PARENT RESIDING */}
        <div>
          <label style={labelStyle}>
            Parent Residing In
          </label>
          <input
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
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.parentResiding}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.parentResiding?.length || 0}/100 characters
          </p>
        </div>

        {/* MAMA SURNAME */}
        <div>
          <label style={labelStyle}>
            Mama Surname
          </label>
          <input
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
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.mamaSurname}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.mamaSurname?.length || 0}/50 characters
          </p>
        </div>

        {/* MAMA PLACE */}
        <div>
          <label style={labelStyle}>
            Mama Place
          </label>
          <input
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
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.mamaPlace}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.mamaPlace?.length || 0}/100 characters
          </p>
        </div>

        {/* FAMILY WEALTH */}
        <div>
          <label style={labelStyle}>
            Family Wealth
          </label>
          <input
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
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.familyWealth}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.familyWealth?.length || 0}/100 characters
          </p>
        </div>

        {/* RELATIVE SURNAMES */}
        <div>
          <label style={labelStyle}>
            Relative Surnames
          </label>
          <input
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
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.relativeSurnames}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.relativeSurnames?.length || 0}/200 characters
          </p>
        </div>

      </div>
    </div>
  );
};

export default Step4FamilyBackground;