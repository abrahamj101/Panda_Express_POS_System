/**
 * Food Component
 * This page displays food items associated with a specific menu item. 
 * Users can select food items, add them to a menu item, and add the menu item to their cart. 
 * The component supports role-based restrictions and zoom accessibility features.
 *
 * @file Food.js
 * @module pages/Food
 * @requires react
 * @requires react-router-dom
 * @requires ../components/Navigation/Header
 * @requires ../components/Navigation/Footer
 * @requires ../components/FoodItems/FoodItemGrid
 * @requires ../components/Navigation/BackButton
 * @requires ../components/Cart/AddToCartButton
 * @requires ../components/MenuItems/MenuItemClass
 * @requires ../components/Cart/CartContext
 * @requires ../components/Zoom/ZoomContext
 * @requires ../components/Login/LoginContext
 * @requires ../components/Cart/CartSideBar
 * @requires ../styles/Pages/default.css
 */

import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import FoodItemGrid from "../components/FoodItems/FoodItemGrid";
import BackButton from "../components/Navigation/BackButton";
import AddToCartButton from "../components/Cart/AddToCartButton";
import "../styles/Pages/default.css";
import MenuItem from "../components/MenuItems/MenuItemClass";
import CartContext from "../components/Cart/CartContext";
import { useZoom } from "../components/Zoom/ZoomContext";
import LoginContext from "../components/Login/LoginContext";
import CartSidebar from "../components/Cart/CartSideBar";

/**
 * Food Component
 *
 * @returns {JSX.Element} A page that displays food items for a specific menu item 
 * and allows users to manage their cart and food selections.
 */
function Food() {
  const { zoomLevel } = useZoom(); // Zoom level for accessibility
  const location = useLocation();
  const { role, isLoggedIn } = useContext(LoginContext);
  const { addMenuItem } = useContext(CartContext);

  /**
   * Destructured menu item data passed via route state.
   * @type {Object}
   */
  const {
    foodItem_ids,
    menuItem_id,
    menuItem_name,
    price,
    image_link,
    inventoryItemIds,
    inStock,
  } = location.state || {};

  /**
   * State to track selected food items.
   * @type {Object}
   */
  const [selectedItems, setSelectedItems] = useState({});

  // Create a MenuItem object
  const menuItemObject = new MenuItem(
    menuItem_id,
    menuItem_name,
    Number(price),
    image_link,
    inventoryItemIds,
    inStock
  );

  /**
   * Handles changes in food item selection.
   *
   * @param {Object} newSelectedItems - Updated selection of food items.
   */
  const handleSelectionChange = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
  };

  /**
   * Handles adding the menu item to the cart.
   * Checks for restrictions and displays an alert if restrictions apply.
   *
   * @async
   */
  const handleAddToCart = async () => {
    const restriction_ids = await menuItemObject.checkRestriction();
    if ((role === "customer" || !isLoggedIn) && Object.keys(restriction_ids).length > 0) {
      const messages = Object.entries(restriction_ids).map(
        ([foodItemName, restriction]) => `${foodItemName}: ${restriction}`
      );
      const alertMessage = `Some restrictions apply to the following items:\n\n${messages.join("\n")}`;
      alert(alertMessage);
    }
    addMenuItem(menuItemObject);
  };

  /**
   * Adds a food item to the menu item.
   *
   * @param {number} foodItemId - The ID of the food item to add.
   */
  const addFoodItemToMenu = (foodItemId) => {
    menuItemObject.addFoodItem(foodItemId);
  };

  /**
   * Removes a food item from the menu item.
   *
   * @param {number} foodItemId - The ID of the food item to remove.
   */
  const removeFoodItemFromMenu = (foodItemId) => {
    menuItemObject.removeFoodItem(foodItemId);
  };

  return (
    <div
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Page header */}
      <Header />
      <div className="main-content">
        {/* Back button */}
        <BackButton location="/menu" />

        {/* Grid of food items */}
        <FoodItemGrid
          foodItemIds={foodItem_ids}
          menuItemId={menuItem_id}
          onSelectionChange={handleSelectionChange}
          onAddFoodItem={addFoodItemToMenu}
          onRemoveFoodItem={removeFoodItemFromMenu}
        />

        {/* Add to Cart button */}
        <AddToCartButton onClick={handleAddToCart} />

        {/* Sidebar for cart (visible for logged-in managers/admins) */}
        {isLoggedIn && role !== "customer" ? <CartSidebar /> : null}
      </div>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default Food;
