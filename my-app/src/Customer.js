// Customer.js
import React, { useState } from "react";
import logo from "./panda-express-logo-1.svg";
import AuthButton from "./AuthButton";
import "./Customer.css";

function CustomerPage() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const foodItems = Array(9).fill("*Food Item Image*");

  return (
    <div className="menu-page">
      <header className="header">
        <div className="logo">
          <a href="/">
          <img src={logo} alt="Panda Express Logo" />
          </a>
        </div>
        <h1>Panda Express</h1>
        
        {}
        <AuthButton
          clientId={clientId}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
          setUser={setUser}
        />
      </header>

      <main className="menu-content">
        <div className="food-grid">
          {foodItems.map((item, index) => (
            <div key={index} className="food-item">
              <p>{item}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>300 Polo Rd Room 129, College Station, TX 77840</p>
        <p>
          <b>(979) 773-8811</b>
        </p>
      </footer>
    </div>
  );
}

export default CustomerPage;
