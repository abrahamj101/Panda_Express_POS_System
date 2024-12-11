/**
 * Checkout Component
 * This page allows users to review their cart, input payment details, and place an order.
 * It fetches food item names dynamically, calculates totals (including tax), and validates form inputs.
 *
 * @file Checkout.js
 * @module pages/Checkout
 * @requires react
 * @requires react-router-dom
 * @requires ../components/Navigation/Header
 * @requires ../components/Navigation/Footer
 * @requires ../components/Navigation/BackButton
 * @requires ../components/Cart/CartContext
 * @requires ../components/Zoom/ZoomContext
 * @requires ../components/Login/LoginContext
 * @requires ../styles/Pages/default.css
 * @requires ../styles/Pages/Checkout.css
 */

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import BackButton from "../components/Navigation/BackButton";
import "../styles/Pages/default.css";
import CartContext from "../components/Cart/CartContext";
import { useZoom } from "../components/Zoom/ZoomContext";
import "../styles/Pages/Checkout.css";
import LoginContext from "../components/Login/LoginContext";

/**
 * Checkout Component
 *
 * @returns {JSX.Element} The checkout page, where users can review their cart,
 * fill in payment details, and place an order.
 */
function Checkout() {
  const navigate = useNavigate(); // Navigation hook
  const { zoomLevel } = useZoom(); // Zoom level for accessibility scaling
  const [foodItemNames, setFoodItemNames] = useState({});
  const { menuItems, removeMenuItem, total, tax, completeOrder } =
    useContext(CartContext);
  const { isLoggedIn, customerId } = useContext(LoginContext);

  /**
   * State to manage checkout form input values.
   * @type {Object}
   */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    creditCard: "",
  });

  /**
   * State to manage form validation errors.
   * @type {string}
   */
  const [formError, setFormError] = useState("");

  /**
   * Handles input changes in the checkout form.
   *
   * @param {Object} e - Event object for input change.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Validates the checkout form input fields.
   *
   * @returns {boolean} True if the form inputs are valid, otherwise false.
   */
  const validateForm = () => {
    const { name, email, creditCard } = formData;

    if (!name || !email || !creditCard) {
      setFormError("Please fill out all fields.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email address.");
      return false;
    }

    if (!/^\d{16}$/.test(creditCard)) {
      setFormError("Please enter a valid 16-digit credit card number.");
      return false;
    }

    setFormError("");
    return true;
  };

  /**
   * Handles the "Place Order" button click event.
   * Validates form data and completes the order, then navigates back to the home page.
   *
   * @async
   */
  const handlePlaceOrder = async () => {
    if (validateForm()) {
      if (isLoggedIn) {
        await completeOrder(customerId);
      } else {
        await completeOrder();
      }
      navigate("/");
    }
  };

  /**
   * Fetches food item names for each menu item in the cart.
   * Runs when the menuItems array changes.
   *
   * @async
   */
  useEffect(() => {
    const fetchFoodItemNames = async () => {
      const namesMap = {};
      for (const item of menuItems) {
        const names = await item.getFoodItemNames();
        namesMap[item.getMenuItemId()] = names;
      }
      setFoodItemNames(namesMap);
    };

    fetchFoodItemNames();
  }, [menuItems]);

  return (
    <div
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Page header */}
      <Header />
      <div className="main-content checkout-page">
        <BackButton location="/" />
        <h2>Checkout</h2>

        {/* Cart items */}
        <ul className="checkout-cart-items">
          {menuItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img
                src={item.getImageLink()}
                alt={item.getName()}
                className="cart-image"
              />
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
              <button
                className="cart-remove-button"
                onClick={() => removeMenuItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Cart totals */}
        <div className="cart-total">
          <p>
            <strong>Subtotal:</strong> ${total.toFixed(2)}
          </p>
          <p>
            <strong>Tax:</strong> ${tax.toFixed(2)}
          </p>
          <p>
            <strong>Total:</strong> ${(total + tax).toFixed(2)}
          </p>
        </div>

        {/* Checkout form */}
        <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="checkout-input"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="checkout-input"
            />
          </label>
          <label>
            Credit Card:
            <input
              type="text"
              name="creditCard"
              value={formData.creditCard}
              onChange={handleInputChange}
              className="checkout-input"
            />
          </label>
          {formError && <p className="form-error">{formError}</p>}
          <button
            type="button"
            className="checkout-button"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default Checkout;
