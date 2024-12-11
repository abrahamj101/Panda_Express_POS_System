import "../../styles/FoodandMenu/FoodRestriction.css";
import React, { useState } from "react";

/**
 * A modal component that displays a list of food items with restrictions and provides options to confirm or cancel.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.restrictionMap - An object mapping food items to their respective restrictions.
 * @param {Function} props.onConfirm - Callback function to be called when the user confirms the restrictions.
 * @param {Function} props.onCancel - Callback function to be called when the user cancels the action.
 * @returns {JSX.Element|null} The rendered modal component or null if `restrictionMap` is empty or undefined.
 */
function FoodRestrictions({ restrictionMap, onConfirm, onCancel }) {
  // Render nothing if the restrictionMap is not provided or is empty
  if (!restrictionMap || Object.keys(restrictionMap).length === 0) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Food Restrictions</h2>
        <p>
          The following food items have restrictions. Please confirm to proceed.
        </p>
        <ul>
          {Object.entries(restrictionMap).map(([foodItem, restriction], index) => (
            <li key={index}>
              <strong>{foodItem}:</strong> {restriction}
            </li>
          ))}
        </ul>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodRestrictions;

