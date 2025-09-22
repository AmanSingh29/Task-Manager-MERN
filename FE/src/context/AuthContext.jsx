import { createContext, useState, useEffect } from "react";
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
  clearAuthFromLocalStorage,
} from "../utils/authHelpers";
import useApi from "../hooks/useApi";
import { ME } from "../contants/endPoints";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { get } = useApi()

  const setAuthUser = (user, token) => {
    setUser(user);
    setUserToLocalStorage(user, token);
  };

  const handleLogout = () => {
    setUser(null);
    clearAuthFromLocalStorage();
  };

  const verifyUser = async () => {
    const storedUser = getUserFromLocalStorage();
    if (!storedUser?.token) {
      setLoading(false);
      return;
    }
    try {
      const res = await get(ME);
      setUser(res.user);
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
