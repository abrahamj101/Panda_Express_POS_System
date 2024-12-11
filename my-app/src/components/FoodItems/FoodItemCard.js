import React, { useContext } from "react";
import "../../styles/FoodandMenu/Cards.css";
import "../../styles/FoodandMenu/FoodCard.css";
import Nutrition from "./Nutrition";
import LoginContext from "../Login/LoginContext";

/**
 * A card component that displays details about a food item and allows the user to select or deselect it.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.foodItem - The food item data to display.
 * @param {Function} props.onSelect - Function to handle selecting the food item.
 * @param {Function} props.onDeselect - Function to handle deselecting the food item.
 * @param {number} props.quantity - The current quantity of the food item selected.
 * @param {boolean} props.disableAdd - A flag to determine if adding more of the food item is disabled.
 * @returns {JSX.Element} The rendered component.
 */
const FoodItemCard = ({ foodItem, onSelect, onDeselect, quantity, disableAdd }) => {
  // Access the login context to determine if the user is logged in and their role
  const {isLoggedIn, role} = useContext(LoginContext);

  return (
    <div className="item-card">
       {/* Display food item details based on login status */}
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