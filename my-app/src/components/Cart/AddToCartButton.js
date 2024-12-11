/**
 * AddToCartButton Component
 * A reusable button component that navigates the user to the menu page and 
 * triggers an action (e.g., adding an item to the cart) when clicked.
 *
 * @file AddToCartButton.js
 * @module components/AddToCartButton
 * @requires react
 * @requires react-router-dom
 */

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description A button component that redirects the user to the menu page and triggers a function when clicked.
 * 
 * @component
 * @example
 * <AddToCartButton onClick={() => console.log('Button clicked!')} />
 * 
 * @param {Object} props - The component properties.
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * 
 * @returns {JSX.Element} The rendered button component wrapped in a Link.
 */
const AddToCartButton = ({ onClick }) => {
  return (
    /**
     * Link component ensures navigation to the "/menu" route upon button click.
     * The `textDecoration: 'none'` inline style removes the default link underline styling.
     */
    <Link to="/menu" style={{ textDecoration: 'none' }}>
      {/* Button element triggers the onClick handler and applies CSS class styling */}
      <button onClick={onClick} className="button">
        Add To Cart
      </button>
    </Link>
  );
};

export default AddToCartButton;
