import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);
  let role;

  if (auth?.accessToken && auth?.user) {
    if (auth.user?.role === "admin") {
      role = "admin";
    } else if (auth.user?.role === "student") {
      role = "student";
    }
    return { isAuthenticated: true, role };
  } else {
    return { isAuthenticated: false };
  }
}
