import { Link } from "react-router-dom";
import "../../styles/FoodandMenu/Cards.css";
import LoginContext from "../Login/LoginContext";
import { useContext } from "react";

/**
 * A card component for displaying menu items.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.menuItem_name - The name of the menu item.
 * @param {number} props.price - The price of the menu item.
 * @param {string} props.image_link - The URL link to the menu item's image.
 * @param {Array<string>} props.foodItem_ids - The IDs of related food items.
 * @param {string} props.menuItem_id - The unique ID of the menu item.
 * @param {Array<string>} props.inventoryItemIds - The IDs of the inventory items associated with the menu item.
 * @param {boolean} props.inStock - Indicates whether the menu item is in stock.
 * 
 * @returns {JSX.Element} The rendered menu item card.
 */
const MenuItemCard = ({ menuItem_name, price, image_link, foodItem_ids, menuItem_id, inventoryItemIds, inStock }) => {
  // Accessing the login context to determine the user's login status and role
  const {isLoggedIn, role} = useContext(LoginContext);
    
    return (
      <div className="item-card">
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
          {/* Conditional rendering based on login status and role */}
        {!isLoggedIn || isLoggedIn && role === "customer" ? (
            <img src={image_link} alt={menuItem_name} className="item-image" />
          ) : (
            <></> // Empty fragment rendered if the condition is not met
        
          )}
          {/* Displaying the menu item name */}
          <p className="name">{menuItem_name}</p>
          {/* Displaying the price of the menu item */}
          <p>Price: ${price}</p>
        </Link>
      </div>
    );
};

export default MenuItemCard;