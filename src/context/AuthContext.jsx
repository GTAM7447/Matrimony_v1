
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { profileApi } from "../context/profileApi";
import { getAuthToken, setAuthToken, removeAuthToken, isUsingHttpOnlyCookies } from "../utils/auth";
import { BASE_URL } from "./api";

const AuthContext = createContext();

/**
 * Helper: Extract admin role from JWT claims
 * Checks multiple possible field names that backends commonly use
 */
const extractAdminFromJWT = (decoded) => {
  if (!decoded) return false;

  // Check all possible role field names
  const roles = decoded?.authorities ||
    decoded?.roles ||
    decoded?.role ||
    decoded?.scope?.split(" ") ||
    [];

  // Handle string or array
  const roleArray = typeof roles === "string" ? [roles] : roles;

  return roleArray.some((r) =>
    typeof r === "string" && r.toUpperCase().includes("ADMIN")
  );
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  /* RESTORE AUTH ON REFRESH */
  useEffect(() => {
    const restoreAuth = async () => {
      const token = getAuthToken();

      if (token && token !== "http_only_token") {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);
          setIsLoggedIn(true);

          // Derive admin status from JWT claims
          setIsAdmin(extractAdminFromJWT(decoded));

          // Prefetch fresh RTK data
          dispatch(
            profileApi.util.invalidateTags([
              "OwnProfile",
              "SentInterests",
              "ReceivedInterests",
              "ProfilePhoto",
            ])
          );
        } catch {
          removeAuthToken();
        }
      } else if (token === "http_only_token") {
        // HttpOnly mode: fetch user info from API
        try {
          const res = await axios.get(`${BASE_URL}/api/v1/complete-profile/me`, {
            withCredentials: true,
          });

          if (res.data?.data?.userProfile || res.data?.userProfile) {
            setIsLoggedIn(true);
            // Check if response contains role info
            const userData = res.data?.data || res.data;
            const role = userData?.role || userData?.userRole;
            setIsAdmin(role?.toUpperCase()?.includes("ADMIN") || false);
          }
        } catch {
          // Session invalid
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      }

      setLoading(false);
    };

    restoreAuth();
  }, [dispatch]);

  /* AXIOS INTERCEPTOR FOR EXPIRED TOKEN */
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        // CRITICAL FIX: Do not auto-logout on login failures (401)
        // Only logout if it's a protected route failure
        const isAuthRequest = error.config?.url?.includes('/login') ||
          error.config?.url?.includes('/register') ||
          error.config?.url?.includes('/signup');

        if (error.response?.status === 401 && !isAuthRequest) {
          hardLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  /* LOGIN */
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/jwt/login`,
        { email, password },
        { withCredentials: true }
      );

      const token =
        res?.data?.token ||
        res?.data?.accessToken ||
        res?.data?.data?.token;

      if (!token && !isUsingHttpOnlyCookies()) {
        return { success: false, message: "No token received" };
      }

      if (token) {
        setAuthToken(token);
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsAdmin(extractAdminFromJWT(decoded));
      } else {
        setAuthToken("http_only_token");
      }

      setIsLoggedIn(true);

      // Force Navbar/User UI to refresh NOW
      dispatch(
        profileApi.util.invalidateTags([
          "OwnProfile",
          "SentInterests",
          "ReceivedInterests",
          "ProfilePhoto",
        ])
      );

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  /* SET ADMIN STATUS - callable from SignIn pages after role detection */
  const setAdminStatus = useCallback((status) => {
    setIsAdmin(status);
  }, []);

  /* HARD LOGOUT — used internally */
  const hardLogout = useCallback(async () => {
    // Get the token before we clear it
    const token = getAuthToken();

    try {
      // Call backend logout API to clear HttpOnly refresh token cookie
      // Must include Authorization header so backend knows which user is logging out
      const headers = {};
      if (token && token !== 'http_only_token') {
        headers['Authorization'] = `Bearer ${token}`;
      }

      await axios.post(`${BASE_URL}/api/v1/auth/logout`, null, {
        withCredentials: true,
        headers,
      });
    } catch (err) {
      // Log but don't block logout flow if API fails
      console.error('Backend logout failed:', err);
    }

    // Clear local auth token
    removeAuthToken();

    // CLEAR RTK QUERY CACHE
    dispatch(profileApi.util.resetApiState());

    // Clear all state
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);

    // Force reload to clear all state
    window.location.href = "/signin";
  }, [dispatch]);

  /* PUBLIC LOGOUT - usable by UI */
  const logout = () => hardLogout();

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,           // decoded JWT
        isLoggedIn,     // true if token exists
        isAdmin,        // true if admin user (derived from JWT)
        login,          // login function
        logout,         // logout function
        setAdminStatus, // set admin status (for SignIn pages after role detection)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
