import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import FoodItemGrid from "../components/FoodItems/FoodItemGrid";
import BackButton from "../components/Navigation/BackButton";
import AddToCartButton from "../components/Cart/AddToCartButton";
import "../styles/default.css";
import MenuItem from "../components/MenuItems/MenuItemClass";
import CartContext from "../components/Cart/CartContext";
import { useZoom } from "../components/Zoom/ZoomContext";

function Food() {
  const { zoomLevel } = useZoom();
  const location = useLocation();
  const {
    foodItem_ids,
    menuItem_id,
    menuItem_name,
    price,
    image_link,
    inventoryItemIds,
    inStock,
  } = location.state || {};
  const [selectedItems, setSelectedItems] = useState({});
  const menuItemObject = new MenuItem(
    menuItem_id,
    menuItem_name,
    Number(price),
    image_link,
    inventoryItemIds,
    inStock
  );
  const { addMenuItem } = useContext(CartContext);
  const handleSelectionChange = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
  };

  const handleAddToCart = () => {
    addMenuItem(menuItemObject);
  };

  const addFoodItemToMenu = (foodItemId) => {
    menuItemObject.addFoodItem(foodItemId);
  };

  const removeFoodItemFromMenu = (foodItemId) => {
    menuItemObject.removeFoodItem(foodItemId);
  };

  return (
    <div
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <div className="main-content">
        <BackButton location="/menu" />
        <FoodItemGrid
          foodItemIds={foodItem_ids}
          menuItemId={menuItem_id}
          onSelectionChange={handleSelectionChange}
          onAddFoodItem={addFoodItemToMenu}
          onRemoveFoodItem={removeFoodItemFromMenu}
        />
        <AddToCartButton onClick={handleAddToCart} />
      </div>
      <Footer />
    </div>
  );
}

export default Food;
