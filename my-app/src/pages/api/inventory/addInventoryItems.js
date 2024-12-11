/**
 * addInventoryItem Utility Function
 * Adds a new inventory item to the backend API.
 *
 * @file addInventoryItems.js
 * @module utils/addInventoryItem
 * @requires fetch
 */

/**
 * Adds a new inventory item to the database.
 *
 * @async
 * @function addInventoryItem
 * @param {Object} item - The inventory item object containing details to be added.
 * @param {string} item.name - The name of the inventory item.
 * @param {number} item.quantity - The quantity of the item in stock.
 * @param {string} item.category - The category of the inventory item.
 * @returns {Promise<Object>} A promise that resolves to the added inventory item object.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * const newItem = { name: "Soy Sauce", quantity: 50, category: "Condiments" };
 * addInventoryItem(newItem)
 *   .then(item => console.log("Added Inventory Item:", item))
 *   .catch(error => console.error("Error adding inventory item:", error.message));
 */
const addInventoryItem = async (item) => {
  try {
    // Send a POST request to the backend API to add a new inventory item.
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/inventoryItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    // Throw an error if the response is not successful.
    if (!response.ok) {
      throw new Error("Failed to add inventory item");
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

export default addInventoryItem;
