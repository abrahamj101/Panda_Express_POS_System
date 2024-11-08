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

  const filteredFoodItems = foodItems
    .filter(
      (foodItem) =>
        foodItemIds.includes(foodItem.fooditem_id) &&
        foodItem.in_stock &&
        foodItem.seasonal.includes(currentMonth)
    )
    .sort((a, b) => a.type.localeCompare(b.type));

  const groupedFoodItems = filteredFoodItems.reduce((acc, foodItem) => {
    const { type } = foodItem;
    if (!acc[type]) acc[type] = [];
    acc[type].push(foodItem);
    return acc;
  }, {});

  return (
    <Fragment>
      {
        Object.keys(groupedFoodItems).map((type) => (
          <div key={type}>
            <h1 className='type'>{type}</h1>
            <div className="item-grid">
              {groupedFoodItems[type].map((foodItem) => (
                <FoodItemCard
                  key={foodItem.fooditem_id}
                  foodItem_name={foodItem.fooditem_name}
                  image_link={foodItem.image_link}
                  premium={foodItem.premium}
                />
              ))}
            </div>
          </div>
        ))
      }
    </Fragment>
  );
}

export default FoodItemGrid;
