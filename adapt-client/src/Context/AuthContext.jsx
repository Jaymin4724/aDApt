import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
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
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("username", username);
    localStorage.setItem("emailId", emailId);
    localStorage.setItem("token", token);
  }, [isLoggedIn, username, emailId, token]);

  const login = (token, username, emailId, isLoggedIn) => {
    setToken(token);
    setUsername(username);
    setEmailId(emailId);
    setLoggedIn(isLoggedIn);
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
