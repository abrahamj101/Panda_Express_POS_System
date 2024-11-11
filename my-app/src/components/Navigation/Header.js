import React, { useState } from "react";
import logo from "../../images/panda-express-logo-1.svg";
import Login from "../Modal/Login.js"; // Import the Modal component
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton.js";

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
      <button className="login-btn" onClick={handleLoginClick}>
        Login
      </button>
      <Login isOpen={isModalOpen} onClose={handleCloseModal} />{" "}
      {/* <AuthButton
          clientId={clientId}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
          setUser={setUser}
        /> */}
      {/* Render Modal */}
    </header>
  );
}

export default Header;
