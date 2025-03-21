import React from "react"; // Import the React library for creating React components
import "my-app/src/styles/Pages/Form.css"; // Import the CSS file for styling the Form component

/**
 * Form Component
 * This component renders a modal-like overlay with a content area.
 * It can be used to display forms, dialogs, or custom children content.
 * 
 * Props:
 * - children: React nodes to be displayed within the modal content.
 * - onClose: Function to handle closing the modal when the close button is clicked.
 * 
 * @description A component that renders a modal form with a close button and content.
 * 
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {Function} props.onClose - The function to be called when the close button is clicked.
 * @returns {JSX.Element} The rendered modal form.

 */
function Form({ children, onClose }) {
  return (
    // Overlay that covers the entire screen
    <div className="modal-overlay">
      {/* Content container for the modal */}
      <div className="modal-content">
        {/* Close button to trigger the onClose function */}
        <button className="modal-close" onClick={onClose}>
          &times; {/* Renders the 'X' symbol for closing the modal */}
        </button>
        {/* Render any child components or content passed to this Form */}
        {children}
      </div>
    </div>
  );
}

export default Form; // Export the Form component for use in other parts of the app
