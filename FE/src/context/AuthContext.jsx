import { createContext, useState, useEffect } from "react";
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
  clearAuthFromLocalStorage,
} from "../utils/authHelpers";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthUser = (user, token) => {
    setUser(user);
    setUserToLocalStorage(user, token);
  };

  const handleLogout = () => {
    setUser(null);
    clearAuthFromLocalStorage();
  };

  const verifyUser = async () => {
    const stored = getUserFromLocalStorage();
    if (!stored?.token) {
      setLoading(false);
      return;
    }
    try {
      const res = await get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      clearAuthFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setAuthUser, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
