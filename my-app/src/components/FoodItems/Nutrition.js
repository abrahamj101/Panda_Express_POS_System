/**
 * Nutrition Component
 * Displays nutritional information for a specific food item in a tooltip when hovered.
 *
 * @file Nutrition.js
 * @module components/Nutrition
 * @requires getNutrition - API call to fetch nutrition data.
 * @requires Nutrition.css - Styles for the tooltip and icon display.
 */

import React, { useEffect, useState } from "react";
import getNutition from "../../pages/api/fooditems/getNutition";
import "../../styles/FoodandMenu/Nutrition.css";

/**
 * Nutrition Component
 *
 * @param {Object} props - Component props.
 * @param {number} props.foodItemId - The ID of the food item to fetch nutrition data for.
 *
 * @returns {JSX.Element} A tooltip displaying the nutrition facts when hovered.
 */
const Nutrition = ({ foodItemId }) => {
  // State to store nutrition information for the given food item
  const [nutrition, setNutrition] = useState(null);

  // State to track whether the tooltip is hovered or not
  const [isHovered, setIsHovered] = useState(false);

  /**
   * fetchNutrition - Fetches nutritional information for the food item.
   */
  const fetchNutrition = async () => {
    try {
      const items = await getNutition(foodItemId);
      setNutrition(items[0]); // Assuming API returns an array and the first element is needed
    } catch (err) {
      console.error("Error fetching nutrition values:", err);
    }
  };

  /**
   * useEffect - Fetches nutrition data when the component mounts or when foodItemId changes.
   */
  useEffect(() => {
    fetchNutrition();
  }, [foodItemId]);

  return (
    /**
     * Container for the nutrition tooltip.
     * Displays an info icon and the tooltip when hovered.
     */
    <div
      className="nutrition-icon-container"
      onMouseEnter={() => setIsHovered(true)} // Show tooltip on hover
      onMouseLeave={() => setIsHovered(false)} // Hide tooltip when not hovered
    >
      {/* Info icon to indicate nutritional information */}
      <span className="info-icon">ℹ️</span>

      {/* Tooltip containing the nutrition table */}
      {isHovered && nutrition && (
        <div className="nutrition-tooltip">
          <table>
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Serving Size</td>
                <td>{nutrition.serving_size}g</td>
              </tr>
              <tr>
                <td>Calories</td>
                <td>{nutrition.calories}</td>
              </tr>
              <tr>
                <td>Calories from Fat</td>
                <td>{nutrition.calories_from_fat}</td>
              </tr>
              <tr>
                <td>Total Fat</td>
                <td>{nutrition.total_fat}g</td>
              </tr>
              <tr>
                <td>Saturated Fat</td>
                <td>{nutrition.saturated_fat}g</td>
              </tr>
              <tr>
                <td>Trans Fat</td>
                <td>{nutrition.trans_fat}g</td>
              </tr>
              <tr>
                <td>Cholesterol</td>
                <td>{nutrition.cholesterol}mg</td>
              </tr>
              <tr>
                <td>Sodium</td>
                <td>{nutrition.sodium}mg</td>
              </tr>
              <tr>
                <td>Total Carbs</td>
                <td>{nutrition.total_carb}g</td>
              </tr>
              <tr>
                <td>Dietary Fiber</td>
                <td>{nutrition.dietary_fiber}g</td>
              </tr>
              <tr>
                <td>Sugars</td>
                <td>{nutrition.sugars}g</td>
              </tr>
              <tr>
                <td>Protein</td>
                <td>{nutrition.protein}g</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Nutrition;
