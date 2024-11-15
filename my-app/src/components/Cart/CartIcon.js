import React, { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";
import CartContext from "../Cart/CartContext";
import "../../styles/cartStyle.css"

const CartIcon = () => {
  const { menuItems, toggleCart, printCart } = useContext(CartContext);


  return (
    <div className="cart-icon" onClick={toggleCart}>
      <FaCartShopping size={30} />
      {menuItems.length > 0 && <span className="cart-badge">{menuItems.length}</span>}
    </div>
  );
};

export default CartIcon;
