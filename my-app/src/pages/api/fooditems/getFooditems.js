/**
 * getFoodItems Utility Function
 * Fetches a list of food items from the backend API.
 *
 * @file getFoodItems.js
 * @module utils/getFoodItems
 * @requires fetch
 */

/**
 * Retrieves the list of food items from the backend.
 *
 * @async
 * @function getFoodItems
 * @returns {Promise<Object[]>} A promise that resolves to an array of food item objects.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * getFoodItems()
 *   .then(foodItems => console.log("Food Items:", foodItems))
 *   .catch(error => console.error("Error fetching food items:", error.message));
 */
const getFoodItems = async () => {
  try {
    // Send a GET request to the backend API to fetch food item data.
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/fooditems");
    
    // Throw an error if the response is not successful.
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the response JSON data.
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    // Log the error message to the console and rethrow the error.
    console.error(err.message);
    throw err;
  }
};

export default getFoodItems;
