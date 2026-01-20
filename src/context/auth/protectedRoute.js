import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
  const token = Cookies.get("authToken");
  return token ? children : <Navigate to="/signin" replace />;
}
