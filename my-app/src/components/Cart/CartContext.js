import React, { createContext, useState } from "react";
import addOrders from "../../pages/api/orders/addOrders";

const CartContext = createContext();
export default CartContext

export const CartContextProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const updateCartTotals = (items) => {
    const newTotal = items.reduce((acc, item) => acc + item.getTotal(), 0);
    setTotal(newTotal);
    setTax(newTotal * 0.0825);
  };

  const addMenuItem = (menuItem) => {
    setMenuItems((prevItems) => {
      const updatedItems = [...prevItems, menuItem];
      updateCartTotals(updatedItems);
      return updatedItems;
    });
  };

  const removeMenuItem = (menuItemIndex) => {
    setMenuItems((prevItems) => {
      const updatedItems = prevItems.filter((_, index) => index !== menuItemIndex);
      updateCartTotals(updatedItems);
      return updatedItems;
    });
  };

  const getMenuIds = () => {
    return menuItems.map((item) => item.getMenuItemId());
  };

  const emptyCart = () => {
    setMenuItems([]);
    setTotal(0);
    setTax(0);
  };

  const completeOrder = async (customerId=0) => {
    if (menuItems.length > 0) {
      try {
        await addOrders(customerId, menuItems, total, tax);
        for (let menuItem of menuItems) {
          await menuItem.alterInventory();
        }
        emptyCart();
      } catch (error) {
        console.error("Failed to complete order:", error.message);
      }
    }
      
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Used for testing
  const printCart = async () => {
    console.log("Menu Item Name                  Price");
    console.log("------------------------------------");

    for (let menuItem of menuItems) {
      console.log(`${menuItem.getName().padEnd(30)} $${menuItem.getTotal().toFixed(2)}`);

      try {
        const foodItemNames = await menuItem.getFoodItemNames();
        for (const foodItemName of foodItemNames) {
          console.log(`  - ${foodItemName}`);
        }
      } catch (error) {
        console.error("Error retrieving food item names:", error.message);
      }
    }

    console.log("------------------------------------");
    console.log(`Total                           $${total.toFixed(2)}`);
    console.log(`Tax (8.25%)                     $${tax.toFixed(2)}`);
    console.log(`Grand Total                     $${(total + tax).toFixed(2)}`);
  };

  return (
    <CartContext.Provider
      value={{
        menuItems,
        total,
        tax,
        isCartOpen,
        addMenuItem,
        removeMenuItem,
        getMenuIds,
        emptyCart,
        completeOrder,
        printCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};