import React, { Fragment, useState, useEffect } from 'react';
import getFoodItems from '../../pages/api/fooditems/getFooditems';
import FoodItemCard from './FoodItemCard';
import "../../styles/Grid.css"


function FoodItemGrid({ foodItemIds }) {
  const [foodItems, setFoodItems] = useState([]);

  // Fetch food items from the database using the generalized function
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

  return (
    <Fragment>
      <div className='item-grid'>
        {foodItems.length > 0 ? (
          foodItems
            .filter((foodItem) => foodItemIds.includes(foodItem.fooditem_id))
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
