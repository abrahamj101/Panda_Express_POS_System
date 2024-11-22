import React from "react";
import "../../styles/FoodandMenu/FoodRestriction.css";

const FoodRestriction = ({ isOpen, restrictions, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Food Item Restrictions</h2>
        <ul>
          {Object.entries(restrictions).map(([foodName, restriction], index) => (
            <li key={index}>
              <strong>{foodName}:</strong> {restriction}
            </li>
          ))}
        </ul>
        <div className="modal-actions">
          <button onClick={onClose} className="close-button">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-button">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodRestriction;

