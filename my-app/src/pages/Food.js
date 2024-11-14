import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import FoodItemGrid from "../components/FoodItems/FoodItemGrid";
import BackButton from "../components/Navigation/BackButton";
import AddToCartButton from "../components/Cart/AddToCartButton";
import "../styles/default.css";

function Food() {
  const location = useLocation();
  const { foodItem_ids, menuItem_id, menuItemObject } = location.state || {};
  const [selectedItems, setSelectedItems] = useState({});

  const handleSelectionChange = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
  };

  const handleAddToCart = () => {
    const selectedIds = Object.entries(selectedItems)
      .flatMap(([id, count]) => Array(count).fill(id));
    console.log("Selected food items for cart:", selectedIds);

    // Example of using menuItemObject
    console.log("Menu Item Details:", menuItemObject.getName(), menuItemObject.getTotal());
  };

  return (
    <div>
      <Header />
      <div className="main-content">
        <BackButton />
        <FoodItemGrid foodItemIds={foodItem_ids} menuItemId={menuItem_id} onSelectionChange={handleSelectionChange} />
        <AddToCartButton onClick={handleAddToCart} />
      </div>
      <Footer />
    </div>
  );
}

export default Food;