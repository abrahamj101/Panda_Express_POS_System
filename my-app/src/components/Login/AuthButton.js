// AuthButton.js
import React, { useEffect, useState, useContext } from "react";
import LoginContext from "./LoginContext";

function AuthButton() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState(null);
    const {checkOnlineUser, logOut} = useContext(LoginContext)
  
    
  
    const parseJwt = (token) => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error("Failed to parse JWT:", e);
        return null;
      }
    };
  
    // Initialize Google Sign-In
    const initializeGSI = () => {
      /* global google */
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
      });
    };
  
    // Render Google Sign-In button
    const renderGoogleButton = () => {
      if (document.getElementById("googleSignInDiv")) {
        document.getElementById("googleSignInDiv").innerHTML = "";
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
      }
    };
  
    // Handle Google Sign-In response
    const handleCredentialResponse = (response) => {
      const userObject = parseJwt(response.credential);
      if (userObject) {
        setUser(userObject);
        setIsSignedIn(true);
        localStorage.setItem("authToken", response.credential);
      }
      checkOnlineUser(userObject);
      
    };
  
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
  
    useEffect(() => {
      if (!isSignedIn && window.google) {
        initializeGSI();
        renderGoogleButton();
      }
    }, [isSignedIn]);
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const userObject = parseJwt(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (userObject && userObject.exp > currentTime) {
          setUser(userObject);
          setIsSignedIn(true);
        } else {
          // Token expired or invalid
          localStorage.removeItem("authToken");
        }
      }
    }, []);
  
    const handleSignOut = () => {
      window.google.accounts.id.disableAutoSelect();
      setUser(null);
      setIsSignedIn(false);
      // Remove token from localStorage
      localStorage.removeItem("authToken");
      logOut();
    };

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
                fontSize: "20px"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div id="googleSignInDiv"></div>
          </>
        )}
    </div>
  );
}

export default AuthButton;