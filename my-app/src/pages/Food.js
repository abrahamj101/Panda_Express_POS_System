import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import FoodItemGrid from "../components/FoodItems/FoodItemGrid";
import BackButton from "../components/Navigation/BackButton";
import AddToCartButton from "../components/Cart/AddToCartButton";
import "../styles/default.css";
import MenuItem from "../components/MenuItems/MenuItemClass";

function Food() {
  const location = useLocation();
  const { foodItem_ids, menuItem_id, menuItem_name } = location.state || {};
  const [selectedItems, setSelectedItems] = useState({});

  const menuItemObject = new MenuItem(menuItem_id, menuItem_name);

  const handleSelectionChange = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
  };

  const handleAddToCart = () => {
    const selectedIds = Object.entries(selectedItems)
      .flatMap(([id, count]) => Array(count).fill(id));
    console.log("Selected food items for cart:", selectedIds);

    console.log("Menu Item Details:", menuItemObject.getName(), menuItemObject.getTotal());
  };

  // This function will add the food item to the menuItemObject when an item is selected
  const addFoodItemToMenu = (foodItemId) => {    
    menuItemObject.addFoodItem(foodItemId);
    console.log(menuItemObject);
  };

  const removeFoodItemFromMenu = (foodItemId) => {
    menuItemObject.removeFoodItem(foodItemId);
    console.log(menuItemObject);
  }

  return (
    <div>
      <Header />
      <div className="main-content">
        <BackButton />
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
