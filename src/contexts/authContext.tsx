import { UserDto } from "interfaces/user/userDto";
import { ReactNode, createContext, useContext, useState } from "react";

export interface AuthContextType {
  user: UserDto | null;
  isLoggedIn: boolean;
  login: (user: UserDto) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserDto | null>(null);
  const login = (user: UserDto) => {
    setIsLoggedIn(true);
    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };
  const data = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
  };
  