import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite/api";
import { useLocation, useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const checkAuthUser = async () => {
    try {
      const { $id, name, username, email } = await getCurrentUser();

      if ($id) {
        setUser({
          $id,
          name,
          username,
          email,
        });

        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    const protectedRoutes = ["/groups", "/app"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (isProtectedRoute && (!cookieFallback || cookieFallback === "[]")) {
      navigate("/");
    } else {
      checkAuthUser();
    }
  }, [navigate, location]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContent = () => useContext(AuthContext);
