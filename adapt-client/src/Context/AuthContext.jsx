import React, { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isLoggedIn") || "false");
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isAdmin") || "false");
  });

  const [id, setId] = useState(() => sessionStorage.getItem("id") || "");
  const [username, setUsername] = useState(
    () => sessionStorage.getItem("username") || ""
  );
  const [emailId, setEmailId] = useState(
    () => sessionStorage.getItem("emailId") || ""
  );
  const [token, setToken] = useState(
    () => sessionStorage.getItem("token") || ""
  );

  useEffect(() => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("emailId", emailId);
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
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
    setId("");
    setUsername("");
    setEmailId("");
    setLoggedIn(false);
    setIsAdmin(false);

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("emailId");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isAdmin");
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
