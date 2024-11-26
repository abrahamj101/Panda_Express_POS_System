import React, { useState, useContext, useEffect } from "react";
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
import FoodRestriction from "../components/FoodItems/FoodItemRestrictions";
import Favorites from "../components/FoodItems/Favorites";

function Food() {
  const { zoomLevel } = useZoom();
  const location = useLocation();
  const isLoggedIn = true;


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

  



  const handleAddToCart = async () => {
    const restriction_ids = await menuItemObject.checkRestriction();
    if (Object.keys(restriction_ids).length > 0) {
      const messages = Object.entries(restriction_ids).map(
          ([foodItemName, restriction]) => `${foodItemName}: ${restriction}`
      );
      const alertMessage = `Some restrictions apply to the following items:\n\n${messages.join("\n")}`;

      alert(alertMessage);
    }
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
        {isLoggedIn ? (
                <>
                <Favorites />
                </>
                ) :(
                <>
                </>
              )}
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
