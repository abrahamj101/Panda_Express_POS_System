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
 * AddToCartButton Component
 *
 * @param {Object} props - React component props.
 * @param {function} props.onClick - Callback function to handle the "Add to Cart" action when the button is clicked.
 * @returns {JSX.Element} A styled button wrapped in a Link component for navigation.
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
