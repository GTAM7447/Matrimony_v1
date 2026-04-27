import { Navigate } from "react-router-dom";
import { getAuthToken, isTokenExpired, removeAuthToken } from "../../utils/auth";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
  const token = getAuthToken();

  // No token found
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Token expired - auto cleanup and redirect
  if (isTokenExpired(token)) {
    removeAuthToken();
    return <Navigate to="/signin" replace />;
  }

  // Validate token and check admin role
  try {
    const decoded = jwtDecode(token);
    const roles = decoded?.authorities || [];

    if (roles.some(role => role.toUpperCase().includes("ADMIN"))) {
      return children;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    removeAuthToken();
  }

  return <Navigate to="/signin" replace />;
};

export default AdminProtectedRoute;
