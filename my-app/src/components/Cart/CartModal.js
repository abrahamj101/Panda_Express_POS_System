/**
 * CartModal Component
 * Displays a modal showing the items in the cart with options to remove items, view totals, 
 * and proceed to checkout or finalize the order.
 *
 * @file CartModal.js
 * @module components/CartModal
 * @requires react
 * @requires CartContext - Provides cart state and functions.
 * @requires LoginContext - Provides login status and user role.
 * @requires react-router-dom - Enables navigation to the checkout page.
 * @requires cartStyle.css - Styles for the cart modal.
 */

import React, { useContext, useState, useEffect } from "react";
import CartContext from "./CartContext";
import "../../styles/Cart/cartStyle.css";
import LoginContext from "../Login/LoginContext";
import { useNavigate } from "react-router-dom";

/**
 * CartModal Component
 * Displays a list of cart items, totals (subtotal, tax, total), and buttons for actions like 
 * removing items, proceeding to checkout, or completing an order.
 *
 * @component
 * @returns {JSX.Element|null} Cart modal if the cart is open; null otherwise.
 */
const CartModal = () => {
  // Access cart-related state and functions from CartContext
  const {
    menuItems,
    isCartOpen,
    removeMenuItem,
    toggleCart,
    total,
    tax,
    completeOrder,
  } = useContext(CartContext);

  // State to store food item names for each cart item
  const [foodItemNames, setFoodItemNames] = useState({});

  // Access login state from LoginContext
  const { isLoggedIn, customerId, role } = useContext(LoginContext);

  // React Router's navigation hook
  const navigate = useNavigate();

  /**
   * useEffect Hook
   * Fetches food item names for all cart items when the cart is opened.
   */
  useEffect(() => {
    const fetchFoodItemNames = async () => {
      const namesMap = {};
      for (const item of menuItems) {
        // Fetch names for each food item in the cart asynchronously
        const names = await item.getFoodItemNames();
        namesMap[item.getMenuItemId()] = names;
      }
      setFoodItemNames(namesMap);
    };

    if (isCartOpen) {
      fetchFoodItemNames();
    }
  }, [menuItems, isCartOpen]);

  /**
   * finishOrder - Handles the "Checkout" button click.
   * - Finalizes the order if the user is logged in with specific roles.
   * - Navigates to the checkout page for other users.
   */
  const finishOrder = () => {
    if (isLoggedIn && (role === "cashier" || role === "admin" || role === "manager")) {
      completeOrder();
    } else {
      navigate("/checkout");
      toggleCart();
    }
  };

  // Return null if the cart is not open
  if (!isCartOpen) return null;

  return (
    /**
     * Cart modal container displaying the cart content.
     */
    <div className="cart-modal">
      <div className="cart-modal-content">
        <h2>Your Cart</h2>
        <ul>
          {/* Map through menuItems to display each cart item */}
          {menuItems.map((item, index) => (
            <li key={index} className="cart-item">
              {/* Item image */}
              <img
                src={item.getImageLink()}
                alt={item.getName()}
                className="cart-image"
              />
              {/* Item details: name, food items, and price */}
              <div className="cart-item-details">
                <div className="cart-item-name">{item.getName()}</div>
                <div className="cart-item-food">
                  {foodItemNames[item.getMenuItemId()]?.join(", ") ||
                    "Loading food items..."}
                </div>
                <div className="cart-item-price">
                  ${item.getTotal().toFixed(2)}
                </div>
              </div>
              {/* Remove button for each cart item */}
              <button
                className="cart-remove-button"
                onClick={() => removeMenuItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {/* Cart totals: subtotal, tax, and overall total */}
        <div className="cart-total">
          <span className="totals">
            <strong>Subtotal: </strong>
            <span className="right-justified">${total.toFixed(2)}</span>
          </span>
          <span className="totals">
            <strong>Tax: </strong>
            <span className="right-justified">${tax.toFixed(2)}</span>
          </span>
          <span className="totals">
            <strong>Total: </strong>
            <span className="right-justified">
              ${(total + tax).toFixed(2)}
            </span>
          </span>
        </div>
      </div>
      {/* Checkout and Close buttons */}
      <button className="checkout-button" onClick={finishOrder}>
        Checkout
      </button>
      <button className="close-button" onClick={toggleCart}>
        Close
      </button>
    </div>
  );
};

export default CartModal;
