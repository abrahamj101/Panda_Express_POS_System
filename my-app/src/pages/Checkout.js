import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the navigation hook
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import BackButton from "../components/Navigation/BackButton";
import "../styles/Pages/default.css";
import CartContext from "../components/Cart/CartContext";
import { useZoom } from "../components/Zoom/ZoomContext";
import "../styles/Pages/Checkout.css";

function Checkout() {
  const navigate = useNavigate(); // Initialize navigation
  const { zoomLevel } = useZoom();
  const [foodItemNames, setFoodItemNames] = useState({});
  const { menuItems, removeMenuItem, total, tax, completeOrder } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    creditCard: "",
  });
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handlePlaceOrder = async () => {
    if (validateForm()) {
      await completeOrder();
      navigate("/");
    }
  };

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
      <Header />
      <div className="main-content checkout-page">
        <BackButton location="/" />
        <h2>Checkout</h2>
        <ul className="checkout-cart-items">
          {menuItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.getImageLink()} alt={item.getName()} className="cart-image" />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.getName()}</div>
                <div className="cart-item-food">
                  {foodItemNames[item.getMenuItemId()]?.join(", ") || "Loading food items..."}
                </div>
                <div className="cart-item-price">${item.getTotal().toFixed(2)}</div>
              </div>
              <button className="cart-remove-button" onClick={() => removeMenuItem(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <p><strong>Subtotal:</strong> ${total.toFixed(2)}</p>
          <p><strong>Tax:</strong> ${tax.toFixed(2)}</p>
          <p><strong>Total:</strong> ${(total + tax).toFixed(2)}</p>
        </div>
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
          <button type="button" className="checkout-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
