import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

/* CREATE CONTEXT */
const AuthContext = createContext();

/* PROVIDER */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* LOAD FROM LOCAL STORAGE ON APP START */
  useEffect(() => {
    const storedUser = localStorage.getItem("blogvoci_user");
    const storedToken = localStorage.getItem("blogvoci_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  /* REGISTER */
  const register = async (name, email, password) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/register",
      { name, email, password }
    );

    localStorage.setItem("blogvoci_user", JSON.stringify(data));
    localStorage.setItem("blogvoci_token", data.token);

    setUser(data);
    setToken(data.token);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;
  };

  /* LOGIN */
  const login = async (email, password) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    localStorage.setItem("blogvoci_user", JSON.stringify(data));
    localStorage.setItem("blogvoci_token", data.token);

    setUser(data);
    setToken(data.token);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;
  };

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("blogvoci_user");
    localStorage.removeItem("blogvoci_token");

    setUser(null);
    setToken(null);

    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* CUSTOM HOOK */
export const useAuth = () => useContext(AuthContext);
