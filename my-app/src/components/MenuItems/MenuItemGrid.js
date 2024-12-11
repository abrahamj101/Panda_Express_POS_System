import React, { Fragment, useState, useEffect } from 'react';
import MenuItemCard from './MenuItemCard';
import getMenuItems from '../../pages/api/menuItems/getMenuitem'
import "../../styles/FoodandMenu/Grid.css"

/**
 * A component that renders a grid of menu items.
 * @function MenuItemGrid
 * @returns {JSX.Element} The MenuItemGrid component.
 */
function MenuItemGrid() {
  /**
   * State variable for storing menu items
   * @type {Array<Object>}
   */
  const [menuItems, setMenuItems] = useState([]);

  /**
   * Fetches menu items from the API and updates the state.
   * @async
   * @function fetchMenuItems
   * @returns {Promise<void>}
   */
  const fetchMenuItems = async () => {
    try {
      /**
       * The fetched menu items
       * @type {Array<Object>}
       */
      const items = await getMenuItems();

      setMenuItems(items);
    } catch (err) {
      console.error('Error fetching menu items:', err);
    }
  };

  // Fetches menu items when the component mounts.
  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <Fragment>
      <div className='item-grid'>
        {
          menuItems.map((menuItem) => (
            <MenuItemCard
              key={menuItem.menuitem_id}
              menuItem_name={menuItem.menuitem_name}
              price={menuItem.price}
              image_link={menuItem.image_link}
              foodItem_ids={menuItem.fooditem_ids}
              menuItem_id={menuItem.menuitem_id}
              inventoryItemIds={menuItem.inventoryitem_ids}
              inStock={menuItem.in_stock}
            />
          ))
        }
      </div>
    </Fragment>
  );
}

export default MenuItemGrid;