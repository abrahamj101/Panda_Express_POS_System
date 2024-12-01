import React, { createContext, useState } from "react";
import addOnlineUsers from "../../pages/api/onlineUsers/addOnlineUsers";
import addCustomer from "../../pages/api/customer/addCustomers";
import getOnlineUsers from "../../pages/api/customer/getCustomers";
import getOnlineUsersEmail from "../../pages/api/onlineUsers/getOnlineUserEmail";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const checkOnlineUser = async (googleUser) => {
    
    const user = await getOnlineUsersEmail(googleUser.email);
    // if (user){
    //     setRole(user.role)
        
    // } else {
    //     createOnlineUser(googleUser)
    // }
    setIsLoggedIn(true);
    
  }

  const createOnlineUser = async (googleUser) => {
    
  };

  const logOut = () => {
    setIsLoggedIn(false);
  }


  return (
    <LoginContext.Provider value={{
        isLoggedIn,
        setIsLoggedIn,
        role,
        setRole,
        checkOnlineUser,
        logOut
        }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
