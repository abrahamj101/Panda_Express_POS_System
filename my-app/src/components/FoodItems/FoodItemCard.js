/**
 * FoodItemCard Component
 * Displays individual food item details with options to increment or decrement the quantity.
 * Supports additional features like premium labeling and conditional rendering for logged-in customers.
 *
 * @file FoodItemCard.js
 * @module components/FoodItemCard
 * @requires react - React library for component creation.
 * @requires LoginContext - Provides login status and role.
 * @requires Nutrition - Component for displaying nutritional information.
 * @requires Cards.css and FoodCard.css - Styles for the food item card layout.
 */

import React, { useContext } from "react";
import "../../styles/FoodandMenu/Cards.css";
import "../../styles/FoodandMenu/FoodCard.css";
import Nutrition from "./Nutrition";
import LoginContext from "../Login/LoginContext";

/**
 * FoodItemCard Component
 *
 * @param {Object} props - Component props.
 * @param {Object} props.foodItem - The food item data object.
 * @param {Function} props.onSelect - Callback to handle incrementing the food item quantity.
 * @param {Function} props.onDeselect - Callback to handle decrementing the food item quantity.
 * @param {number} props.quantity - Current quantity of the food item.
 * @param {boolean} props.disableAdd - Flag to disable the "Add" button when max count is reached.
 *
 * @returns {JSX.Element} A card displaying food item details with controls for quantity adjustment.
 */
const FoodItemCard = ({ foodItem, onSelect, onDeselect, quantity, disableAdd }) => {
  // Access login state and user role from LoginContext
  const { isLoggedIn, role } = useContext(LoginContext);

  return (
    <div className="item-card">
      {/* Conditional rendering for customers: show nutrition info and image */}
      {!isLoggedIn || (isLoggedIn && role === "customer") ? (
        <>
          <div className="card-header">
            {/* Displays nutrition information for the food item */}
            <Nutrition foodItemId={foodItem.fooditem_id} />
          </div>
          {/* Food item image */}
          <img
            src={foodItem.image_link}
            alt={foodItem.fooditem_name}
            className="item-image"
          />
        </>
      ) : (
        <></>
      )}

      {/* Food item name */}
      <p className="name">{foodItem.fooditem_name}</p>

      {/* Display "Premium Entree" label if the food item is marked as premium */}
      {foodItem.premium ? (
        <h3 className="premium">Premium Entree</h3>
      ) : null}

      {/* Controls for selecting and deselecting item quantity */}
      <div className="selection-controls">
        {/* Decrement button: disabled if quantity is 0 */}
        <button onClick={onDeselect} disabled={quantity === 0}>
          -
        </button>

        {/* Displays current quantity */}
        <span>{quantity}</span>

        {/* Increment button: disabled if adding is not allowed */}
        <button onClick={onSelect} disabled={disableAdd}>
          +
        </button>
      </div>
    </div>
  );
};

export default FoodItemCard;
