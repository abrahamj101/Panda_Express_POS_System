/**
 * updateFoodItemInStock Utility Function
 * Updates the stock availability of a specific food item in the backend API.
 *
 * @file updateFoodItemInStock.js
 * @module utils/updateFoodItemInStock
 * @requires fetch
 */

/**
 * Updates the in-stock status of a food item by its ID.
 *
 * @async
 * @function updateFoodItemInStock
 * @param {number|string} id - The unique ID of the food item.
 * @param {boolean} inStock - The updated stock status of the food item (true if in stock, false otherwise).
 * @returns {Promise<Object>} A promise that resolves to the updated food item object.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * updateFoodItemInStock(1, true)
 *   .then(updatedItem => console.log("Updated Item:", updatedItem))
 *   .catch(error => console.error("Error updating stock status:", error.message));
 */
const updateFoodItemInStock = async (id, inStock) => {
  try {
    // Build the request body
    const body = {
      id: id,
      inStock: inStock
    };

    // Send the PUT request to update stock status
    const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/foodItems/update/instock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Throw an error if the response is not successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse and return the response JSON data
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    // Log the error message to the console and rethrow the error
    console.error(err.message);
    throw err;
  }
};

export default updateFoodItemInStock;
