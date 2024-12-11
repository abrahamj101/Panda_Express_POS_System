/**
 * getInventoryItems Utility Function
 * Fetches the list of inventory items from the backend API.
 *
 * @file getInventoryItems.js
 * @module utils/getInventoryItems
 * @requires fetch
 */

/**
 * Retrieves the list of inventory items from the database.
 *
 * @async
 * @function getInventoryItems
 * @returns {Promise<Object[]>} A promise that resolves to an array of inventory item objects.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * getInventoryItems()
 *   .then(items => console.log("Inventory Items:", items))
 *   .catch(error => console.error("Error fetching inventory items:", error.message));
 */
const getInventoryItems = async () => {
  try {
    // Send a GET request to the backend API to fetch inventory items.
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/inventoryItems");

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

export default getInventoryItems;
