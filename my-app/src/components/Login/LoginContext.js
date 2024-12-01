import React, { createContext, useState } from "react";
import addOnlineUsers from "../../pages/api/onlineUsers/addOnlineUsers";
import addCustomer from "../../pages/api/customer/addCustomers";
import getOnlineUsersEmail from "../../pages/api/onlineUsers/getOnlineUserEmail";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [customerId, setCustomerId] = useState(0);

  const checkOnlineUser = async (googleUser) => {

    const user = await getOnlineUsersEmail(googleUser.email);
    if (user){
        setRole(user.role);
        setCustomerId(user.customer_id);
    } else {
        createOnlineUser(googleUser)
    }
    setIsLoggedIn(true);
    
  }

  const createOnlineUser = async (googleUser) => {
    const customer = await addCustomer(googleUser.given_name, googleUser.family_name, "online", null);
    setCustomerId(customer.customer_id);
    await addOnlineUsers(googleUser.given_name, googleUser.family_name, googleUser.email, "customer", customer.customer_id);
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
        logOut,
        customerId,
        setCustomerId,
        }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
