import React, { Fragment, useState, useEffect } from 'react';
import MenuItemCard from './MenuItemCard';
import getMenuItems from '../../pages/api/menuItems/getMenuitem'
import "../../styles/Grid.css"

function MenuItemGrid() {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from the database using the generalized function
  const fetchMenuItems = async () => {
    try {
      const items = await getMenuItems();
      setMenuItems(items);
    } catch (err) {
      console.error('Error fetching menu items:', err);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <Fragment>
      <div className='item-grid'>
        {menuItems.length > 0 ? (
          menuItems.map((menuItem) => (
            <MenuItemCard
              key={menuItem.menuitem_id}
              menuItem_name={menuItem.menuitem_name}
              price={menuItem.price}
              image_link={menuItem.image_link}
              foodItem_ids={menuItem.fooditem_ids}
            />
          ))
        ) : (
          <p>Loading menu items...</p>
        )}
      </div>
    </Fragment>
  );
}

export default MenuItemGrid;
