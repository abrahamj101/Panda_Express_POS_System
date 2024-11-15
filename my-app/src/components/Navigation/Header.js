import React, { useState, useContext } from "react";
import logo from "../../images/panda-express-logo-1.svg";
import Login from "../Modal/Login.js"; // Import the Modal component
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import CartContext from "../Cart/CartContext"

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const { menuItems, printCart } = useContext(CartContext); // Access cart state from context

  const handleLoginClick = () => {
    setIsModalOpen(true); // Open modal on button click
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleCartClick = () => {
    printCart()
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
        <button className="login-btn" onClick={handleLoginClick}>
          Login
        </button>
        <div className="cart-container" onClick={handleCartClick}>
          <FaCartShopping className="cart-icon" />
          {menuItems.length > 0 && (
            <span className="cart-badge">{menuItems.length}</span>
          )}
        </div>
      </div>
      <Login isOpen={isModalOpen} onClose={handleCloseModal} /> {/* Render Modal */}
    </header>
  );
}

export default Header;
