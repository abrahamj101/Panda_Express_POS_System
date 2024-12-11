/**
 * MenuItem component that displays details of a specific menu item and its related food items.
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.menuItems - Array of menu item objects.
 * @param {number} props.menuItemId - The ID of the specific menu item to display.
 * @param {Array} props.foodItems - Array of food item objects.
 * @param {Array} props.foodItemIds - Array of IDs of food items related to the menu item.
 * @returns {JSX.Element} The rendered MenuItem component or a message if no menu item is found.
 */
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
  