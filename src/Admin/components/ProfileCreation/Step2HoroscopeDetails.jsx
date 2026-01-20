// components/registration/steps/Step2HoroscopeDetails.jsx
import React, { useState, useEffect } from "react";
import { City } from "country-state-city";

const Step2HoroscopeDetails = ({ formData, onInputChange, onNext, onBack }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [districts, setDistricts] = useState([]);

  // Rashi options
  const rashiOptions = [
    "Mesh", "Vrishabh", "Mithun", "Karka", "Simha", "Kanya", 
    "Tula", "Vrishchik", "Dhanu", "Makar", "Kumbh", "Meen"
  ];

  // Nakshatra options
  const nakshatraOptions = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya",
    "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
    "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha",
    "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
  ];

  // Charan options
  const charanOptions = ["1", "2", "3", "4"];

  // Nadi options
  const nadiOptions = ["Adi", "Madhya", "Antya"];

  // Gan options
  const ganOptions = ["Dev", "Manushya", "Rakshas"];

  // Mangal options
  const mangalOptions = ["Yes", "No"];

  // Gotra options
  const gotraOptions = [
    "Kashyap", "Bharadwaj", "Vashishtha", "Jamadagni", "Atri",
    "Vishvamitra", "Gautam", "Agastya", "Shandilya", "Kaushik"
  ];

  // Devak options
  const devakOptions = [
    "Audumbar", "Vata", "Peepal", "Bel", "Umbar", "Palas",
    "Rui", "Khair", "Shami", "Banyan"
  ];

  // Load cities on component mount
  useEffect(() => {
    // Get all cities from Maharashtra state
    const maharashtraCities = City.getCitiesOfState("IN", "MH");
    
    // Extract city names and remove duplicates
    const cityNames = [...new Set(maharashtraCities.map(city => city.name))];
    
    // Sort alphabetically
    const sortedCities = cityNames.sort();
    setDistricts(sortedCities);
  }, []);

  // Validate a single field (only format validation, no required check)
  const validateField = (name, value) => {
    let error = "";
    
    if (value && value.toString().trim() !== "") {
      switch(name) {
        case "dob":
          if (value) {
            const selected = new Date(value);
            const today = new Date();
            const minAllowed = new Date();
            minAllowed.setFullYear(today.getFullYear() - 18);
            
            if (selected > minAllowed) {
              error = "You must be at least 18 years old";
            }
          }
          break;
          
        case "time":
          if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
            error = "Enter valid time in HH:MM format (24-hour)";
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
    
    // Special handling for time - only allow digits and colon
    if (name === "time") {
      processedValue = value.replace(/[^0-9:]/g, '');
      
      // Auto-insert colon after 2 digits
      if (processedValue.length === 2 && !processedValue.includes(':')) {
        processedValue = processedValue + ':';
      }
      
      // Limit to HH:MM format
      if (processedValue.length > 5) {
        processedValue = processedValue.slice(0, 5);
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

  return (
    <div className="w-full mx-auto font-[Inter]">
      {/* FORM HEADER */}
      <div
        className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
        style={{ backgroundColor: "#991CDD26" }}
      >
        <h3 className="text-center text-[#991CDD] font-[Inter] font-semibold uppercase mb-4 mt-4 tracking-wide text-xl">
          Horoscope Details
        </h3>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm text-gray-700 mt-2 p-3" style={{ backgroundColor: "#FDF8FF" }}>
        
        {/* BIRTH DATE */}
        <div>
          <label style={labelStyle}>
            Birth Date
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("dob")}
            max={new Date().toISOString().split("T")[0]}
          />
          {touchedFields.dob && validationErrors.dob && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.dob}
            </p>
          )}
        </div>

        {/* BIRTH TIME */}
        <div>
          <label style={labelStyle}>
            Birth Time
          </label>
          <input
            type="text"
            name="time"
            value={formData.time || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="HH:MM (24-hour format)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("time")}
            pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
            title="Enter time in 24-hour format (e.g., 14:30)"
          />
          {touchedFields.time && validationErrors.time && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.time}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">Format: 14:30 (24-hour)</p>
        </div>

        {/* BIRTH PLACE */}
        <div>
          <label style={labelStyle}>
            Birth Place
          </label>
          <select
            name="birthPlace"
            value={formData.birthPlace || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
            style={getFieldStyle("birthPlace")}
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
          {touchedFields.birthPlace && validationErrors.birthPlace && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.birthPlace}
            </p>
          )}
        </div>

        {/* RASHI */}
        <div>
          <label style={labelStyle}>
            Rashi
          </label>
          <select
            name="rashi"
            value={formData.rashi || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("rashi")}
          >
            <option value="">Select Rashi</option>
            {rashiOptions.map((rashi) => (
              <option key={rashi} value={rashi}>
                {rashi}
              </option>
            ))}
          </select>
          {touchedFields.rashi && validationErrors.rashi && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.rashi}
            </p>
          )}
        </div>

        {/* NAKSHATRA */}
        <div>
          <label style={labelStyle}>
            Nakshatra
          </label>
          <select
            name="nakshatra"
            value={formData.nakshatra || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("nakshatra")}
          >
            <option value="">Select Nakshatra</option>
            {nakshatraOptions.map((nakshatra) => (
              <option key={nakshatra} value={nakshatra}>
                {nakshatra}
              </option>
            ))}
          </select>
          {touchedFields.nakshatra && validationErrors.nakshatra && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.nakshatra}
            </p>
          )}
        </div>

        {/* CHARAN */}
        <div>
          <label style={labelStyle}>
            Charan
          </label>
          <select
            name="charan"
            value={formData.charan || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("charan")}
          >
            <option value="">Select Charan</option>
            {charanOptions.map((charan) => (
              <option key={charan} value={charan}>
                {charan}
              </option>
            ))}
          </select>
          {touchedFields.charan && validationErrors.charan && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.charan}
            </p>
          )}
        </div>

        {/* NADI */}
        <div>
          <label style={labelStyle}>
            Nadi
          </label>
          <select
            name="nadi"
            value={formData.nadi || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("nadi")}
          >
            <option value="">Select Nadi</option>
            {nadiOptions.map((nadi) => (
              <option key={nadi} value={nadi}>
                {nadi}
              </option>
            ))}
          </select>
          {touchedFields.nadi && validationErrors.nadi && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.nadi}
            </p>
          )}
        </div>

        {/* GAN */}
        <div>
          <label style={labelStyle}>
            Gan
          </label>
          <select
            name="gan"
            value={formData.gan || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("gan")}
          >
            <option value="">Select Gan</option>
            {ganOptions.map((gan) => (
              <option key={gan} value={gan}>
                {gan}
              </option>
            ))}
          </select>
          {touchedFields.gan && validationErrors.gan && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.gan}
            </p>
          )}
        </div>

        {/* MANGAL */}
        <div>
          <label style={labelStyle}>
            Mangal
          </label>
          <select
            name="mangal"
            value={formData.mangal || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("mangal")}
          >
            <option value="">Select Mangal</option>
            {mangalOptions.map((mangal) => (
              <option key={mangal} value={mangal}>
                {mangal}
              </option>
            ))}
          </select>
          {touchedFields.mangal && validationErrors.mangal && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.mangal}
            </p>
          )}
        </div>

        {/* GOTRA */}
        <div>
          <label style={labelStyle}>
            Gotra
          </label>
          <select
            name="gotra"
            value={formData.gotra || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("gotra")}
          >
            <option value="">Select Gotra</option>
            {gotraOptions.map((gotra) => (
              <option key={gotra} value={gotra}>
                {gotra}
              </option>
            ))}
          </select>
          {touchedFields.gotra && validationErrors.gotra && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.gotra}
            </p>
          )}
        </div>

        {/* DEVAK */}
        <div>
          <label style={labelStyle}>
            Devak
          </label>
          <select
            name="devak"
            value={formData.devak || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle("devak")}
          >
            <option value="">Select Devak</option>
            {devakOptions.map((devak) => (
              <option key={devak} value={devak}>
                {devak}
              </option>
            ))}
          </select>
          {touchedFields.devak && validationErrors.devak && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.devak}
            </p>
          )}
        </div>

      </div>

      {/* ACTION BUTTONS */}
      
      
    </div>
  );
};

export default Step2HoroscopeDetails;