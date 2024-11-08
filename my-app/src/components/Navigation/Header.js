import React, { useState } from "react";
import logo from "../../images/panda-express-logo-1.svg";
import Modal from "../Modal"; // Import the Modal component
import { Link } from "react-router-dom";

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
      <Link to="/">
        <h1>Panda Express</h1>
      </Link>
      <button className="login-btn" onClick={handleLoginClick}>
        Login
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />{" "}
      {/* Render Modal */}
    </header>
  );
}

export default Header;
