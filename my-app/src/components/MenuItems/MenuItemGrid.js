/**
 * MenuItemGrid Component
 * Fetches and displays a grid of menu items using the MenuItemCard component.
 *
 * @file MenuItemGrid.js
 * @module components/MenuItemGrid
 * @requires react - React library for building components.
 * @requires MenuItemCard - Component to display individual menu item details.
 * @requires getMenuItems - API function to fetch the list of menu items.
 * @requires Grid.css - Styles for the grid layout.
 */

import React, { Fragment, useState, useEffect } from 'react';
import MenuItemCard from './MenuItemCard';
import getMenuItems from '../../pages/api/menuItems/getMenuitem';
import "../../styles/FoodandMenu/Grid.css";

/**
 * MenuItemGrid Component
 * 
 * @returns {JSX.Element} A grid layout displaying menu items fetched from an API.
 */
function MenuItemGrid() {
  // State to store the list of menu items
  const [menuItems, setMenuItems] = useState([]);

  /**
   * fetchMenuItems - Fetches the list of menu items from the API.
   * Updates the menuItems state with the fetched data.
   */
  const fetchMenuItems = async () => {
    try {
      const items = await getMenuItems(); // API call to fetch menu items
      setMenuItems(items); // Update state with the fetched menu items
    } catch (err) {
      console.error('Error fetching menu items:', err);
    }
  };

  /**
   * useEffect - Fetches menu items when the component mounts.
   * Executes fetchMenuItems once when the component is rendered.
   */
  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <Fragment>
      {/* Container for displaying menu items in a grid layout */}
      <div className='item-grid'>
        {
          /* Map through the fetched menu items and render a MenuItemCard for each */
          menuItems.map((menuItem) => (
            <MenuItemCard
              key={menuItem.menuitem_id} // Unique key for each menu item
              menuItem_name={menuItem.menuitem_name} // Name of the menu item
              price={menuItem.price} // Price of the menu item
              image_link={menuItem.image_link} // Image link for the menu item
              foodItem_ids={menuItem.fooditem_ids} // Associated food item IDs
              menuItem_id={menuItem.menuitem_id} // Unique menu item ID
              inventoryItemIds={menuItem.inventoryitem_ids} // Inventory item IDs
              inStock={menuItem.in_stock} // Availability status
            />
          ))
        }
      </div>
    </Fragment>
  );
}

export default MenuItemGrid;
