/**
 * CartSidebar Component
 * Displays a sidebar containing cart items, prices, and a checkout button.
 * Allows users to remove items and proceed to checkout or complete the order.
 *
 * @file CartSidebar.js
 * @module components/CartSidebar
 * @requires react
 * @requires CartContext - Provides cart-related state and functions.
 * @requires LoginContext - Provides login status and user role.
 * @requires react-router-dom - Enables navigation functionality.
 * @requires cartStyle.css - CSS for sidebar styling.
 */

import React, { useContext, useState, useEffect } from "react";
import CartContext from "./CartContext";
import "../../styles/Cart/cartStyle.css";
import LoginContext from "../Login/LoginContext";
import { useNavigate } from "react-router-dom";

/**
 * A component that displays a sidebar showing the contents of the shopping cart,
 * including item details, subtotal, tax, and total price.
 * 
 * The component also provides an option for checking out.
 * 
 * @component
 * @example
 * <CartSidebar />
 * 
 * @returns {JSX.Element} The rendered CartSidebar component.
 */
const CartSidebar = () => {
  // Access cart-related state and methods from CartContext
  const { menuItems, removeMenuItem, total, tax, completeOrder } = useContext(CartContext);

  // State to store food item names fetched asynchronously
  const [foodItemNames, setFoodItemNames] = useState({});

  // Access login state (isLoggedIn and role) from LoginContext
  const { isLoggedIn, role } = useContext(LoginContext);

  // Navigation hook for redirecting users
  const navigate = useNavigate();

  /**
   * Fetches the names of food items associated with each menu item in the cart.
   * Updates the state with a mapping of menu item IDs to their corresponding food item names.
   * The effect runs whenever the `menuItems` dependency changes.
   */
  useEffect(() => {
    const fetchFoodItemNames = async () => {
      const namesMap = {};
      for (const item of menuItems) {
        // Fetch names asynchronously for each menu item
        const names = await item.getFoodItemNames();
        namesMap[item.getMenuItemId()] = names;
      }
      setFoodItemNames(namesMap);
    };

    fetchFoodItemNames();
  }, [menuItems]);

  /**
   * Handles the completion of an order. If the user is logged in and has an appropriate role,
   * the order is completed. Otherwise, navigates the user to the checkout page.
   */
  const finishOrder = () => {
    if (isLoggedIn && (role === "cashier" || role === "admin" || role === "manager")) {
      completeOrder();
    } else {
      navigate("/checkout");
    }
  };

  return (
    /**
     * Sidebar container displaying cart details.
     */
    <div className="cart-sidebar">
      <div className="cart-sidebar-content">
        <h2>Cart</h2>
        <ul>
          {/* Map through menuItems to render each item in the cart */}
          {menuItems.map((item, index) => (
            <li key={index} className="cart-item">
              {/* Cart item details */}
              <div className="cart-item-details">
                {/* Display item name */}
                <div className="cart-item-name">{item.getName()}</div>

                {/* Display associated food items */}
                <div className="cart-item-food">
                  {foodItemNames[item.getMenuItemId()]?.join(", ") || "Loading food items..."}
                </div>

                {/* Display item price */}
                <div className="cart-item-price">${item.getTotal().toFixed(2)}</div>
              </div>

              {/* Remove button to delete item from the cart */}
              <button
                className="cart-remove-button"
                onClick={() => removeMenuItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Cart totals: Subtotal, Tax, and Overall Total */}
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
            <span className="right-justified">${(total + tax).toFixed(2)}</span>
          </span>
        </div>
      </div>

      {/* Checkout button */}
      <button className="checkout-button" onClick={finishOrder}>
        Checkout
      </button>
    </div>
  );
};

export default CartSidebar;
