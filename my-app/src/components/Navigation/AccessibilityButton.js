import React, { useState } from "react";
import { useZoom } from "../Zoom/ZoomContext"; // Custom hook to manage zoom functionality
import "../../styles/Accessibility/AccessibilityButton.css"; // Styles specific to the accessibility button
import { 
  FaUniversalAccess, 
  FaSearchPlus, 
  FaSearchMinus, 
  FaLanguage, 
  FaAdjust 
} from "react-icons/fa"; // FontAwesome icons for the accessibility options
import GoogleTranslate from "../Translation/TranslationComponent.js"; // Import Google Translate component
import TTSButton from "../TextToSpeech/TextToSpeechComponent.js"; // Import Text-to-Speech (TTS) button component
import "../../styles/HighContrast/HighContrast.css"; // Styles for high-contrast mode

/**
 * @description AccessibilityButton component provides users with options to adjust accessibility settings, such as zoom, text-to-speech, translation, and high contrast mode.
 * @component
 * @returns {JSX.Element} The rendered accessibility button and menu with options.
 */
  const AccessibilityButton = () => {
  /**
   * State to manage if the accessibility menu is open or closed
   * @type {Array.<boolean, Function>}
   */
  const [isOpen, setIsOpen] = useState(false); // State to manage visibility of the accessibility menu

  /**
   * Custom hook for zoom functionality
   * @type {{ zoomIn: Function, zoomOut: Function, zoomLevel: number }}
   */
  const { zoomIn, zoomOut, zoomLevel } = useZoom(); // Destructuring zoom-related functionality from the useZoom hook

  /**
   * State to manage if high contrast mode is enabled or not
   * @type {Array.<boolean, Function>}
   */
  const [isHighContrast, setIsHighContrast] = useState(false); // State to track high-contrast mode status

    /**
   * Toggles the state of the accessibility menu.
   * @function
   */
  const toggleAccessibilityMenu = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Toggles high contrast mode on or off and applies or removes the 'high-contrast' class to the document body.
   * @function
   */
  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    // Add or remove the "high-contrast" class on the body element
    document.body.classList.toggle("high-contrast", !isHighContrast);
  };

  return (
    <div className="accessibility-container">
      {/* Button to open/close the accessibility menu */}
      <button
        className="accessibility-btn"
        onClick={toggleAccessibilityMenu}
        aria-label="Open Accessibility Options" // Accessible label for screen readers
      >
        <FaUniversalAccess /> {/* Icon for accessibility */}
      </button>

      {/* Conditional rendering: Show the menu when isOpen is true */}
      {isOpen && (
        <div className="accessibility-menu">
          <h2>
            <b>Accessibility Options</b> {/* Header for the accessibility menu */}
          </h2>

          {/* Zoom In/Out Options */}
          <div className="accessibility-option">
            <button onClick={zoomIn} className="zoom-btn">
              <FaSearchPlus /> Zoom In {/* Button to increase zoom level */}
            </button>
            <button onClick={zoomOut} className="zoom-btn">
              <FaSearchMinus /> Zoom Out {/* Button to decrease zoom level */}
            </button>
            {/* Display current zoom level rounded to the nearest whole percentage */}
            <p className="zoom-level">
              Zoom Level: {Math.round(zoomLevel * 100)}%
            </p>
          </div>

          {/* Text-to-Speech (TTS) Option */}
          <div className="accessibility-option">
            <TTSButton
              className="zoom-btn"
              ttsEnabled={false} // Initial state for TTS button
              onToggle={(enabled) => 
                console.log(`TTS is now ${enabled ? 'enabled' : 'disabled'}`)
              } // Callback function to log TTS state
            />
          </div>

          {/* Translation Option */}
          <div className="accessibility-option">
            <button className="zoom-btn">
              <FaLanguage /> Translate {/* Button to initiate translation */}
            </button>
            {/* Google Translate component */}
            <div id="google_translate_element" style={{ marginTop: "8px" }}>
              <GoogleTranslate />
            </div>
          </div>

          {/* High-Contrast Mode Option */}
          <div className="accessibility-option">
            <button onClick={toggleHighContrast} className="zoom-btn">
              <FaAdjust /> {/* Icon for contrast adjustment */}
              {isHighContrast ? "Disable High Contrast" : "Enable High Contrast"} 
              {/* Toggle button text based on current high-contrast state */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityButton; // Export the component for use in other parts of the application
