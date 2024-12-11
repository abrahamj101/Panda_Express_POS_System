/**
 * ProtectedPage Component
 * Restricts access to specific pages based on the user's login status and role.
 * Redirects unauthorized users to the homepage ("/").
 *
 * @file ProtectedPage.js
 * @module components/ProtectedPage
 * @requires react - React library for component creation.
 * @requires react-router-dom - Provides the Navigate component for redirection.
 * @requires LoginContext - Context for login status and role management.
 */

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "./LoginContext";

/**
 * ProtectedPage Component
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to render if access is granted.
 * @param {Array<string>} [props.requiredRole] - Roles allowed to access the page (optional).
 *
 * @returns {JSX.Element} Renders children if access is granted; otherwise redirects to "/".
 */
const ProtectedPage = ({ children, requiredRole }) => {
  // Access login status and user role from LoginContext
  const { isLoggedIn, role } = useContext(LoginContext);

  // Testing mode flag: bypass access restrictions when testing
  const isTestingMode = process.env.REACT_APP_TESTING_MODE === "false";

  /**
   * Check if the app is running in testing mode.
   * If true, allow access to all pages without restrictions.
   */
  if (isTestingMode) {
    return children; // Allow access in testing mode
  }

  /**
   * Redirect unauthenticated users to the homepage.
   */
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  /**
   * If specific roles are required, check if the user's role matches any of the allowed roles.
   * Redirect the user to the homepage if their role is unauthorized.
   */
  if (requiredRole && !requiredRole.includes(role)) {
    return <Navigate to="/" />;
  }

  // Render children if all checks pass
  return children;
};

export default ProtectedPage;
