import React, { useState } from "react";
import { useZoom } from "../Zoom/ZoomContext";
import "../../styles/Accessibility/AccessibilityButton.css";
import { FaUniversalAccess, FaSearchPlus, FaSearchMinus, FaLanguage } from "react-icons/fa"; // Import the translate icon
import GoogleTranslate from "../Translation/TranslationComponent.js"; // Import the translation component

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
            {/* Zoom Controls */}
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
          {/* Translation Feature */}
          <div className="accessibility-option">
            <button className="zoom-btn">
              <FaLanguage /> Translate
            </button>
            <div id="google_translate_element" style={{ marginTop: "8px" }}>
              <GoogleTranslate />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityButton;
