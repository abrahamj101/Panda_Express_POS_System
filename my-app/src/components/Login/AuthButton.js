/**
 * AuthButton Component
 * Handles Google authentication (sign-in and sign-out) using Google's Identity Services API.
 * Manages user authentication state and integrates with LoginContext and CartContext.
 *
 * @file AuthButton.js
 * @module components/AuthButton
 * @requires react - React library for component creation.
 * @requires LoginContext - Provides user login functions and state management.
 * @requires CartContext - Provides cart-related functions, such as emptying the cart on logout.
 */

import React, { useEffect, useState, useContext } from "react";
import LoginContext from "./LoginContext";
import CartContext from "../Cart/CartContext";

/**
 * AuthButton Component
 *
 * @returns {JSX.Element} A button or Google Sign-In component for authentication management.
 */
function AuthButton() {
  // State to track if the user is signed in and store user details
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Access LoginContext for authentication management
  const { checkOnlineUser, logOut, isLoggedin, role } = useContext(LoginContext);

  // Access CartContext to clear the cart upon logout
  const { emptyCart } = useContext(CartContext);

  /**
   * parseJwt - Parses a JSON Web Token (JWT) to extract the payload.
   *
   * @param {string} token - The JWT string.
   * @returns {Object|null} The decoded payload or null if parsing fails.
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
   * initializeGSI - Initializes the Google Identity Services API.
   */
  const initializeGSI = () => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // Your Google Client ID
      callback: handleCredentialResponse,
      auto_select: false,
    });
  };

  /**
   * renderGoogleButton - Renders the Google Sign-In button.
   */
  const renderGoogleButton = () => {
    const buttonDiv = document.getElementById("googleSignInDiv");
    if (buttonDiv) {
      buttonDiv.innerHTML = "";
      window.google.accounts.id.renderButton(buttonDiv, {
        theme: "outline",
        size: "large",
      });
    }
  };

  /**
   * handleCredentialResponse - Handles the Google Sign-In response.
   *
   * @param {Object} response - The response object containing the JWT credential.
   */
  const handleCredentialResponse = (response) => {
    const userObject = parseJwt(response.credential);
    if (userObject) {
      setUser(userObject);
      setIsSignedIn(true);
      localStorage.setItem("authToken", response.credential);
      checkOnlineUser(userObject);
    }
    console.log(userObject);
  };

  /**
   * Load Google's Identity Services script and render the Google button.
   */
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

  // useEffect to reinitialize the Google Sign-In button when `isSignedIn` changes
  useEffect(() => {
    if (!isSignedIn && window.google) {
      initializeGSI();
      renderGoogleButton();
    }
  }, [isSignedIn]);

  /**
   * Restore user session if a valid token exists in localStorage.
   */
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const userObject = parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (userObject && userObject.exp > currentTime) {
        setUser(userObject);
        setIsSignedIn(true);
      } else {
        localStorage.removeItem("authToken"); // Remove expired/invalid token
      }
    }
  }, []);

  /**
   * handleSignOut - Handles user sign-out.
   * Clears the user session, removes token, and resets the cart.
   */
  const handleSignOut = () => {
    window.google.accounts.id.disableAutoSelect();
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem("authToken");
    logOut();
    emptyCart();
  };

  return (
    <div className="auth-button-container">
      {isSignedIn ? (
        <>
          {/* Display user profile picture and Logout button */}
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
        <>
          {/* Render Google Sign-In button */}
          <div id="googleSignInDiv"></div>
        </>
      )}
    </div>
  );
}

export default AuthButton;
