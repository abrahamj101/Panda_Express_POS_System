import React, { useState, useContext } from "react";
import logo from "../../images/panda-express-logo-1.svg";
import Login from "../Modal/Login.js"; // Import the Modal component
import { Link } from "react-router-dom";
import CartIcon from "../Cart/CartIcon.js";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleLoginClick = () => {
    setIsModalOpen(true); // Open modal on button click
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Panda Express Logo" />
        </Link>
      </div>
      <h1>Panda Express</h1>
      <div className="header-buttons">
        <CartIcon/>
        <button className="login-btn" onClick={handleLoginClick}>
          Login
        </button>
      </div>
      <Login isOpen={isModalOpen} onClose={handleCloseModal} /> {/* Render Modal */}
    </header>
  );
}

export default Header;
