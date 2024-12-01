import React, { createContext, useState, useEffect } from "react";
import addOnlineUsers from "../../pages/api/onlineUsers/addOnlineUsers";
import addCustomer from "../../pages/api/customer/addCustomers";
import getOnlineUsersEmail from "../../pages/api/onlineUsers/getOnlineUserEmail";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [customerId, setCustomerId] = useState(0);

  useEffect(() => {
    const storedRole = localStorage.getItem("loginRole");
    const storedLoginStatus = localStorage.getItem("loginStatus");
    const storedCustomerId = localStorage.getItem("customerId");

    if (storedRole) setRole(storedRole)
    if (storedLoginStatus) setIsLoggedIn(storedLoginStatus);
    if (storedCustomerId) setCustomerId(parseInt(storedCustomerId));
  }, []);

  const checkOnlineUser = async (googleUser) => {

    const user = await getOnlineUsersEmail(googleUser.email);
    if (user){
        setRole(user.role);
        setCustomerId(user.customer_id);
        localStorage.setItem("loginRole", user.role);
        localStorage.setItem("customerId", user.customer_id.toString());
    } else {
        createOnlineUser(googleUser)
    }
    localStorage.setItem("loginStatus", true);
    setIsLoggedIn(true);
    
  }

  const createOnlineUser = async (googleUser) => {
    const customer = await addCustomer(googleUser.given_name, googleUser.family_name, "online", null);
    setCustomerId(customer.customer_id);
    localStorage.setItem("customerId", customer.customer_id.toString());
    localStorage.setItem("loginRole", "customer");
    await addOnlineUsers(googleUser.given_name, googleUser.family_name, googleUser.email, "customer", customer.customer_id);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("loginRole");
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("customerId");
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
