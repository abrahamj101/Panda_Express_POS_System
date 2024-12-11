/**
 * CartContext Module
 * Manages cart state, operations, and persistence for the application.
 *
 * @file CartContext.js
 * @module context/CartContext
 * @requires react
 * @requires MenuItem - Custom class for menu items.
 * @requires addOrders - API function to handle order submission.
 */

import React, { createContext, useState, useEffect } from "react";
import addOrders from "../../pages/api/orders/addOrders";
import MenuItem from "../MenuItems/MenuItemClass";

/**
 * CartContext
 * Context object for managing cart-related state and functions.
 */
const CartContext = createContext();
export default CartContext;

/**
 * CartContextProvider
 * Provides cart state and methods to children components via React Context API.
 *
 * @param {Object} props - React component props.
 * @param {React.ReactNode} props.children - Child components wrapped by the provider.
 * @returns {JSX.Element} Cart context provider wrapping the children.
 */
export const CartContextProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]); // List of menu items in the cart
  const [total, setTotal] = useState(0); // Total cart value
  const [tax, setTax] = useState(0); // Tax on the total cart value
  const [isCartOpen, setIsCartOpen] = useState(false); // Tracks cart visibility

  /**
   * useEffect Hook - Initializes cart state from localStorage on component mount.
   * Reconstructs MenuItem objects from serialized data stored in localStorage.
   */
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

  /**
   * updateCartTotals - Updates cart total and tax based on current cart items.
   *
   * @param {Array} items - Array of MenuItem objects.
   */
  const updateCartTotals = (items) => {
    const newTotal = items.reduce((acc, item) => acc + item.getTotal(), 0);
    localStorage.setItem("cartTotal", newTotal.toString());
    localStorage.setItem("cartTax", (newTotal * 0.0825).toString());
    setTotal(newTotal);
    setTax(newTotal * 0.0825);
  };

  /**
   * addMenuItem - Adds a new menu item to the cart and updates localStorage.
   *
   * @param {MenuItem} menuItem - The menu item to add to the cart.
   */
  const addMenuItem = (menuItem) => {
    console.log(menuItem);
    setMenuItems((prevItems) => {
      const updatedItems = [...prevItems, menuItem];
      updateCartTotals(updatedItems);

      // Serialize cart data for localStorage
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
            foodItemIds: item.foodItemIds,
          }))
        )
      );
      console.log(updatedItems);
      return updatedItems;
    });
  };

  /**
   * removeMenuItem - Removes a menu item from the cart by its index.
   *
   * @param {number} menuItemIndex - Index of the menu item to remove.
   */
  const removeMenuItem = (menuItemIndex) => {
    setMenuItems((prevItems) => {
      const updatedItems = prevItems.filter((_, index) => index !== menuItemIndex);

      // Update localStorage and totals after removal
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

  /**
   * getMenuIds - Returns an array of menu item IDs currently in the cart.
   *
   * @returns {Array<string>} List of menu item IDs.
   */
  const getMenuIds = () => {
    return menuItems.map((item) => item.getMenuItemId());
  };

  /**
   * emptyCart - Clears all items from the cart and resets localStorage.
   */
  const emptyCart = () => {
    setMenuItems([]);
    setTotal(0);
    setTax(0);
    localStorage.removeItem("cartMenuItems");
    localStorage.removeItem("cartTotal");
    localStorage.removeItem("cartTax");
  };

  /**
   * completeOrder - Finalizes the order by calling an API and resetting the cart.
   *
   * @param {number} [customerId=0] - ID of the customer placing the order.
   * @async
   */
  const completeOrder = async (customerId = 0) => {
    if (menuItems.length > 0) {
      try {
        await addOrders(customerId, menuItems, total, tax);
        console.log("Altering inventory");
        // Placeholder for inventory alteration logic
        console.log("finished altering");
        emptyCart();
      } catch (error) {
        console.error("Failed to complete order:", error.message);
      }
    }
  };

  /**
   * toggleCart - Toggles the visibility of the cart.
   */
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  /**
   * Provides cart state and operations to child components via Context API.
   */
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
