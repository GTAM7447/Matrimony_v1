// components/registration/steps/Step6ResidentialDetails.jsx
import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";

const Step6ResidentialDetails = ({ formData, onInputChange, onNext, onBack }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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

  // Initialize countries
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const sortedCountries = allCountries.sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    setCountries(sortedCountries);
    
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
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
        return;
      }
    }
    
    // Apply character restrictions based on field type
    switch(name) {
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
  };

  const getFieldStyle = () => {
    return {
      backgroundColor: "#FDF8FF",
      border: "1px solid #8180801c",
      borderRadius: "6px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      color: "#646565ff",
      padding: "14px 12px",
      width: "100%",
    };
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
          Residential Address / Contact Details (Optional)
        </h3>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700 mt-2 p-3" style={{ backgroundColor: "#FDF8FF" }}>
        
        {/* FULL ADDRESS */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <label style={labelStyle}>
            Full Address
          </label>
          <textarea
            name="fullAddress"
            value={formData.fullAddress || ""}
            onChange={handleChange}
            placeholder="Enter your complete address (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={{
              ...getFieldStyle(),
              minHeight: "80px"
            }}
            rows={3}
          />
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
            placeholder="House number, street (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
            maxLength={200}
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.streetAddress?.length || 0}/200 characters
          </p>
        </div>

        {/* COUNTRY */}
        <div>
          <label style={labelStyle}>
            Country
          </label>
          <select
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
          >
            <option value="">Select Country (optional)</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.name}>
                {country.name} ({country.isoCode})
              </option>
            ))}
          </select>
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
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
            disabled={!formData.country}
          >
            <option value="">Select State (optional)</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {!formData.country ? "Select a country first" : `${states.length} states available`}
          </p>
        </div>

        {/* CITY */}
        <div>
          <label style={labelStyle}>
            City
          </label>
          <select
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
          >
            <option value="">Select City (optional)</option>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
            <option value="Other">Other (Please specify in address)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {cities.length} Indian cities available
          </p>
        </div>

        {/* PIN CODE */}
        <div>
          <label style={labelStyle}>
            PIN Code
          </label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode || ""}
            onChange={handleChange}
            placeholder="6-digit PIN code (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
            maxLength={6}
          />
        </div>

        {/* MOBILE NUMBER */}
        <div>
          <label style={labelStyle}>
            Mobile Number
          </label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber || ""}
            onChange={handleChange}
            placeholder="e.g., +91-9876543210 (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
            maxLength={15}
          />
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
            placeholder="Alternative contact number (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
            maxLength={15}
          />
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
            placeholder="WhatsApp number (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
            maxLength={15}
          />
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
            placeholder="your.email@example.com (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
            maxLength={100}
          />
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
            placeholder="Name of emergency contact (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
            maxLength={50}
          />
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
            placeholder="Emergency contact phone (optional)"
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
            maxLength={15}
          />
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
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
          >
            <option value="">Select Relation (optional)</option>
            {emergencyContactRelationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
          >
            <option value="">Select Method (optional)</option>
            {preferredContactMethodOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* CONTACT VISIBILITY */}
        <div>
          <label style={labelStyle}>
            Contact Visibility
          </label>
          <select
            name="contactVisibility"
            value={formData.contactVisibility || "PRIVATE"}
            onChange={handleChange}
            className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
            style={getFieldStyle()}
          >
            <option value="">Select Visibility (optional)</option>
            {contactVisibilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Who can see your contact information
          </p>
        </div>

      </div>

    </div>
  );
};

export default Step6ResidentialDetails;