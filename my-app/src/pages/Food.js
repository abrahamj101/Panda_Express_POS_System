import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import FoodItemGrid from "../components/FoodItems/FoodItemGrid";
import BackButton from "../components/Navigation/BackButton";
import AddToCartButton from "../components/Cart/AddToCartButton";
import "../styles/default.css"

function Food() {
  const location = useLocation();
  const { foodItem_ids } = location.state || {};
  console.log(foodItem_ids)
  return (
    <div>
        <Header />
        <div className="main-content">
          <BackButton />
          <FoodItemGrid foodItemIds={foodItem_ids} />
          <AddToCartButton />
        </div>
        <Footer />
    </div>
  );
}

export default Food;
