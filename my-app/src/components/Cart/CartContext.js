import React, { createContext, useState, useEffect } from "react";
import addOrders from "../../pages/api/orders/addOrders";
import MenuItem from "../MenuItems/MenuItemClass";

const CartContext = createContext();
export default CartContext;

export const CartContextProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart data from local storage and reconstruct MenuItem objects
  useEffect(() => {
    const storedMenuItems = localStorage.getItem("cartMenuItems");
    const storedTotal = localStorage.getItem("cartTotal");
    const storedTax = localStorage.getItem("cartTax");

    if (storedMenuItems) {
      const parsedMenuItems = JSON.parse(storedMenuItems);
      const reconstructedMenuItems = parsedMenuItems.map((item) => {
        return new MenuItem(
          item.menuitemId,
          item.name,
          item.total,
          item.imgLink,
          item.inventoryItemIds,
          item.inStock,
          item.foodItemIds
        );
      });
      setMenuItems(reconstructedMenuItems);
    }

    if (storedTotal) setTotal(parseFloat(storedTotal));
    if (storedTax) setTax(parseFloat(storedTax));
  }, []);


  const updateCartTotals = (items) => {
    const newTotal = items.reduce((acc, item) => acc + item.getTotal(), 0);
    localStorage.setItem("cartTotal", newTotal.toString());
    localStorage.setItem("cartTax", (newTotal * 0.0825).toString());
    setTotal(newTotal);
    setTax(newTotal * 0.0825);
  };

  const addMenuItem = (menuItem) => {
    console.log(menuItem);
    setMenuItems((prevItems) => {
      const updatedItems = [...prevItems, menuItem];
      updateCartTotals(updatedItems);
      localStorage.setItem(
        "cartMenuItems",
        JSON.stringify(
          updatedItems.map((item) => ({
            menuitemId: item.menuitemId,
            name: item.name,
            total: item.total,
            imgLink: item.imgLink,
            inventoryItemIds: item.inventoryItemIds,
            inStock: item.inStock,
            foodItemIds: item.foodItemIds
          }))
        )
      );
      console.log(updatedItems);
      return updatedItems;
    });
  };

  const removeMenuItem = (menuItemIndex) => {
    setMenuItems((prevItems) => {
      const updatedItems = prevItems.filter((_, index) => index !== menuItemIndex);
      localStorage.setItem(
        "cartMenuItems",
        JSON.stringify(
          updatedItems.map((item) => ({
            menuitemId: item.menuitemId,
            name: item.name,
            total: item.total,
            imgLink: item.imgLink,
            inventoryItemIds: item.inventoryItemIds,
            inStock: item.inStock,
          }))
        )
      );
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
    localStorage.removeItem("cartMenuItems");
    localStorage.removeItem("cartTotal");
    localStorage.removeItem("cartTax");
  };

  const completeOrder = async (customerId = 0) => {
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
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
