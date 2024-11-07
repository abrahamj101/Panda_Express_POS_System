import React, { Fragment, useState, useEffect } from "react";
import MenuItemCard from "./MenuItemCard";

function MenuItemGrid() {
  const [menuItems, setMenuItems] = useState([]);

  const getMenuItems = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/menuItems");
      const jsonData = await response.json();
      setMenuItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  console.log(menuItems);
  return (
    <Fragment>
      <div>
        {menuItems.map((menuItem) => {
          return (
            <MenuItemCard 
              key={menuItem.menuItem_id}
              menuItem_name={menuItem.menuitem_name}
              price={menuItem.price}
              image_link={menuItem.image_link}
            />
          );
        })}
      </div>
    </Fragment>
  );
}

export default MenuItemGrid;
