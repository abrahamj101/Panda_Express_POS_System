/**
 * FoodItemGrid Component
 * Renders a grid of food items, grouped by type, with options to add or remove items.
 * Includes a Favorites section for logged-in customers and handles seasonal filtering.
 *
 * @file FoodItemGrid.js
 * @module components/FoodItemGrid
 * @requires getFoodItems - API call to fetch all food items.
 * @requires FoodItemCard - Component to display individual food items.
 * @requires Favorites - Component to display the user's favorite food items.
 * @requires Grid.css - Styles for the food item grid layout.
 * @requires LoginContext - Provides user login status and role.
 */

import React, { Fragment, useState, useEffect, useContext } from "react";
import getFoodItems from "../../pages/api/fooditems/getFooditems";
import FoodItemCard from "./FoodItemCard";
import Favorites from "./Favorites";
import "../../styles/FoodandMenu/Grid.css";
import LoginContext from "../Login/LoginContext";

/**
 * FoodItemGrid Component
 *
 * @param {Object} props - Component props.
 * @param {Array<number>} props.foodItemIds - List of food item IDs to display.
 * @param {Function} props.onAddFoodItem - Callback to add a food item to the cart.
 * @param {Function} props.onRemoveFoodItem - Callback to remove a food item from the cart.
 * @param {number} props.menuItemId - Menu ID used for determining max selection limits.
 *
 * @returns {JSX.Element} A grid of food items grouped by type and a Favorites section.
 */
function FoodItemGrid({ foodItemIds, onAddFoodItem, onRemoveFoodItem, menuItemId }) {
  // State to hold all available food items
  const [foodItems, setFoodItems] = useState([]);

  // State to track selected food items and their quantities
  const [itemCounts, setItemCounts] = useState({});

  // Access login status and customer ID from LoginContext
  const { isLoggedIn, customerId, role } = useContext(LoginContext);

  /**
   * fetchFoodItems - Fetches all available food items from the API.
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
   * getMaxCount - Determines the maximum allowed count for a given food type.
   *
   * @param {string} type - The food item type (e.g., Side, Entree).
   * @returns {number} The maximum allowable count for the specified type.
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
   * handleSelectItem - Handles adding a food item to the cart.
   *
   * @param {Object} foodItem - The selected food item.
   */
  const handleSelectItem = (foodItem) => {
    const { fooditem_id, type } = foodItem;
    const maxCount = getMaxCount(type);

    // Calculate the current count for this type of food
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
   * handleDeselectItem - Handles removing a food item from the cart.
   *
   * @param {Object} foodItem - The deselected food item.
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

  // Get the current month to filter seasonal food items
  const currentMonth = new Date().getMonth() + 1;

  /**
   * Filter and sort food items:
   * - Include only items that match the provided IDs and are in stock.
   * - Filter items based on their seasonal availability for the current month.
   */
  const filteredFoodItems = foodItems
    .filter(
      (foodItem) =>
        foodItemIds.includes(foodItem.fooditem_id) &&
        foodItem.in_stock &&
        foodItem.seasonal.includes(currentMonth)
    )
    .sort((a, b) => a.type.localeCompare(b.type))
    .reverse();

  /**
   * Group filtered food items by their type (e.g., Side, Entree, Appetizer).
   */
  const groupedFoodItems = filteredFoodItems.reduce((acc, foodItem) => {
    const { type } = foodItem;
    if (!acc[type]) acc[type] = [];
    acc[type].push(foodItem);
    return acc;
  }, {});

  return (
    <Fragment>
      {/* Render Favorites section for logged-in customers */}
      {isLoggedIn && role === "customer" ? (
        <Favorites
          menuItemId={menuItemId}
          customerId={customerId}
          onAddFoodItem={handleSelectItem}
          onRemoveFoodItem={handleDeselectItem}
          itemCounts={itemCounts}
          getMaxCount={getMaxCount}
        />
      ) : null}

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
