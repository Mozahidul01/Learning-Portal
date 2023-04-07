import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function StudentRoute({ children }) {
  const { isAuthenticated, role = "" } = useAuth();

  if (isAuthenticated && role === "student") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
