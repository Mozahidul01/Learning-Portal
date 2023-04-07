import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated && role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  } else if (isAuthenticated && role === "student") {
    return <Navigate to="/course/1" />;
  } else {
    return children;
  }
}
