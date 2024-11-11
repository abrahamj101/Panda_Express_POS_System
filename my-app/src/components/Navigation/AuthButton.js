// AuthButton.js
import React, { useEffect } from "react";

function AuthButton({ clientId, isSignedIn, setIsSignedIn, setUser }) {
  useEffect(() => {
    // Load Google Sign-In script
    const loadGoogleScript = () => {
      if (!document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleSignInButton;
        document.body.appendChild(script);
      } else {
        initializeGoogleSignInButton();
      }
    };

    // Initialize Google Sign-In button
    const initializeGoogleSignInButton = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          ux_mode: "popup",
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          { theme: "outline", size: "large" }
        );
      }
    };

    // Handle the response from Google Sign-In
    const handleCredentialResponse = (response) => {
      const token = response.credential;
      setUser(token); // Store the token or user info as needed
      setIsSignedIn(true);
      localStorage.setItem("authToken", token); // Store token in localStorage
    };

    // Check if user is already signed in on component mount
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setUser(storedToken);
      setIsSignedIn(true);
    }

    loadGoogleScript();
  }, [clientId, setIsSignedIn, setUser]);

  const handleGoogleSignOut = () => {
    window.google.accounts.id.disableAutoSelect();
    setIsSignedIn(false);
    setUser(null);
    localStorage.removeItem("authToken"); // Clear token from localStorage
  };

  return (
    <div className="auth-button-container">
      <div
        id="googleSignInButton"
        style={{ display: isSignedIn ? "none" : "block" }}
      ></div>
      <button
        className="logout-btn"
        style={{ display: isSignedIn ? "block" : "none" }}
        onClick={handleGoogleSignOut}
      >
        Logout
      </button>
    </div>
  );
}

export default AuthButton;
