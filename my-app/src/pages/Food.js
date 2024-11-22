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

function Food() {
  const { zoomLevel } = useZoom();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
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
    console.log(restriction_ids);
    
    if (Object.keys(restriction_ids).length > 0) {
      console.log("Setting modal data and showing modal");
      setModalData(() => restriction_ids);
      setShowModal(() => true);
    } else {
      console.log("No restrictions found. Adding menu item to cart.");
      addMenuItem(menuItemObject);
    }
  };
  

  const handleConfirm = () => {
    addMenuItem(menuItemObject);
    setShowModal(false);
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
        <FoodRestriction
        isOpen={showModal}
        restrictions={modalData}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
      </div>
      <Footer />
    </div>
  );
}

export default Food;
