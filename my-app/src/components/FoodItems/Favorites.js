import { useEffect, useState } from "react";
import getOrders from "../../pages/api/orders/getCustomerOrders";
import getFoodItems from "../../pages/api/fooditems/getFooditems";
import FoodItemCard from "./FoodItemCard";

const Favorites = ({ menuItemId, customerId, onAddFoodItem, onRemoveFoodItem, itemCounts, getMaxCount }) => {
  const [foodItemCounts, setFoodItemCounts] = useState({});
  const [favoriteFoodItems, setFavoriteFoodItems] = useState([]);

  const fetchOrders = async () => {
    try {
      const customerOrders = await getOrders(customerId);

      const filteredOrders = customerOrders.filter((order) =>
        order.menuitem_ids.includes(menuItemId)
      );

      const foodItemCountMap = {};
      filteredOrders.forEach((order) => {
        const menuIndex = order.menuitem_ids.indexOf(menuItemId);
        if (menuIndex !== -1 && order.fooditem_ids[menuIndex]) {
          order.fooditem_ids[menuIndex].forEach((foodItemId) => {
            foodItemCountMap[foodItemId] = (foodItemCountMap[foodItemId] || 0) + 1;
          });
        }
      });

      setFoodItemCounts(foodItemCountMap);
    } catch (err) {
      console.error("Could not get customer's orders", err);
    }
  };

  const fetchFavoriteFoodItems = async () => {
    try {
      const items = await getFoodItems();
      const sortedFoodItemIds = Object.entries(foodItemCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5)
        .map(([foodItemId]) => parseInt(foodItemId, 10));

      const favorites = items.filter((item) => sortedFoodItemIds.includes(item.fooditem_id));
      setFavoriteFoodItems(favorites);
    } catch (err) {
      console.error("Error fetching favorite food items:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (Object.keys(foodItemCounts).length > 0) {
      fetchFavoriteFoodItems();
    }
  }, [foodItemCounts]);

  return (
    <>
      {favoriteFoodItems.length > 0 && (
        <>
          <h1 className="type">Favorites</h1>
          <div className="item-grid">
            {favoriteFoodItems.map((foodItem) => {
              const { fooditem_id, type } = foodItem;
              const maxCount = getMaxCount(type);
              const currentTypeCount = Object.values(itemCounts).reduce(
                (count, { type: itemType, quantity }) =>
                  itemType === type ? count + quantity : count,
                0
              );
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
