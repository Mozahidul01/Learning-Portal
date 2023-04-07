import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { isAuthenticated, role = "" } = useAuth();

  if (isAuthenticated && role === "admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
