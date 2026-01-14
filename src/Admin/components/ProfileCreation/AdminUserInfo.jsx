import React, { useState } from "react";
 
const AdminUserInfo = ({ formData, onInputChange }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
 
  const genderOptions = ["MALE", "FEMALE", "OTHER"];
 
  const labelStyle = {
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    marginBottom: "4px",
    display: "block",
  };
 
  const getFieldStyle = (field) => {
    const baseStyle = {
      backgroundColor: "#FDF8FF",
      border: "1px solid #8180801c",
      borderRadius: "6px",
      fontFamily: "'Inter', sans-serif",
      color: "#646565ff",
      padding: "14px 12px",
      width: "100%",
    };
 
    if (touched[field] && errors[field]) {
      return {
        ...baseStyle,
        border: "2px solid #ef4444",
        backgroundColor: "#fef2f2",
      };
    }
    return baseStyle;
  };
 
  const validateField = (name, value) => {
    let error = "";
 
    if (!value || value.toString().trim() === "") {
      error = "This field is required";
    } else {
      switch (name) {
        case "email":
          if (!/^\S+@\S+\.\S+$/.test(value)) {
            error = "Enter valid email";
          }
          break;
 
        case "password":
          if (value.length < 8) {
            error = "Minimum 8 characters required";
          }
          break;
 
        case "mobileNumber":
          if (!/^[6-9][0-9]{9}$/.test(value)) {
            error = "Enter valid 10 digit mobile number";
          }
          break;
 
        default:
          break;
      }
    }
    return error;
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    onInputChange(name, value);
 
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };
 
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };
 
  return (
    <div className="w-full mx-auto font-[Inter]">
      {/* HEADER */}
      <div
        className="px-6 py-3 rounded-t-xl"
        style={{ backgroundColor: "#991CDD26" }}
      >
        <h3 className="text-center text-[#991CDD] font-semibold uppercase tracking-wide text-xl">
          Admin User Information
        </h3>
      </div>
 
      {/* FORM */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"
        style={{ backgroundColor: "#FDF8FF" }}
      >
        {/* EMAIL */}
        <div>
          <label style={labelStyle}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Email"
            style={getFieldStyle("email")}
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
 
        {/* PASSWORD */}
        <div>
          <label style={labelStyle}>
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Password"
            style={getFieldStyle("password")}
          />
          {touched.password && errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
 
        {/* MOBILE */}
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
            placeholder="Enter Mobile Number"
            maxLength={10}
            style={getFieldStyle("mobileNumber")}
          />
          {touched.mobileNumber && errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
          )}
        </div>
 
        {/* GENDER */}
        <div>
          <label style={labelStyle}>
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getFieldStyle("gender")}
          >
            <option value="">Select Gender</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
 
        {/* SKIP EMAIL VERIFICATION */}
        <div>
          <label style={labelStyle}>Skip Email Verification</label>
          <select
            value="true"
            disabled
            style={getFieldStyle("skipEmailVerification")}
          >
            <option value="true">Yes</option>
          </select>
        </div>
 
        {/* AUTO ACTIVATE */}
        <div>
          <label style={labelStyle}>Auto Activate</label>
          <select
            value="true"
            disabled
            style={getFieldStyle("autoActivate")}
          >
            <option value="true">Yes</option>
          </select>
        </div>
 
        {/* ADMIN NOTES */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <label style={labelStyle}>Admin Notes</label>
          <textarea
            name="adminNotes"
            value={formData.adminNotes || ""}
            onChange={handleChange}
            rows={3}
            placeholder="Enter admin notes"
            style={getFieldStyle("adminNotes")}
          />
        </div>
      </div>
    </div>
  );
};
 
export default AdminUserInfo;
 
 