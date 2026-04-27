
// components/registration/steps/Step1BasicInfo.jsx
import React, { useState } from "react";
import { City } from "country-state-city";

const Step1BasicInfo = ({ formData, onInputChange, onNext }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Data arrays for dropdowns
  const genderOptions = ["MALE", "FEMALE", "OTHER"];
  const statusOptions = ["ACTIVE"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const complexionOptions = ["Fair", "Wheatish", "Dark"];
  const dietOptions = ["Vegetarian", "Non-Vegetarian", "Eggetarian"];
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];
  const yesNoOptions = ["Yes", "No"];
  
  // Height options
  const heightFtOptions = [4, 5, 6, 7];
  const heightInOptions = Array.from({ length: 12 }, (_, i) => i);

  // Cities/Districts data (using country-state-city library)
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);

  // Load cities on component mount
  React.useEffect(() => {
    // Get all cities from Maharashtra state
    const maharashtraCities = City.getCitiesOfState("IN", "MH");
    
    // Extract city names and remove duplicates
    const cityNames = [...new Set(maharashtraCities.map(city => city.name))];
    
    // Sort alphabetically
    const sortedCities = cityNames.sort();
    
    // Use these as both districts and talukas
    setDistricts(sortedCities);
    setTalukas(sortedCities);
  }, []);

  // Validate a single field (only format validation, no required check)
  const validateField = (name, value) => {
    let error = "";
    
    if (value && value.toString().trim() !== "") {
      switch(name) {
        case "pinCode":
          if (!/^[1-9][0-9]{5}$/.test(value)) {
            error = "Enter a valid Indian PIN code";
          }
          break;
          
        case "firstName":
        case "middleName":
        case "lastName":
          if (!/^[A-Za-z\s]+$/.test(value)) {
            error = "Only alphabets and spaces allowed";
          }
          break;
          
        case "age":
          const ageNum = parseInt(value);
          if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
            error = "Age must be between 18 and 100";
          }
          break;
          
        case "caste":
          if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
            error = "Only alphabets and spaces allowed";
          } else if (value.trim().length < 2) {
            error = "Must be at least 2 characters";
          }
          break;
          
        case "weight":
          const weightNum = parseFloat(value);
          if (isNaN(weightNum) || weightNum < 30 || weightNum > 300) {
            error = "Weight must be between 30 and 300 kg";
          }
          break;
          
        case "heightFt":
          const ft = parseInt(value);
          if (isNaN(ft) || ft < 4 || ft > 7) {
            error = "Height must be between 4 and 7 feet";
          }
          break;
          
        case "heightIn":
          const inches = parseInt(value);
          if (isNaN(inches) || inches < 0 || inches > 11) {
            error = "Inches must be between 0 and 11";
          }
          break;
          
        default:
          break;
      }
    }
    
    return error;
  };

  // Validate all fields (only format validation, not required check)
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;
    
    // Only validate fields that have values
    Object.keys(formData).forEach(field => {
      const value = formData[field] || "";
      const error = validateField(field, value);
      
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    
    setValidationErrors(newErrors);
    
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    let processedValue = value;
    
    // Special handling for pinCode - only allow digits
    if (name === "pinCode") {
      processedValue = value.replace(/\D/g, "").slice(0, 6);
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
          Personal Information
        </h3>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm text-gray-700 mt-2 p-3" style={{ backgroundColor: "#FDF8FF" }}>
        
        {/* FIRST NAME */}
        <div>
          <label style={labelStyle}>
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter First Name"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("firstName")}
            maxLength={45}
          />
          {touchedFields.firstName && validationErrors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.firstName}
            </p>
          )}
        </div>

        {/* MIDDLE NAME */}
        <div>
          <label style={labelStyle}>
            Middle Name
          </label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Middle Name"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("middleName")}
            maxLength={45}
          />
          {touchedFields.middleName && validationErrors.middleName && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.middleName}
            </p>
          )}
        </div>

        {/* LAST NAME */}
        <div>
          <label style={labelStyle}>
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Last Name"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("lastName")}
            maxLength={45}
          />
          {touchedFields.lastName && validationErrors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.lastName}
            </p>
          )}
        </div>

        {/* AGE */}
        <div>
          <label style={labelStyle}>
            Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Age"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("age")}
            min="18"
            max="100"
          />
          {touchedFields.age && validationErrors.age && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.age}
            </p>
          )}
        </div>

        {/* GENDER */}
        <div>
          <label style={labelStyle}>
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("gender")}
          >
            <option value="">Select Gender</option>
            {genderOptions.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          {touchedFields.gender && validationErrors.gender && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.gender}
            </p>
          )}
        </div>

        {/* STATUS */}
        <div>
          <label style={labelStyle}>
            Status
          </label>
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("status")}
          >
            <option value="">Select Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {touchedFields.status && validationErrors.status && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.status}
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
            name="caste"
            value={formData.caste || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Caste"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("caste")}
          />
          {touchedFields.caste && validationErrors.caste && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.caste}
            </p>
          )}
        </div>

        {/* MARITAL STATUS */}
        <div>
          <label style={labelStyle}>
            Marital Status
          </label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("maritalStatus")}
          >
            <option value="">Select Status</option>
            {maritalStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {touchedFields.maritalStatus && validationErrors.maritalStatus && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.maritalStatus}
            </p>
          )}
        </div>

        {/* HEIGHT */}
        <div>
          <label style={labelStyle}>
            Height
          </label>
          <div className="flex gap-2">
            <select
              name="heightFt"
              value={formData.heightFt || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-1/2 px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("heightFt")}
            >
              <option value="">Feet</option>
              {heightFtOptions.map((ft) => (
                <option key={ft} value={ft}>
                  {ft} ft
                </option>
              ))}
            </select>
            <select
              name="heightIn"
              value={formData.heightIn || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-1/2 px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={getFieldStyle("heightIn")}
            >
              <option value="">Inches</option>
              {heightInOptions.map((inch) => (
                <option key={inch} value={inch}>
                  {inch} in
                </option>
              ))}
            </select>
          </div>
          {(touchedFields.heightFt && validationErrors.heightFt) || 
           (touchedFields.heightIn && validationErrors.heightIn) ? (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.heightFt || validationErrors.heightIn}
            </p>
          ) : null}
        </div>

        {/* WEIGHT */}
        <div>
          <label style={labelStyle}>
            Weight
          </label>
          <div className="relative">
            <input
              type="number"
              name="weight"
              value={formData.weight || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter weight"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none pr-10"
              style={getFieldStyle("weight")}
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              kg
            </span>
          </div>
          {touchedFields.weight && validationErrors.weight && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.weight}
            </p>
          )}
        </div>

        {/* BLOOD GROUP */}
        <div>
          <label style={labelStyle}>
            Blood Group
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("bloodGroup")}
          >
            <option value="">Select Blood Group</option>
            {bloodGroupOptions.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          {touchedFields.bloodGroup && validationErrors.bloodGroup && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.bloodGroup}
            </p>
          )}
        </div>

        {/* COMPLEXION */}
        <div>
          <label style={labelStyle}>
            Complexion
          </label>
          <select
            name="complexion"
            value={formData.complexion || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("complexion")}
          >
            <option value="">Select Complexion</option>
            {complexionOptions.map((complexion) => (
              <option key={complexion} value={complexion}>
                {complexion}
              </option>
            ))}
          </select>
          {touchedFields.complexion && validationErrors.complexion && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.complexion}
            </p>
          )}
        </div>

        {/* DIET */}
        <div>
          <label style={labelStyle}>
            Diet
          </label>
          <select
            name="diet"
            value={formData.diet || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("diet")}
          >
            <option value="">Select Diet</option>
            {dietOptions.map((diet) => (
              <option key={diet} value={diet}>
                {diet}
              </option>
            ))}
          </select>
          {touchedFields.diet && validationErrors.diet && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.diet}
            </p>
          )}
        </div>

        {/* SPECTACLE */}
        <div>
          <label style={labelStyle}>
            Spectacle
          </label>
          <select
            name="spectacle"
            value={formData.spectacle || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("spectacle")}
          >
            <option value="">Select Option</option>
            {yesNoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {touchedFields.spectacle && validationErrors.spectacle && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.spectacle}
            </p>
          )}
        </div>

        {/* LENS */}
        <div>
          <label style={labelStyle}>
            Lens
          </label>
          <select
            name="lens"
            value={formData.lens || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("lens")}
          >
            <option value="">Select Option</option>
            {yesNoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {touchedFields.lens && validationErrors.lens && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.lens}
            </p>
          )}
        </div>

        {/* PHYSICALLY CHALLENGED */}
        <div>
          <label style={labelStyle}>
            Physically Challenged
          </label>
          <select
            name="physicallyChallenged"
            value={formData.physicallyChallenged || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("physicallyChallenged")}
          >
            <option value="">Select Option</option>
            {yesNoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {touchedFields.physicallyChallenged && validationErrors.physicallyChallenged && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.physicallyChallenged}
            </p>
          )}
        </div>

        {/* HOMETOWN DISTRICT */}
        <div>
          <label style={labelStyle}>
            Home Town District
          </label>
          <select
            name="homeTownDistrict"
            value={formData.homeTownDistrict || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
            style={getFieldStyle("homeTownDistrict")}
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
          {touchedFields.homeTownDistrict && validationErrors.homeTownDistrict && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.homeTownDistrict}
            </p>
          )}
        </div>

        {/* PIN CODE */}
        <div>
          <label style={labelStyle}>
            Pin Code
          </label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter 6-digit PIN Code"
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

        {/* TALUKA */}
        <div>
          <label style={labelStyle}>
            Taluka
          </label>
          <select
            name="taluka"
            value={formData.taluka || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
            style={getFieldStyle("taluka")}
          >
            <option value="">Select Taluka</option>
            {talukas.map((taluka, index) => (
              <option key={index} value={taluka}>
                {taluka}
              </option>
            ))}
          </select>
          {touchedFields.taluka && validationErrors.taluka && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.taluka}
            </p>
          )}
        </div>

        {/* NATIVE TALUKA */}
        <div>
          <label style={labelStyle}>
            Native Taluka
          </label>
          <select
            name="nativeTaluka"
            value={formData.nativeTaluka || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
            style={getFieldStyle("nativeTaluka")}
          >
            <option value="">Select Native Taluka</option>
            {talukas.map((taluka, index) => (
              <option key={index} value={taluka}>
                {taluka}
              </option>
            ))}
          </select>
          {touchedFields.nativeTaluka && validationErrors.nativeTaluka && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.nativeTaluka}
            </p>
          )}
        </div>

        {/* DISTRICT */}
        <div>
          <label style={labelStyle}>
            District
          </label>
          <select
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
            style={getFieldStyle("district")}
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
          {touchedFields.district && validationErrors.district && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.district}
            </p>
          )}
        </div>

        {/* RELIGION */}
        <div>
          <label style={labelStyle}>
            Religion
          </label>
          <select
            name="religion"
            value={formData.religion || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("religion")}
          >
            <option value="">Select Religion</option>
            {religionOptions.map((religion) => (
              <option key={religion} value={religion}>
                {religion}
              </option>
            ))}
          </select>
          {touchedFields.religion && validationErrors.religion && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.religion}
            </p>
          )}
        </div>

        {/* CURRENT CITY */}
        <div>
          <label style={labelStyle}>
            Current City
          </label>
          <select
            name="currentCity"
            value={formData.currentCity || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
            style={getFieldStyle("currentCity")}
          >
            <option value="">Select Current City</option>
            {districts.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {touchedFields.currentCity && validationErrors.currentCity && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.currentCity}
            </p>
          )}
        </div>

        {/* ADDRESS - Full width */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <label style={labelStyle}>
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Full Address"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("address")}
            maxLength={250}
          />
          {touchedFields.address && validationErrors.address && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.address}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Step1BasicInfo;