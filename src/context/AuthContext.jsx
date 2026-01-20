import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { profileApi } from "./profileApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ===================== RESTORE SESSION ===================== */
  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsLoggedIn(true);
      } catch {
        Cookies.remove("authToken");
      }
    }

    setLoading(false);
  }, []);

  /* ===================== AXIOS 401 HANDLER ===================== */
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response?.status === 401) {
          hardLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  /* ===================== LOGIN ===================== */
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "https://mttlprv1.digiledge.info/jwt/login",
        { email, password }
      );

      const token =
        res?.data?.token ||
        res?.data?.accessToken ||
        res?.data?.data?.token;

      if (!token) {
        return { success: false, message: "No token received" };
      }

      Cookies.set("authToken", token, {
        path: "/",
        secure: true,
        sameSite: "Lax",
      });

      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsLoggedIn(true);

      dispatch(profileApi.util.resetApiState());

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  /* ===================== LOGOUT ===================== */
  const hardLogout = () => {
    Cookies.remove("authToken", { path: "/" });
    dispatch(profileApi.util.resetApiState());
    setUser(null);
    setIsLoggedIn(false);
    navigate("/signin", { replace: true });
  };

  const logout = () => hardLogout();

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
