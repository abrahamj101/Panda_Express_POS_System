/**
 * MenuItemCard Component
 * Displays a card for a menu item with its image, name, and price.
 * Links to the food details page with menu item data passed as state.
 * Conditional rendering of the image is based on user login status and role.
 *
 * @file MenuItemCard.js
 * @module components/MenuItemCard
 * @requires react-router-dom - Provides Link for navigation.
 * @requires LoginContext - Accesses user login status and role.
 * @requires Cards.css - Styles for the menu item card layout.
 */

import { Link } from "react-router-dom";
import "../../styles/FoodandMenu/Cards.css";
import LoginContext from "../Login/LoginContext";
import { useContext } from "react";

/**
 * MenuItemCard Component
 *
 * @param {Object} props - Component props.
 * @param {string} props.menuItem_name - The name of the menu item.
 * @param {number} props.price - The price of the menu item.
 * @param {string} props.image_link - URL of the menu item's image.
 * @param {Array<number>} props.foodItem_ids - IDs of related food items.
 * @param {number} props.menuItem_id - Unique ID of the menu item.
 * @param {Array<number>} props.inventoryItemIds - IDs of related inventory items.
 * @param {boolean} props.inStock - Availability status of the menu item.
 *
 * @returns {JSX.Element} A clickable card displaying menu item details.
 */
const MenuItemCard = ({
  menuItem_name,
  price,
  image_link,
  foodItem_ids,
  menuItem_id,
  inventoryItemIds,
  inStock,
}) => {
  // Access login state and role from LoginContext
  const { isLoggedIn, role } = useContext(LoginContext);

  return (
    <div className="item-card">
      {/* Link to the food details page; passes menu item data as state */}
      <Link
        to="/food"
        state={{
          foodItem_ids,
          menuItem_id,
          menuItem_name,
          price,
          image_link,
          inventoryItemIds,
          inStock,
        }}
      >
        {/* Conditional rendering: Show the image only if the user is a customer or not logged in */}
        {!isLoggedIn || (isLoggedIn && role === "customer") ? (
          <img src={image_link} alt={menuItem_name} className="item-image" />
        ) : null}

        {/* Menu item name */}
        <p className="name">{menuItem_name}</p>

        {/* Menu item price */}
        <p>Price: ${price}</p>
      </Link>
    </div>
  );
};

export default MenuItemCard;
