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
 * @description The CartContext is a React context used to share cart state and related functions across the application.
 * 
 * @type {React.Context}
 */
const CartContext = createContext();
export default CartContext;

/**
 * A provider component that wraps the application and provides cart data and actions to child components.
 * 
 * @component
 * @example
 * <CartContextProvider>
 *   <YourComponent />
 * </CartContextProvider>
 * 
 * @param {Object} props - The component properties.
 * @param {React.ReactNode} props.children - The child components that will have access to the cart context.
 * 
 * @returns {JSX.Element} The rendered CartContext.Provider component.
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
   * Updates the total and tax values based on the provided menu items and stores them in local storage.
   * 
   * @param {MenuItem[]} items - The list of menu items to calculate totals for.
   */
  const updateCartTotals = (items) => {
    const newTotal = items.reduce((acc, item) => acc + item.getTotal(), 0);
    localStorage.setItem("cartTotal", newTotal.toString());
    localStorage.setItem("cartTax", (newTotal * 0.0825).toString());
    setTotal(newTotal);
    setTax(newTotal * 0.0825);
  };

  /**
   * Adds a menu item to the cart and updates the local storage.
   * 
   * @param {MenuItem} menuItem - The menu item to be added.
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
   * Removes a menu item from the cart based on its index and updates the local storage.
   * 
   * @param {number} menuItemIndex - The index of the menu item to be removed.
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
   * Returns an array of menu item IDs from the current cart.
   * 
   * @returns {number[]} An array of menu item IDs.
   */
  const getMenuIds = () => {
    return menuItems.map((item) => item.getMenuItemId());
  };

  /**
   * Empties the cart, resetting the state and removing data from local storage.
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
   * Completes the order and clears the cart. Sends the order data to the server.
   * 
   * @param {number} [customerId=0] - The ID of the customer placing the order (default is 0).
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
   * Toggles the state of the cart (open/close).
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
