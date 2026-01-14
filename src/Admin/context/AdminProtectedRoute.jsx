// import { Navigate } from "react-router-dom";

// const AdminProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("adminToken");
//   return token ? children : <Navigate to="/admin/login" replace />;
// };

// export default AdminProtectedRoute;











import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const roles = decoded?.authorities || [];

    if (roles.includes("ROLE_ADMIN")) {
      return children;
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  return <Navigate to="/signin" replace />;
};

export default AdminProtectedRoute;
