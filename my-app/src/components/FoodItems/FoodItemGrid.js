import React, { Fragment, useState, useEffect } from 'react';
import getFoodItems from '../../pages/api/fooditems/getFooditems';
import FoodItemCard from './FoodItemCard';
import "../../styles/Grid.css";

function FoodItemGrid({ foodItemIds, onSelectionChange }) {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

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

  const handleSelectItem = (foodItem) => {
    setSelectedItems((prevSelectedItems) => {
      const currentCount = prevSelectedItems[foodItem.fooditem_id] || 0;
      if (currentCount < 3) {
        const updatedSelectedItems = {
          ...prevSelectedItems,
          [foodItem.fooditem_id]: currentCount + 1,
        };
        onSelectionChange(updatedSelectedItems);
        return updatedSelectedItems;
      }
      return prevSelectedItems;
    });
  };

  const handleDeselectItem = (foodItem) => {
    setSelectedItems((prevSelectedItems) => {
      const currentCount = prevSelectedItems[foodItem.fooditem_id] || 0;
      if (currentCount > 0) {
        const updatedSelectedItems = {
          ...prevSelectedItems,
          [foodItem.fooditem_id]: currentCount - 1,
        };
        onSelectionChange(updatedSelectedItems);
        return updatedSelectedItems;
      }
      return prevSelectedItems;
    });
  };

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
                  foodItem={foodItem}
                  onSelect={() => handleSelectItem(foodItem)}
                  onDeselect={() => handleDeselectItem(foodItem)}
                  selectedCount={selectedItems[foodItem.fooditem_id] || 0}
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
