import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const data = {
    isLoggedIn,
    setIsLoggedIn,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
