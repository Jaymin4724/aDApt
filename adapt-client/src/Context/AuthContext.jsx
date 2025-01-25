import React, { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return (
      localStorage.getItem("token") &&
      localStorage.getItem("isLoggedIn") === "true"
    );
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });
  const [id, setId] = useState(() => {
    return localStorage.getItem("id") || "";
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  const [emailId, setEmailId] = useState(() => {
    return localStorage.getItem("emailId") || "";
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("username", username);
    localStorage.setItem("emailId", emailId);
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("isAdmin", isAdmin);
  }, [token, id, username, emailId, isLoggedIn, isAdmin]);

  const login = (token, id, username, emailId, isLoggedIn, isAdmin) => {
    setToken(token);
    setId(id);
    setUsername(username);
    setEmailId(emailId);
    setLoggedIn(isLoggedIn);
    setIsAdmin(isAdmin);
  };

  // Logout function
  const logout = () => {
    setToken("");
    setUsername("");
    setEmailId("");
    setLoggedIn(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        setLoggedIn,
        isAdmin,
        setIsAdmin,
        id,
        setId,
        username,
        setUsername,
        emailId,
        setEmailId,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
