import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const AdminProtectedRoute = ({ children }) => {
  const token = Cookies.get("authToken");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const roles = decoded?.authorities || [];

    const isAdmin = roles.some(role => 
      role.includes("ADMIN") || 
      role.includes("ROLE_ADMIN")
    );

    if (isAdmin) {
      return children;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    Cookies.remove("authToken", { path: "/" });
  }

  return <Navigate to="/signin" replace />;
};

export default AdminProtectedRoute;