// // src/features/auth/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { isLoggedIn } = useAuth();
//   const loggedIn = isLoggedIn || !!localStorage.getItem("authToken");
//   return loggedIn ? children : <Navigate to="/signin" replace />;
// }







import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return isAuth ? children : <Navigate to="/signin" replace />;
}
