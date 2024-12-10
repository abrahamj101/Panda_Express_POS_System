/**
 * LoginContext Module
 * Manages user authentication, login state, role management, and integration with online user APIs.
 * Stores authentication state in localStorage for persistence across sessions.
 *
 * @file LoginContext.js
 * @module context/LoginContext
 * @requires addOnlineUsers - API function to add online users.
 * @requires addCustomer - API function to add new customers.
 * @requires getOnlineUsersEmail - API function to retrieve online users by email.
 * @requires react - React library for creating context and managing state.
 */

import React, { createContext, useState, useEffect } from "react";
import addOnlineUsers from "../../pages/api/onlineUsers/addOnlineUsers";
import addCustomer from "../../pages/api/customer/addCustomers";
import getOnlineUsersEmail from "../../pages/api/onlineUsers/getOnlineUserEmail";

/**
 * LoginContext
 * Provides authentication state and functions to components via React Context API.
 */
const LoginContext = createContext();

/**
 * LoginProvider Component
 * Manages user login, role assignment, and session persistence.
 *
 * @param {Object} props - React component props.
 * @param {React.ReactNode} props.children - Child components that consume the context.
 *
 * @returns {JSX.Element} A provider wrapping child components with login-related state and methods.
 */
export const LoginProvider = ({ children }) => {
  // State variables for login status, user role, and customer ID
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [customerId, setCustomerId] = useState(0);

  /**
   * useEffect - Initializes login state from localStorage on component mount.
   * Retrieves stored role, login status, and customer ID for session persistence.
   */
  useEffect(() => {
    const storedRole = localStorage.getItem("loginRole");
    const storedLoginStatus = localStorage.getItem("loginStatus");
    const storedCustomerId = localStorage.getItem("customerId");

    if (storedRole) setRole(storedRole);
    if (storedLoginStatus) setIsLoggedIn(storedLoginStatus === "true");
    if (storedCustomerId) setCustomerId(parseInt(storedCustomerId, 10));
  }, []);

  /**
   * checkOnlineUser - Verifies if a user exists in the system via their Google email.
   * If not, creates a new online user and updates the login state.
   *
   * @param {Object} googleUser - Google user object containing user details.
   * @param {string} googleUser.email - User's email address.
   * @param {string} googleUser.given_name - User's first name.
   * @param {string} googleUser.family_name - User's last name.
   */
  const checkOnlineUser = async (googleUser) => {
    const user = await getOnlineUsersEmail(googleUser.email);

    if (user) {
      // User exists: Set role and customer ID
      setRole(user.role);
      setCustomerId(user.customer_id);
      localStorage.setItem("loginRole", user.role);
      localStorage.setItem("customerId", user.customer_id.toString());
    } else {
      // User does not exist: Create a new online user
      createOnlineUser(googleUser);
    }

    localStorage.setItem("loginStatus", "true");
    setIsLoggedIn(true);
  };

  /**
   * createOnlineUser - Creates a new online user and updates the login state.
   *
   * @param {Object} googleUser - Google user object containing user details.
   */
  const createOnlineUser = async (googleUser) => {
    const customer = await addCustomer(
      googleUser.given_name,
      googleUser.family_name,
      "online",
      null
    );
    setCustomerId(customer.customer_id);

    localStorage.setItem("customerId", customer.customer_id.toString());
    localStorage.setItem("loginRole", "customer");

    await addOnlineUsers(
      googleUser.given_name,
      googleUser.family_name,
      googleUser.email,
      "customer",
      customer.customer_id
    );
  };

  /**
   * logOut - Logs out the user by clearing login state and removing stored data from localStorage.
   */
  const logOut = () => {
    setIsLoggedIn(false);
    setRole("");
    setCustomerId(0);

    localStorage.removeItem("loginRole");
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("customerId");
  };

  return (
    /**
     * LoginContext.Provider - Provides login-related state and methods to child components.
     */
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        role,
        setRole,
        checkOnlineUser,
        logOut,
        customerId,
        setCustomerId,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
