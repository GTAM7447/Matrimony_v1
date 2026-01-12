// import React from "react";
// import { Eye, Upload } from "lucide-react";
// import { Link } from "react-router-dom";
// import coupleImage from "../assets/Register/RegisterImg.jpg";

// const uploadFields = [
//   "Upload PAN Card",
//   "Your Profile Photo",
//   "Upload Biodata",
//   "Upload Salary Slip",
//   "Leaving Certificate",
//   "Upload Aadhaar Photo",
// ];

// const SignUp = () => {
//   return (
//     <div className="h-screen bg-gray-50 px-4 flex justify-center overflow-hidden">
//       <div className="max-w-7xl w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden mt-6">

//         {/* LEFT IMAGE */}
//         <div className="relative hidden md:block">
//           <img
//             src={coupleImage}
//             alt="Couple"
//             className="h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/30 flex items-end p-6">
//             <div className="text-white">
//               <h3 className="text-2xl font-semibold mb-1">Welcome Back!</h3>
//               <p className="text-sm opacity-90">
//                 Create an Admin Account to Access the Management Panel.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT FORM (SCROLLABLE) */}
//         <div className="px-8 py-6 md:px-12 md:py-8 overflow-y-auto">
//           <h2 className="text-xl font-bold mb-1 text-[#7C68FF]">LOGO</h2>
//           <p className="text-sm text-gray-600 mb-4">
//             Create an Admin Account to Access the Management Panel
//           </p>

//           <form className="space-y-4">
//             <input
//               type="text"
//               placeholder="Enter name"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C68FF] outline-none"
//             />

//             <input
//               type="email"
//               placeholder="Enter email address"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C68FF] outline-none"
//             />

//             <div className="relative">
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C68FF] outline-none"
//               />
//               <Eye className="absolute right-3 top-2.5 text-gray-400 w-4 h-4 cursor-pointer" />
//             </div>

//             {/* UPLOAD GRID */}
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               {uploadFields.map((label, i) => (
//                 <label
//                   key={i}
//                   className="border border-dashed border-[#7C68FF] rounded-lg py-3 px-2 flex flex-col items-center gap-1 cursor-pointer hover:bg-[#7C68FF0F] transition"
//                 >
//                   <Upload size={16} />
//                   <span className="text-xs text-gray-600 text-center">
//                     {label}
//                   </span>
//                   <input type="file" className="hidden" />
//                 </label>
//               ))}
//             </div>

//             <button className="w-full bg-[#7C68FF] text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition mt-4">
//               Register
//             </button>

//             <div className="flex items-center gap-3 my-4">
//               <div className="flex-1 h-px bg-gray-200" />
//               <span className="text-xs text-gray-400">OR</span>
//               <div className="flex-1 h-px bg-gray-200" />
//             </div>

//             {/* LOGIN LINK */}
//             <p className="text-center text-sm pb-6">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-[#7C68FF] font-medium hover:underline"
//               >
//                 LOGIN
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



















/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Eye, EyeOff, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import coupleImage from "../assets/Register/RegisterImg.jpg";

const uploadFields = [
  "Upload PAN Card",
  "Your Profile Photo",
  "Upload Biodata",
  "Upload Salary Slip",
  "Leaving Certificate",
  "Upload Aadhaar Photo",
];

const AdminSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};

    temp.name = formData.name ? "" : "Enter your name.";

    temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "Enter valid email.";

    temp.phone = /^[0-9]{10}$/.test(formData.phone)
      ? ""
      : "Enter valid 10-digit phone.";

    temp.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(
      formData.password
    )
      ? ""
      : "Must have capital, small & symbol, min 8 chars.";

    temp.gender = gender ? "" : "Select gender.";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setApiMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiMessage("");

    const payload = {
      userId: 0,
      email: formData.email,
      mobileNumber: formData.phone,
      password: formData.password,
      gender: gender,
      role: "ADMIN",
      roles: ["ADMIN"],
    };

    try {
      const res = await axios.post(
        "https://mttlprv1.digiledge.info/api/v1/admin/users/register",
        payload
      );

      localStorage.setItem("signupGender", gender);

      setApiMessage("Admin Registered Successfully!");
      setTimeout(() => navigate("/admin/signin"), 1500);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Registration failed. Try again.";
      setApiMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 flex justify-center">
      <div className="max-w-7xl w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden mt-6">

        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">
          <img
            src={coupleImage}
            alt="Welcome"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-6">
            <div className="text-white drop-shadow-md">
              <h3 className="text-2xl font-semibold mb-1">Welcome!</h3>
              <p className="text-sm opacity-95">
                Create an Admin Account to Access the Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="px-8 py-6 md:px-12 md:py-8 overflow-y-auto">
          <h2 className="text-xl font-bold mb-1 text-[#7C68FF]">LOGO</h2>
          <p className="text-sm text-gray-600 mb-3">
            Create an Admin Account
          </p>

          {apiMessage && (
            <p
              className={`text-center text-sm font-medium mb-3 ${
                apiMessage.includes("Successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {apiMessage}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                errors.name
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-[#7C68FF]"
              }`}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-[#7C68FF]"
              }`}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Enter mobile number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                errors.phone
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-[#7C68FF]"
              }`}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-[#7C68FF]"
                }`}
              />
              <span
                className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}

            {/* Gender */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${
                errors.gender
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-[#7C68FF]"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500">{errors.gender}</p>
            )}

            {/* Upload grid (optional UI only) */}
            <div className="grid grid-cols-2 gap-4 text-sm opacity-70">
              {uploadFields.map((label, i) => (
                <label
                  key={i}
                  className="border border-dashed border-[#7C68FF] rounded-lg py-3 px-2 flex flex-col items-center gap-1 cursor-pointer hover:bg-[#7C68FF0F] transition"
                >
                  <Upload size={16} />
                  <span className="text-xs text-gray-600 text-center">
                    {label}
                  </span>
                  <input type="file" className="hidden" />
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#7C68FF] text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition mt-3 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-sm pb-6 pt-2">
              Already have an account?{" "}
              <Link to="/admin/signin" className="text-[#7C68FF] font-medium hover:underline">
                LOGIN
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;