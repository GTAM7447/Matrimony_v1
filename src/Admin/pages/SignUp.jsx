<<<<<<< HEAD
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackgroundSignIn from "../../assets/SignIn/BackgroundSignIn.jpg";
import axios from "axios";
import { BASE_URL } from "../../apiConfig";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profileFor: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(false);
=======
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



















// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { Eye, EyeOff, Upload } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import coupleImage from "../assets/Register/RegisterImg.jpg";

// const uploadFields = [
//   "Upload PAN Card",
//   "Your Profile Photo",
//   "Upload Biodata",
//   "Upload Salary Slip",
//   "Leaving Certificate",
//   "Upload Aadhaar Photo",
// ];

// const AdminSignUp = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [gender, setGender] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [apiMessage, setApiMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
>>>>>>> 5a22e7dbca958a4e03acb42f137d3f10a9e70ea4

//   const validate = () => {
//     let temp = {};

<<<<<<< HEAD
    temp.profileFor = formData.profileFor
      ? ""
      : "Please select a profile type.";
    temp.gender = formData.gender ? "" : "Please select gender.";

    temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "Enter a valid email address.";

    temp.phone = /^[0-9]{10}$/.test(formData.phone)
      ? ""
      : "Enter a valid 10-digit phone number.";

    temp.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(
      formData.password
    )
      ? ""
      : "Password must be at least 8 characters, include uppercase, lowercase and a symbol.";
=======
//     temp.name = formData.name ? "" : "Enter your name.";

//     temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
//       ? ""
//       : "Enter valid email.";

//     temp.phone = /^[0-9]{10}$/.test(formData.phone)
//       ? ""
//       : "Enter valid 10-digit phone.";

//     temp.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(
//       formData.password
//     )
//       ? ""
//       : "Must have capital, small & symbol, min 8 chars.";

//     temp.gender = gender ? "" : "Select gender.";
>>>>>>> 5a22e7dbca958a4e03acb42f137d3f10a9e70ea4

//     setErrors(temp);
//     return Object.values(temp).every((x) => x === "");
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setApiMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     setApiMessage("");

<<<<<<< HEAD
    const payload = {
      email: formData.email,
      mobileNumber: formData.phone,
      password: formData.password,
      role: "USER",
      profileFor: formData.profileFor,
      gender: formData.gender,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/users/register`,
        payload
      );

      // Save gender for login
      localStorage.setItem("signupGender", formData.gender);

      setApiMessage("Registration Successful!");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      setApiMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="relative flex justify-end items-start pt-5 px-4 sm:px-6 font-[Inter] min-h-screen"
      style={{
        backgroundImage: `url(${BackgroundSignIn})`,
        backgroundSize: "cover",
        backgroundPosition: "calc(50% - 88px) center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-black"></div>

      {/* Card */}
      <div className="relative z-10 bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md mr-4 sm:mr-12 lg:mr-20">
        <h2 className="text-center text-2xl font-semibold mb-4">
          <span className="text-black">Find Your Perfect </span>
          <span className="text-orange-500">Life Partner</span>
        </h2>

        {apiMessage && (
          <p
            className={`text-center text-sm font-medium mb-3 ${apiMessage.includes("Successful")
              ? "text-green-600"
              : "text-red-600"
              }`}
          >
            {apiMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Profile For */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Profile For <span className="text-red-500">*</span>
            </label>
            <select
              name="profileFor"
              value={formData.profileFor}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.profileFor
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-orange-400"
                }`}
            >
              <option value="">Select</option>
              <option value="Son">Self</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Sister">Sister</option>
              <option value="Relative/Friend">Relative/Friend</option>
              <option value="Client-Marriage Bureau">
                Client-Marriage Bureau
              </option>
            </select>
            {errors.profileFor && (
              <p className="text-xs text-red-500 mt-1">{errors.profileFor}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.gender
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-orange-400"
                }`}
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-orange-400"
                }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="0000000000"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.phone
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-orange-400"
                }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password with eye button */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter a password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
                  } pr-10`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                disabled={loading}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center mt-1 leading-relaxed">
            *By registering, I agree to the Terms & Conditions and Privacy
            Policy.
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
              } text-white py-2 rounded-md font-medium transition-all duration-300 mt-1 text-sm`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-3">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
=======
//     const payload = {
//       userId: 0,
//       email: formData.email,
//       mobileNumber: formData.phone,
//       password: formData.password,
//       gender: gender,
//       role: "ADMIN",
//       roles: ["ADMIN"],
//     };

//     try {
//       const res = await axios.post(
//         "https://mttlprv1.digiledge.info/api/v1/admin/users/register",
//         payload
//       );

//       localStorage.setItem("signupGender", gender);

//       setApiMessage("Admin Registered Successfully!");
//       setTimeout(() => navigate("/admin/signin"), 1500);
//     } catch (error) {
//       const msg =
//         error?.response?.data?.message ||
//         "Registration failed. Try again.";
//       setApiMessage(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 flex justify-center">
//       <div className="max-w-7xl w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden mt-6">

//         {/* LEFT IMAGE */}
//         <div className="relative hidden md:block">
//           <img
//             src={coupleImage}
//             alt="Welcome"
//             className="h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/40 flex items-end p-6">
//             <div className="text-white drop-shadow-md">
//               <h3 className="text-2xl font-semibold mb-1">Welcome!</h3>
//               <p className="text-sm opacity-95">
//                 Create an Admin Account to Access the Dashboard
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT FORM */}
//         <div className="px-8 py-6 md:px-12 md:py-8 overflow-y-auto">
//           <h2 className="text-xl font-bold mb-1 text-[#7C68FF]">LOGO</h2>
//           <p className="text-sm text-gray-600 mb-3">
//             Create an Admin Account
//           </p>

//           {apiMessage && (
//             <p
//               className={`text-center text-sm font-medium mb-3 ${
//                 apiMessage.includes("Successfully")
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {apiMessage}
//             </p>
//           )}

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {/* Name */}
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
//                 errors.name
//                   ? "border-red-500 focus:ring-red-300"
//                   : "border-gray-300 focus:ring-[#7C68FF]"
//               }`}
//             />
//             {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

//             {/* Email */}
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
//                 errors.email
//                   ? "border-red-500 focus:ring-red-300"
//                   : "border-gray-300 focus:ring-[#7C68FF]"
//               }`}
//             />
//             {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

//             {/* Phone */}
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Enter mobile number"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
//                 errors.phone
//                   ? "border-red-500 focus:ring-red-300"
//                   : "border-gray-300 focus:ring-[#7C68FF]"
//               }`}
//             />
//             {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
//                   errors.password
//                     ? "border-red-500 focus:ring-red-300"
//                     : "border-gray-300 focus:ring-[#7C68FF]"
//                 }`}
//               />
//               <span
//                 className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff /> : <Eye />}
//               </span>
//             </div>
//             {errors.password && (
//               <p className="text-xs text-red-500">{errors.password}</p>
//             )}

//             {/* Gender */}
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${
//                 errors.gender
//                   ? "border-red-500 focus:ring-red-300"
//                   : "border-gray-300 focus:ring-[#7C68FF]"
//               }`}
//             >
//               <option value="">Select Gender</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//             </select>
//             {errors.gender && (
//               <p className="text-xs text-red-500">{errors.gender}</p>
//             )}

//             {/* Upload grid (optional UI only) */}
//             <div className="grid grid-cols-2 gap-4 text-sm opacity-70">
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

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full bg-[#7C68FF] text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition mt-3 ${
//                 loading ? "opacity-70 cursor-not-allowed" : ""
//               }`}
//             >
//               {loading ? "Registering..." : "Register"}
//             </button>

//             <p className="text-center text-sm pb-6 pt-2">
//               Already have an account?{" "}
//               <Link to="/admin/signin" className="text-[#7C68FF] font-medium hover:underline">
//                 LOGIN
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSignUp;
>>>>>>> 5a22e7dbca958a4e03acb42f137d3f10a9e70ea4
