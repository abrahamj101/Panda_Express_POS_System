/**
 * Favorites Component
 * Displays a list of the customer's favorite food items based on their past orders.
 * Allows adding or removing food items to/from the cart while adhering to item count limits.
 *
 * @file Favorites.js
 * @module components/Favorites
 * @requires getOrders - API call to retrieve customer orders.
 * @requires getFoodItems - API call to retrieve all available food items.
 * @requires FoodItemCard - Component to display individual food item details.
 */

import { useEffect, useState } from "react";
import getOrders from "../../pages/api/orders/getCustomerOrders";
import getFoodItems from "../../pages/api/fooditems/getFooditems";
import FoodItemCard from "./FoodItemCard";

/**
 * Favorites Component
 *
 * @param {Object} props - Component props.
 * @param {number} props.menuItemId - The ID of the menu item to filter favorite food items.
 * @param {number} props.customerId - The ID of the customer to fetch past orders.
 * @param {Function} props.onAddFoodItem - Callback to add a food item to the cart.
 * @param {Function} props.onRemoveFoodItem - Callback to remove a food item from the cart.
 * @param {Object} props.itemCounts - Object tracking quantities of selected food items.
 * @param {Function} props.getMaxCount - Function to determine the maximum count allowed per food type.
 * @returns {JSX.Element} A grid of favorite food items with controls to add or remove them.
 */
const Favorites = ({
  menuItemId,
  customerId,
  onAddFoodItem,
  onRemoveFoodItem,
  itemCounts,
  getMaxCount,
}) => {
  // State to store counts of food items based on past orders
  const [foodItemCounts, setFoodItemCounts] = useState({});

  // State to store the top favorite food items
  const [favoriteFoodItems, setFavoriteFoodItems] = useState([]);

  /**
   * fetchOrders - Fetches customer orders and calculates food item counts.
   * Filters orders that include the specified menuItemId and aggregates food item frequencies.
   */
  const fetchOrders = async () => {
    try {
      const customerOrders = await getOrders(customerId);

      // Filter orders to include only those with the given menuItemId
      const filteredOrders = customerOrders.filter((order) =>
        order.menuitem_ids.includes(menuItemId)
      );

      const foodItemCountMap = {};

      // Count occurrences of each food item ID across the filtered orders
      filteredOrders.forEach((order) => {
        const menuIndex = order.menuitem_ids.indexOf(menuItemId);
        if (menuIndex !== -1 && order.fooditem_ids[menuIndex]) {
          order.fooditem_ids[menuIndex].forEach((foodItemId) => {
            foodItemCountMap[foodItemId] =
              (foodItemCountMap[foodItemId] || 0) + 1;
          });
        }
      });

      setFoodItemCounts(foodItemCountMap);
    } catch (err) {
      console.error("Could not get customer's orders", err);
    }
  };

  /**
   * fetchFavoriteFoodItems - Fetches all available food items and determines the top favorites.
   * Sorts food items by their counts and selects the top 5.
   */
  const fetchFavoriteFoodItems = async () => {
    try {
      const items = await getFoodItems();

      // Sort food items by count in descending order and select top 5
      const sortedFoodItemIds = Object.entries(foodItemCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5)
        .map(([foodItemId]) => parseInt(foodItemId, 10));

      // Filter food items to include only the top favorites
      const favorites = items.filter((item) =>
        sortedFoodItemIds.includes(item.fooditem_id)
      );
      setFavoriteFoodItems(favorites);
    } catch (err) {
      console.error("Error fetching favorite food items:", err);
    }
  };

  /**
   * Initial useEffect - Fetches customer orders when the component mounts.
   */
  useEffect(() => {
    fetchOrders();
  }, []);

  /**
   * useEffect - Fetches favorite food items after food item counts are calculated.
   */
  useEffect(() => {
    if (Object.keys(foodItemCounts).length > 0) {
      fetchFavoriteFoodItems();
    }
  }, [foodItemCounts]);

  return (
    <>
      {/* Render only if there are favorite food items */}
      {favoriteFoodItems.length > 0 && (
        <>
          <h1 className="type">Favorites</h1>
          <div className="item-grid">
            {/* Render a FoodItemCard for each favorite food item */}
            {favoriteFoodItems.map((foodItem) => {
              const { fooditem_id, type } = foodItem;

              // Get the maximum allowed count for this type of food
              const maxCount = getMaxCount(type);

              // Calculate the current count of this food type in the cart
              const currentTypeCount = Object.values(itemCounts).reduce(
                (count, { type: itemType, quantity }) =>
                  itemType === type ? count + quantity : count,
                0
              );

              // Disable the "Add" button if the maximum count is reached
              const disableAdd = currentTypeCount >= maxCount;

              return (
                <FoodItemCard
                  key={fooditem_id}
                  foodItem={foodItem}
                  onSelect={() => onAddFoodItem(foodItem)}
                  onDeselect={() => onRemoveFoodItem(foodItem)}
                  quantity={itemCounts[fooditem_id]?.quantity || 0}
                  disableAdd={disableAdd}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Favorites;
