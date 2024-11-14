import React from "react";
import "../../styles/Cards.css";
import "../../styles/FoodCard.css"

const FoodItemCard = ({ foodItem, onSelect, onDeselect, selectedCount, totalSelectedCount, menuItem_id }) => {
  const { fooditem_name, image_link, premium, type } = foodItem;
  let maxCount;
  if (type === "Side") {
    maxCount = 2
  } else if (type == "Entree") {
    // if ()
    maxCount = 2
  } else if (type == "Appetizer") {
    maxCount = 1
  } else if (type == "Dessert") {
    maxCount = 1
  } else if (type == "Drinks") {
    maxCount = 1
  }
  
  return (
    <div className="item-card">
      <img src={image_link} alt={fooditem_name} className="item-image" />
      <h3>{fooditem_name}</h3>
      {premium ? <h3 className="premium">Premium Entree</h3> : null}
      
      <div className="selection-controls">
        <button onClick={onDeselect} disabled={selectedCount === 0}>-</button>
        <span>{selectedCount}</span>
        <button onClick={onSelect} disabled={selectedCount === maxCount || totalSelectedCount === 5}>+</button>
      </div>
    </div>
  );
};

export default FoodItemCard;