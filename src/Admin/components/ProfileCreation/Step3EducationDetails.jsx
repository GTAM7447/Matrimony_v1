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

  // Validate a single field (only format validation, no required check)
  const validateField = (name, value) => {
    let error = "";
    
    if (value && value.toString().trim() !== "") {
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
    if (!income || !experience) return "";
    
    const incomeNum = parseInt(income) || 0;
    const experienceNum = parseInt(experience) || 0;
    
    if (incomeNum > 5000000 && experienceNum < 2) {
      return "Income > ₹50L requires minimum 2 years experience";
    }
    return "";
  };

  // Validate occupation details
  const validateOccupationDetails = (occupation, occupationDetails) => {
    if (!occupation || !occupationDetails) return "";
    
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

  // Validate all fields (only format validation, not required check)
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate only fields that have values
    const allFields = [
      "education",
      "degree",
      "occupation",
      "occupationDetails",
      "experienceYears",
      "incomePerYear",
      "companyName",
      "workLocation",
      "additionalDetails"
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

    // Validate income-experience rule (only if both have values)
    if (formData.incomePerYear && formData.incomePerYear.trim() !== "" && 
        formData.experienceYears && formData.experienceYears.trim() !== "") {
      const incomeExpError = validateIncomeWithExperience(formData.incomePerYear, formData.experienceYears);
      if (incomeExpError) {
        newErrors.incomePerYear = incomeExpError;
        isValid = false;
      }
    }

    // Validate occupation details rule (only if occupation has value)
    if (formData.occupation && formData.occupation.trim() !== "") {
      const occupationError = validateOccupationDetails(formData.occupation, formData.occupationDetails);
      if (occupationError) {
        newErrors.occupationDetails = occupationError;
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
            Education Level
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
            Degree / Specialization
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
            Occupation
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
            placeholder="Describe your role, responsibilities, etc."
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
            Annual Income (₹)
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