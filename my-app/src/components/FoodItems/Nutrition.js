import React, { useEffect, useState } from "react";
import getNutition from "../../pages/api/fooditems/getNutition";
import "../../styles/FoodandMenu/Nutrition.css";

const Nutrition = ({ foodItemId }) => {
  const [nutrition, setNutrition] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const fetchNutrition = async () => {
    try {
      const items = await getNutition(foodItemId);
      setNutrition(items[0]);
    } catch (err) {
      console.error("Error fetching nutrition values:", err);
    }
  };

  useEffect(() => {
    fetchNutrition();
  }, [foodItemId]);

  return (
    <div
      className="nutrition-icon-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="info-icon">ℹ️</span>
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
