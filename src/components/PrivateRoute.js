import { Navigate } from "react-router-dom";
import { useAuth } from "../context";

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const token = localStorage.getItem("token");
  if (token == null) {
    return <Navigate to="/login" />;
  }
  return children;
}
