import React from "react";
import logo from "./panda-express-logo-1.svg";
import "./Customer.css";

function MenuPage() {
  const foodItems = Array(9).fill("*Food Item Image*");

  return (
    <div className="menu-page">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Panda Express Logo" />
        </div>
        <h1>Panda Express</h1>
        <button className="login-btn">Login</button>
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
        <p>*Contact Info*</p>
      </footer>
    </div>
  );
}

export default MenuPage;
