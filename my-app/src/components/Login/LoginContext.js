import React, { createContext, useState } from "react";
import addOnlineUsers from "../../pages/api/onlineUsers/addOnlineUsers";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");



  return (
    <LoginContext.Provider value={{
        isLoggedIn,
        setIsLoggedIn,
        role,
        setRole,
        }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
