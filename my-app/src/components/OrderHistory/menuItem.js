const MenuItem = ({ menuItems, menuItemId, foodItems, foodItemIds }) => {
    const menuItem = menuItems?.find((item) => item.menuitem_id === menuItemId);
    const relatedFoodItems = foodItems?.filter((item) =>
        foodItemIds?.includes(item.fooditem_id)
    );
  
    if (!menuItem) {
        return <div>No menu item found.</div>;
    }
  
    return (
        <div className="menu-item">
            <img src={menuItem.image_link || "/placeholder.jpg"} alt={menuItem.menuitem_name || "Menu Item"} />
            <div>
                <h4>{menuItem.menuitem_name || "Unknown Menu Item"}</h4>
                <p>Price: ${menuItem.price || "N/A"}</p>
                <div>
                    <h5>Food Items:</h5>
                    <ul>
                        {relatedFoodItems?.length > 0 ? (
                            relatedFoodItems.map((foodItem) => (
                                <li key={foodItem.fooditem_id}>
                                    {foodItem.fooditem_name} ({foodItem.type || "N/A"})
                                </li>
                            ))
                        ) : (
                            <li>Loading Food Items...</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
  };
  
  export default MenuItem;
  