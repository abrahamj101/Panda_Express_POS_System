import React from "react";
import "../../styles/Cards.css";
import "../../styles/FoodCard.css"

const FoodItemCard = ({ foodItem, onSelect, onDeselect, selectedCount }) => {
  const { fooditem_name, image_link, premium } = foodItem;
  
  return (
    <div className="item-card">
      <img src={image_link} alt={fooditem_name} className="item-image" />
      <h3>{fooditem_name}</h3>
      {premium ? <h3 className="premium">Premium Entree</h3> : null}
      
      <div className="selection-controls">
        <button onClick={onDeselect} disabled={selectedCount === 0}>-</button>
        <span>{selectedCount}</span>
        <button onClick={onSelect} disabled={selectedCount === 3}>+</button>
      </div>
    </div>
  );
};

export default FoodItemCard;
