import React, { Fragment, useState, useEffect, useContext } from "react";
import getFoodItems from "../../pages/api/fooditems/getFooditems";
import FoodItemCard from "./FoodItemCard";
import Favorites from "./Favorites";
import "../../styles/FoodandMenu/Grid.css";
import LoginContext from "../Login/LoginContext";

/**
 * A grid component that displays food items grouped by type and allows users to select or deselect items.
 *
 * @param {Object} props - The props for the component.
 * @param {Array<number>} props.foodItemIds - An array of food item IDs to display in the grid.
 * @param {Function} props.onAddFoodItem - Function to handle adding a food item to the selection.
 * @param {Function} props.onRemoveFoodItem - Function to handle removing a food item from the selection.
 * @param {number} props.menuItemId - The ID of the menu item associated with the food item grid.
 * @returns {JSX.Element} The rendered component.
 */
function FoodItemGrid({ foodItemIds, onAddFoodItem, onRemoveFoodItem, menuItemId }) {
  // State to manage food items and item counts
  const [foodItems, setFoodItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const { isLoggedIn, customerId, role } = useContext(LoginContext)

  /**
   * Fetches food items from the API and sets them in the component state.
   */
  const fetchFoodItems = async () => {
    try {
      const items = await getFoodItems();
      setFoodItems(items);
    } catch (err) {
      console.error("Error fetching food items:", err);
    }
  };

  // Fetch food items on component mount
  useEffect(() => {
    fetchFoodItems();
  }, []);

  /**
   * Determines the maximum count of food items that can be selected based on their type.
   * @param {string} type - The type of the food item.
   * @returns {number} The maximum count allowed for the given type.
   */
  const getMaxCount = (type) => {
    const id = parseInt(menuItemId, 10);
    if (type === "Side") return 2;
    if (type === "Entree") {
      switch (id) {
        case 1: return 1;
        case 2: return 2;
        case 3: return 3;
        case 4: return 2;
        case 5: return 3;
        default: return 1;
      }
    }
    if (["Appetizer", "Drinks", "Dessert"].includes(type)) return 1;
    return 0;
  };

  /**
   * Handles selecting a food item and updating the item count state.
   * @param {Object} foodItem - The food item to be selected.
   */
  const handleSelectItem = (foodItem) => {
    const { fooditem_id, type } = foodItem;
    const maxCount = getMaxCount(type);

    const currentTypeCount = Object.values(itemCounts).reduce(
      (count, { type: itemType, quantity }) =>
        itemType === type ? count + quantity : count,
      0
    );

    if (currentTypeCount < maxCount) {
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [fooditem_id]: {
          type,
          quantity: (prevCounts[fooditem_id]?.quantity || 0) + 1,
        },
      }));

      onAddFoodItem(fooditem_id);
    }
  };

  /**
   * Handles deselecting a food item and updating the item count state.
   * @param {Object} foodItem - The food item to be deselected.
   */
  const handleDeselectItem = (foodItem) => {
    const { fooditem_id, type } = foodItem;

    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [fooditem_id]: {
        type,
        quantity: (prevCounts[fooditem_id]?.quantity || 0) - 1,
      },
    }));

    onRemoveFoodItem(fooditem_id);
  };

  // Filter and group food items by type and availability
  const currentMonth = new Date().getMonth() + 1;
  const filteredFoodItems = foodItems
    .filter(
      (foodItem) =>
        foodItemIds.includes(foodItem.fooditem_id) &&
        foodItem.in_stock &&
        foodItem.seasonal.includes(currentMonth)
    )
    .sort((a, b) => a.type.localeCompare(b.type))
    .reverse();

  const groupedFoodItems = filteredFoodItems.reduce((acc, foodItem) => {
    const { type } = foodItem;
    if (!acc[type]) acc[type] = [];
    acc[type].push(foodItem);
    return acc;
  }, {});

  return (
    <Fragment>
      {/* Display the Favorites section if the user is logged in and is a customer */}
      {isLoggedIn &&  role === 'customer' ? (
        <Favorites
          menuItemId={menuItemId}
          customerId={customerId}
          onAddFoodItem={handleSelectItem}
          onRemoveFoodItem={handleDeselectItem}
          itemCounts={itemCounts}
          getMaxCount={getMaxCount}
      />
      ) : (
        <></>
      )}
      
      {/* Render food items grouped by type */}
      {Object.keys(groupedFoodItems).map((type) => {
        const maxCount = getMaxCount(type);
        const currentTypeCount = Object.values(itemCounts).reduce(
          (count, { type: itemType, quantity }) =>
            itemType === type ? count + quantity : count,
          0
        );
        const disableAdd = currentTypeCount >= maxCount;

        return (
          <div key={type}>
            <h1 className="type">{type}</h1>
            <div className="item-grid">
              {groupedFoodItems[type].map((foodItem) => (
                <FoodItemCard
                  key={foodItem.fooditem_id}
                  foodItem={foodItem}
                  quantity={itemCounts[foodItem.fooditem_id]?.quantity || 0}
                  onSelect={() => handleSelectItem(foodItem)}
                  onDeselect={() => handleDeselectItem(foodItem)}
                  disableAdd={disableAdd}
                />
              ))}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}

export default FoodItemGrid;