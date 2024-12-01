import React, { useContext, useState, useEffect } from "react";
import CartContext from "./CartContext";
import "../../styles/Cart/cartStyle.css";
import LoginContext from "../Login/LoginContext";

const CartModal = () => {
  const { menuItems, isCartOpen, removeMenuItem, toggleCart, total, tax, completeOrder } = useContext(CartContext);
  const [foodItemNames, setFoodItemNames] = useState({});
  const { isLoggedIn, customerId } = useContext(LoginContext);

  useEffect(() => {
    const fetchFoodItemNames = async () => {
      const namesMap = {};
      for (const item of menuItems) {
        const names = await item.getFoodItemNames();
        namesMap[item.getMenuItemId()] = names;
      }
      setFoodItemNames(namesMap);
    };

    if (isCartOpen) {
      fetchFoodItemNames();
    }
  }, [menuItems, isCartOpen]);


  const finishOrder = () => {
    if (isLoggedIn && customerId) {
      completeOrder(customerId);
    } else {
      completeOrder();
    }
  }
  

  if (!isCartOpen) return null;

  return (
    <div className="cart-modal">
      <div className="cart-modal-content">
        <h2>Your Cart</h2>
        <ul>
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
          <span className="totals"><strong>Subtotal: </strong><span className="right-justified">${total.toFixed(2)}</span></span>
          <span className="totals"><strong>Tax: </strong><span className="right-justified">${tax.toFixed(2)}</span></span>
          <span className="totals"><strong>Total: </strong><span className="right-justified">${(total + tax).toFixed(2)}</span></span>
        </div>
      </div>
      <button className="checkout-button" onClick={finishOrder}>Checkout</button>
      <button className="close-button" onClick={toggleCart}>Close</button>
    </div>
  );
};

export default CartModal;
