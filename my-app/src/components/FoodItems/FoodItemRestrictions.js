/**
 * FoodRestrictions Component
 * Displays a modal listing food items that have restrictions (e.g., allergens, dietary limitations).
 * Provides options to confirm or cancel the selection.
 *
 * @file FoodRestrictions.js
 * @module components/FoodRestrictions
 * @requires FoodRestriction.css - Styles for the modal layout.
 * @requires react - React library for building components.
 */

import "../../styles/FoodandMenu/FoodRestriction.css";
import React from "react";

/**
 * FoodRestrictions Component
 *
 * @param {Object} props - Component props.
 * @param {Object} props.restrictionMap - A mapping of food item names to their restrictions.
 * @param {Function} props.onConfirm - Callback function for confirming the restrictions and proceeding.
 * @param {Function} props.onCancel - Callback function for canceling and closing the modal.
 *
 * @returns {JSX.Element|null} A modal overlay displaying food restrictions or null if no restrictions are provided.
 */
function FoodRestrictions({ restrictionMap, onConfirm, onCancel }) {
  // Return null if the restrictionMap is empty or undefined
  if (!restrictionMap || Object.keys(restrictionMap).length === 0) return null;

  return (
    /**
     * Modal overlay that blocks user interaction with the background.
     */
    <div className="modal-overlay">
      <div className="modal">
        {/* Modal title */}
        <h2>Food Restrictions</h2>

        {/* Brief explanation of the purpose of this modal */}
        <p>
          The following food items have restrictions. Please confirm to proceed.
        </p>

        {/* List food items and their corresponding restrictions */}
        <ul>
          {Object.entries(restrictionMap).map(([foodItem, restriction], index) => (
            <li key={index}>
              <strong>{foodItem}:</strong> {restriction}
            </li>
          ))}
        </ul>

        {/* Buttons to confirm or cancel */}
        <div className="modal-buttons">
          {/* Cancel button - Calls onCancel callback */}
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>

          {/* Confirm button - Calls onConfirm callback */}
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodRestrictions;
