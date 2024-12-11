/**
 * CartIcon Component
 * Displays a shopping cart icon with a badge indicating the number of items in the cart.
 * Toggles the visibility of the cart when clicked.
 *
 * @file CartIcon.js
 * @module components/CartIcon
 * @requires react
 * @requires react-icons/fa6 - Provides the shopping cart icon.
 * @requires CartContext - Accesses cart state and toggleCart function.
 * @requires ../../styles/Cart/cartStyle.css - Component-specific styling.
 */

import React, { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6"; // Shopping cart icon
import CartContext from "../Cart/CartContext";
import "../../styles/Cart/cartStyle.css";

/**
 * CartIcon Component
 * Displays a clickable shopping cart icon with an item count badge.
 *
 * @component
 * @returns {JSX.Element} A shopping cart icon with item count, toggling the cart display.
 */
const CartIcon = () => {
  // Accessing cart state and functions from the CartContext
  const { menuItems, toggleCart } = useContext(CartContext);

  return (
    /**
     * Cart container with onClick event to toggle cart visibility.
     */
    <div className="cart-icon" onClick={toggleCart}>
      {/* Shopping cart icon with a set size */}
      <FaCartShopping size={30} />

      {/* Badge displaying the number of items in the cart, rendered conditionally */}
      {menuItems.length > 0 && (
        <span className="cart-badge">{menuItems.length}</span>
      )}
    </div>
  );
};

export default CartIcon;
