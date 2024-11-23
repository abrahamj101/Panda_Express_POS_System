import React from "react";
import "../../styles/FoodandMenu/Cards.css";
import "../../styles/FoodandMenu/FoodCard.css"
import Nutrition from "./Nutrition";

const FoodItemCard = ({ foodItem, onSelect, onDeselect, quantity, disableAdd }) => {
  return (
    <div className="item-card">
      <Nutrition foodItemId={foodItem.fooditem_id}/>
      <img src={foodItem.image_link} alt={foodItem.fooditem_name} className="item-image" />
      <h3>{foodItem.fooditem_name}</h3>
      {foodItem.premium ? <h3 className="premium">Premium Entree</h3> : null}
      <div className="selection-controls">
        <button onClick={onDeselect} disabled={quantity === 0}>-</button>
        <span>{quantity}</span>
        <button onClick={onSelect} disabled={disableAdd}>+</button>
      </div>
    </div>
  );
};

export default FoodItemCard;
