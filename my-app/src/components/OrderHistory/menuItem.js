const MenuItem = ({ menuItems, menuItemId, foodItems, foodItemIds }) => {
    const menuItem = menuItems.find((item) => item.menuitem_id === menuItemId);
    const relatedFoodItems = foodItems.filter((item) =>
      foodItemIds.includes(item.fooditem_id)
    );
  
    return (
      <div className="menu-item">
        <img src={menuItem.image_link} alt={menuItem.menuitem_name} />
        <div>
          <h4>{menuItem.menuitem_name}</h4>
          <p>Price: ${menuItem.price}</p>
          <div>
            <h5>Food Items:</h5>
            <ul>
              {relatedFoodItems.map((foodItem) => (
                <li key={foodItem.fooditem_id}>
                  {foodItem.fooditem_name} ({foodItem.type})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default MenuItem;
  