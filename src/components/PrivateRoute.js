import { Navigate } from "react-router-dom";
import { useAuth } from "../context";

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
