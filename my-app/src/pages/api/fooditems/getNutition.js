/**
 * getNutrition Utility Function
 * Fetches nutrition details for a specific food item from the backend API.
 *
 * @file getNutrition.js
 * @module utils/getNutrition
 * @requires fetch
 */

/**
 * Retrieves the nutrition details for a specific food item by its ID.
 *
 * @async
 * @function getNutrition
 * @param {number|string} id - The unique ID of the food item.
 * @returns {Promise<Object>} A promise that resolves to an object containing the nutrition details.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * getNutrition(1)
 *   .then(nutrition => console.log("Nutrition Details:", nutrition))
 *   .catch(error => console.error("Error fetching nutrition details:", error.message));
 */
const getNutrition = async (id) => {
  try {
    // Send a GET request to the backend API with the specified food item ID.
    const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/nutrition?id=${id}`);
    
    // Throw an error if the response is not successful.
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse and return the response JSON data.
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    // Log the error message to the console and rethrow the error.
    console.error(err.message);
    throw err;
  }
};

export default getNutrition;
