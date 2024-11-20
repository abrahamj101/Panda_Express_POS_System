import React, { useState } from "react";
import { useZoom } from "../Zoom/ZoomContext";
import "../../styles/AccessibilityButton.css";
import { FaUniversalAccess, FaSearchPlus, FaSearchMinus } from "react-icons/fa";

const AccessibilityButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { zoomIn, zoomOut, zoomLevel } = useZoom();

  const toggleAccessibilityMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accessibility-container">
      <button
        className="accessibility-btn"
        onClick={toggleAccessibilityMenu}
        aria-label="Open Accessibility Options"
      >
        <FaUniversalAccess />
      </button>
      {isOpen && (
        <div className="accessibility-menu">
          <h2>
            <b>Accessibility Options</b>
          </h2>
          <div className="accessibility-option">
            <button onClick={zoomIn} className="zoom-btn">
              <FaSearchPlus /> Zoom In
            </button>
            <button onClick={zoomOut} className="zoom-btn">
              <FaSearchMinus /> Zoom Out
            </button>
            <p className="zoom-level">
              Zoom Level: {Math.round(zoomLevel * 100)}%
            </p>
          </div>
          {/* Add more accessibility features here */}
        </div>
      )}
    </div>
  );
};

export default AccessibilityButton;
