import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import FoodItemGrid from "../components/FoodItems/FoodItemGrid";
import BackButton from "../components/Navigation/BackButton";
import "../styles/default.css"

function Food() {
  const location = useLocation();
  const { foodItem_ids } = location.state || {};
  console.log(foodItem_ids)
  return (
    <div>
        <Header />
        <BackButton />
        <FoodItemGrid foodItemIds={foodItem_ids} />
        <Footer />
    </div>
  );
}

export default Food;
