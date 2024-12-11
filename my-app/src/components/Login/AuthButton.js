/**
 * AuthButton Component
 * This component handles Google Sign-In and Sign-Out functionality, integrates with Google Identity Services,
 * and manages user authentication state. It also interacts with LoginContext for user role management 
 * and CartContext for clearing the cart on sign-out.
 * 
 * Features:
 * - Displays Google Sign-In button for unauthenticated users.
 * - Shows user profile picture and a logout button for authenticated users.
 * - Parses JWT tokens to extract user information and checks token validity.
 * - Automatically initializes Google Identity Services and renders the sign-in button.
 *
 * @file AuthButton.js
 * @module components/AuthButton
 * @requires react
 * @requires ../components/Login/LoginContext
 * @requires ../components/Cart/CartContext
 */

import React, { useEffect, useState, useContext } from "react";
import LoginContext from "./LoginContext";
import CartContext from "../Cart/CartContext";

/**
 * AuthButton Component
 *
 * @returns {JSX.Element} A button for Google Sign-In or Sign-Out with user profile display.
 */
function AuthButton() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Tracks sign-in state
  const [user, setUser] = useState(null); // Stores user information
  const { checkOnlineUser, logOut } = useContext(LoginContext);
  const { emptyCart } = useContext(CartContext);

  /**
   * Parses a JWT token to extract payload data.
   *
   * @param {string} token - The JWT token to parse.
   * @returns {Object|null} Parsed token payload as an object, or null if parsing fails.
   */
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to parse JWT:", e);
      return null;
    }
  };

  /**
   * Initializes Google Identity Services (GSI) for sign-in.
   */
  const initializeGSI = () => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
    });
  };

  /**
   * Renders the Google Sign-In button.
   */
  const renderGoogleButton = () => {
    if (document.getElementById("googleSignInDiv")) {
      document.getElementById("googleSignInDiv").innerHTML = "";
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  };

  /**
   * Handles the credential response from Google Identity Services.
   *
   * @param {Object} response - Google credential response.
   */
  const handleCredentialResponse = (response) => {
    const userObject = parseJwt(response.credential);
    if (userObject) {
      setUser(userObject);
      setIsSignedIn(true);
      localStorage.setItem("authToken", response.credential);
      checkOnlineUser(userObject);
    }
  };

  /**
   * Handles user sign-out, clears user state, and resets related data.
   */
  const handleSignOut = () => {
    window.google.accounts.id.disableAutoSelect();
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem("authToken");
    logOut();
    emptyCart();
  };

  // Load Google Identity Services script
  useEffect(() => {
    const loadGoogleScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          initializeGSI();
          renderGoogleButton();
        };
        document.body.appendChild(script);
      } else {
        initializeGSI();
        renderGoogleButton();
      }
    };
    loadGoogleScript();
  }, []);

  // Re-render Google button if sign-in state changes
  useEffect(() => {
    if (!isSignedIn && window.google) {
      initializeGSI();
      renderGoogleButton();
    }
  }, [isSignedIn]);

  // Check for existing auth token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const userObject = parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (userObject && userObject.exp > currentTime) {
        setUser(userObject);
        setIsSignedIn(true);
      } else {
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  return (
    <div className="auth-button-container">
      {isSignedIn ? (
        <>
          <img
            src={user.picture}
            alt="Profile"
            style={{
              width: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <button
            className="logout-btn"
            onClick={handleSignOut}
            style={{
              backgroundColor: "white",
              color: "#b02321",
              outline: "1px solid white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "15px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <div id="googleSignInDiv"></div>
      )}
    </div>
  );
}

export default AuthButton;
