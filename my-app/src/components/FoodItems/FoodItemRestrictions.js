import "../../styles/FoodandMenu/FoodRestriction.css";
import React, { useState } from "react";

function FoodRestrictions({ restrictionMap, onConfirm, onCancel }) {
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

