import React, { useContext } from "react";
import "../../styles/FoodandMenu/Cards.css";
import "../../styles/FoodandMenu/FoodCard.css";
import Nutrition from "./Nutrition";
import LoginContext from "../Login/LoginContext";

const FoodItemCard = ({ foodItem, onSelect, onDeselect, quantity, disableAdd }) => {
  const {isLoggedIn, role} = useContext(LoginContext);

  return (
    <div className="item-card">
      
      {!isLoggedIn || isLoggedIn && role === "customer" ? (
        <>
          <div className="card-header">
          <Nutrition foodItemId={foodItem.fooditem_id} />
          </div>
          <img src={foodItem.image_link} alt={foodItem.fooditem_name} className="item-image" />
        </>
      ) : (
        <></>
      )}
      
      <p className="name">{foodItem.fooditem_name}</p>
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