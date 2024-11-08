import React, { Fragment, useState, useEffect } from 'react';
import getFoodItems from '../../pages/api/fooditems/getFooditems';
import FoodItemCard from './FoodItemCard';
import "../../styles/Grid.css";

function FoodItemGrid({ foodItemIds }) {
  const [foodItems, setFoodItems] = useState([]);

  const fetchFoodItems = async () => {
    try {
      const items = await getFoodItems();
      setFoodItems(items);
    } catch (err) {
      console.error('Error fetching food items:', err);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const currentMonth = new Date().getMonth() + 1;

  return (
    <Fragment>
      <div className="item-grid">
        {foodItems.length > 0 ? (
          foodItems
            .filter(
              (foodItem) =>
                foodItemIds.includes(foodItem.fooditem_id) &&
                foodItem.in_stock &&
                foodItem.seasonal.includes(currentMonth)
            )
            .map((foodItem) => (
              <FoodItemCard
                key={foodItem.fooditem_id}
                foodItem_id={foodItem.fooditem_id}
                foodItem_name={foodItem.fooditem_name}
                image_link={foodItem.image_link}
              />
            ))
        ) : (
          <p>Loading food items...</p>
        )}
      </div>
    </Fragment>
  );
}

export default FoodItemGrid;
