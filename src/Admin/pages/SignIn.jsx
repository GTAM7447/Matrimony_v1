
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthToken, isUsingHttpOnlyCookies } from "../../utils/auth";
import { logLoginSuccess, logLoginFailure } from "../../utils/securityLogger";
import { BASE_URL } from "../../apiConfig";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAdminStatus } = useAuth();

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
        `${BASE_URL}/jwt/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      const token = res?.data?.token || res?.data?.accessToken;

      if (isUsingHttpOnlyCookies()) {
        if (res.status === 200) {
          setAuthToken("http_only_token");
        } else {
          throw new Error("Login failed");
        }
      } else {
        if (!token) {
          setApiMessage("Login failed. No token received.");
          return;
        }
        setAuthToken(token);
      }

      // Set admin status via context (triggers reactive navbar update)
      setAdminStatus(true);

      logLoginSuccess(formData.email, "email");

      setApiMessage("Login Successful! Redirecting...");
      setTimeout(() => navigate("/admin/dashboard"), 1200);
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Invalid credentials. Try again.";
      logLoginFailure(formData.email, msg);
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
            className={`text-center text-sm mb-3 ${apiMessage.includes("Successful")
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
            className={`w-full bg-[#7C68FF] text-white py-2 rounded-lg font-medium hover:opacity-90 transition ${loading ? "opacity-70 cursor-not-allowed" : ""
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