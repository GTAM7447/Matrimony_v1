// import React from "react";
// import { Eye } from "lucide-react";
// import { Link } from "react-router-dom";
// import coupleImage from "../assets/Register/RegisterImg.jpg";

// const SignIn = () => {
//   return (
//     <div className="h-screen overflow-hidden bg-gray-50 px-4 flex justify-center">
//       <div className="max-w-7xl w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden mt-8">

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
//                 Login to continue your journey toward finding your perfect match.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT FORM */}
//         <div className="px-8 py-8 md:px-12 md:py-10">
//           <h2 className="text-xl font-bold mb-1">Login</h2>
//           <p className="text-gray-500 text-sm mb-5">
//             Log in to continue your journey toward finding your perfect match.
//           </p>

//           <form className="space-y-4">
//             <div>
//               <label className="text-sm font-medium">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C68FF] outline-none"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Password</label>
//               <div className="relative mt-1">
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C68FF] outline-none"
//                 />
//                 <Eye className="absolute right-3 top-2.5 text-gray-400 w-4 h-4 cursor-pointer" />
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" />
//                 Remember Me
//               </label>
//               <span className="text-[#7C68FF] cursor-pointer">
//                 Forgot Password?
//               </span>
//             </div>

//             <button className="w-full bg-[#7C68FF] text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition">
//               Login
//             </button>

//             <div className="flex items-center gap-3 my-4">
//               <div className="flex-1 h-px bg-gray-200" />
//               <span className="text-xs text-gray-400">OR</span>
//               <div className="flex-1 h-px bg-gray-200" />
//             </div>

//             <button className="w-full border py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
//               <img
//                 src="https://www.svgrepo.com/show/475656/google-color.svg"
//                 alt="Google"
//                 className="w-4 h-4"
//               />
//               Login with Google
//             </button>

//             {/* REGISTER LINK */}
//             <p className="text-center text-sm mt-4">
//               Don’t have an account?{" "}
//               <Link
//                 to="/register"
//                 className="text-[#7C68FF] font-medium hover:underline"
//               >
//                 REGISTER HERE
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;












// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [apiMessage, setApiMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setApiMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "https://mttlprv1-production.up.railway.app/jwt/login",
//         {
//           email: formData.email,
//           password: formData.password,
//         }
//       );

//       const token = res?.data?.token || res?.data?.accessToken;

//       if (!token) {
//         setApiMessage("Login failed. No token received.");
//         return;
//       }

//       // Save token
//       localStorage.setItem("adminToken", token);
//       localStorage.setItem("adminEmail", formData.email);

//       setApiMessage("Login Successful! Redirecting...");
//       setTimeout(() => navigate("/create-profile"), 1200);
//     } catch (error) {
//       const msg =
//         error?.response?.data?.message || "Invalid credentials. Try again.";
//       setApiMessage(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-[#7C68FF] mb-4">Admin Login</h2>

//         {apiMessage && (
//           <p
//             className={`text-center text-sm mb-3 ${
//               apiMessage.includes("Successful")
//                 ? "text-green-600"
//                 : "text-red-600"
//             }`}
//           >
//             {apiMessage}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Admin email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#7C68FF] outline-none"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Admin password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#7C68FF] outline-none"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-[#7C68FF] text-white py-2 rounded-lg font-medium hover:opacity-90 transition ${
//               loading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;












/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setApiMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://mttlprv1.digiledge.info/jwt/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const token = res?.data?.token || res?.data?.accessToken;

      if (!token) {
        setApiMessage("Login failed. No token received.");
        return;
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminEmail", formData.email);

      setApiMessage("Login Successful! Redirecting...");
      setTimeout(() => navigate("/admin/create-profile"), 1200);
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Invalid credentials. Try again.";
      setApiMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#7C68FF] mb-4">
          Admin Login
        </h2>

        {apiMessage && (
          <p
            className={`text-center text-sm mb-3 ${
              apiMessage.includes("Successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {apiMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#7C68FF] outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Admin password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#7C68FF] outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#7C68FF] text-white py-2 rounded-lg font-medium hover:opacity-90 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;