/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundSignIn from "../assets/SignIn/BackgroundSignIn.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Enter valid email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await axios.post(
        "https://mttlprv1.digiledge.info/jwt/login",
        {
          email: formData.email.trim(),
          password: formData.password.trim(),
        },
        {
          withCredentials: true,
        }
      );

      const token =
        res?.data?.token ||
        res?.data?.accessToken ||
        res?.data?.data?.token;

      if (!token) {
        throw new Error("No token returned.");
      }

      /* ===================== STORE TOKEN IN COOKIE ===================== */
      Cookies.set("authToken", token, {
        path: "/",
        secure: true,
        sameSite: "Lax",
      });

      /* ===================== DECODE FROM COOKIE ===================== */
      const storedToken = Cookies.get("authToken");
      const decoded = jwtDecode(storedToken);
      const roles = decoded?.authorities || [];

      /* ===================== ADMIN ROUTE ===================== */
      if (roles.some((r) => r.toUpperCase().includes("ADMIN"))) {
        navigate("/admin/dashboard", { replace: true });
        return;
      }

      /* ===================== USER FLOW ===================== */
      try {
        const meRes = await axios.get(
          "https://mttlprv1.digiledge.info/api/v1/complete-profile/me",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
            withCredentials: true,
          }
        );

        const percentage =
          meRes?.data?.data?.completionPercentage ??
          meRes?.data?.completionPercentage ??
          0;

        if (percentage > 80) {
          navigate("/", { replace: true });
        } else {
          navigate("/create-profile", { replace: true });
        }
      } catch (err) {
        console.error("ME API failed:", err);
        navigate("/create-profile", { replace: true });
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Invalid credentials. Try again.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center lg:justify-end lg:items-start font-[Inter] overflow-hidden lg:pt-20 px-4 sm:px-6 py-8"
      style={{
        backgroundImage: `url(${BackgroundSignIn})`,
        backgroundSize: "cover",
        backgroundPosition: "calc(50% - 88px) center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-black"></div>

      <div
        className="
          relative z-10 bg-white shadow-lg rounded-xl p-6 sm:p-8
          w-full max-w-sm sm:max-w-md mx-auto lg:mx-20
          border border-gray-200
        "
        style={{
          minHeight: "410px",
          maxWidth: "420px",
          boxShadow: "0px 8px 28px rgba(0,0,0,0.12)",
        }}
      >
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-orange-500 mb-3">
          Sign In
        </h2>

        {errorMessage && (
          <p className="text-center text-red-600 text-sm mb-3 font-medium bg-red-50 py-2 rounded-md">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID :
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              disabled={isLoading}
            />
          </div>

          <div className="mb-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password :
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? "⊘" : "👁"}
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-1 mb-3">
            <Link to="/forgot" className="text-xs text-orange-500 hover:underline">
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white py-2.5 rounded-md`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link
            to="/signup"
            className="inline-block w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md font-medium text-sm"
          >
            Sign Up
          </Link>
        </div>

        <p className="text-[11px] text-gray-500 text-center mt-3 px-3 leading-tight">
          *By clicking Sign In, I agree to the{" "}
          <span className="text-orange-500 cursor-pointer hover:underline">
            T&amp;C
          </span>{" "}
          and{" "}
          <span className="text-orange-500 cursor-pointer hover:underline">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
