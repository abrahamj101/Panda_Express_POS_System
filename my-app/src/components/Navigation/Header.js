// Header.js
import React, { useState, useEffect } from "react";
import logo from "../../images/panda-express-logo-1.svg";
import Login from "../Modal/Login.js";
import { Link } from "react-router-dom";
import CartIcon from "../Cart/CartIcon.js";
import CartModal from "../Modal/CartModal.js";
import "../../styles/Header.css";
import AuthButton from "./AuthButton.js";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Panda Express Logo" />
        </Link>
      </div>
      <h1 className="panda-name">Panda Express</h1>
      <div className="header-buttons">
        <CartIcon />
        <CartModal />
        <AuthButton />
      </div>
      <Login isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
}

export default Header;
