
// // src/context/AuthContext.jsx

// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Restore user on refresh
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       try {
//         const parsed = JSON.parse(storedUser);
//         setUser(parsed);
//         setIsLoggedIn(true);
//       } catch (e) {
//         console.error("Invalid user JSON", e);
//         localStorage.removeItem("user");
//       }
//     }
//   }, []);

//   // LOGIN
//   const login = async (username, password) => {
//     try {
//       const res = await axios.post(
//         "https://mttlprv1.digiledge.info/jwt/login",
//         {
//           username,
//           password,
//         }
//       );

//       console.log("Login Response:", res.data);

//       const token = res.data.accessToken;
//       if (!token) return { success: false, message: "No token received" };

//       // Load gender either from backend or signup stored value
//       const gender =
//         res.data.gender || localStorage.getItem("signupGender") || null;

//       const userObj = {
//         id: res.data.userId || null,
//         email: username,
//         gender: gender, // MALE / FEMALE or null
//         roles: res.data.roles || [],
//       };

//       // Save to localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(userObj));

//       setUser(userObj);
//       setIsLoggedIn(true);

//       return { success: true };
//     } catch (err) {
//       console.error("Login Error:", err.response?.data || err.message);
//       return {
//         success: false,
//         message: err.response?.data?.message || "Login failed",
//       };
//     }
//   };

//   // LOGOUT
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setIsLoggedIn(false);
//     navigate("/signin");
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



















import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { profileApi } from "../context/profileApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  /* RESTORE AUTH ON REFRESH */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  /* AXIOS INTERCEPTOR (JWT EXPIRED) */
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

  /* LOGIN */
  const login = async (username, password) => {
    try {
      const res = await axios.post(
        "https://mttlprv1.digiledge.info/jwt/login",
        { username, password }
      );

      const token = res.data.accessToken;
      if (!token) {
        return { success: false, message: "No token received" };
      }

      const userObj = {
        id: res.data.userId || null,
        email: username,
        gender: res.data.gender || null,
        roles: res.data.roles || [],
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userObj));

      setUser(userObj);
      setIsLoggedIn(true);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  /* HARD LOGOUT (USED INTERNALLY) */
  const hardLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // CLEAR RTK QUERY CACHE
    dispatch(profileApi.util.resetApiState());

    setUser(null);
    setIsLoggedIn(false);

    navigate("/signin", { replace: true });
  };

  /* PUBLIC LOGOUT */
  const logout = () => {
    hardLogout();
  };

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);