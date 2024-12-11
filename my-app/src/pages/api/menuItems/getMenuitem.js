/**
 * getMenuItems Utility Function
 * Fetches the list of menu items from the backend API.
 *
 * @file getMenuItems.js
 * @module utils/getMenuItems
 * @requires fetch
 */

/**
 * Retrieves the list of menu items from the database.
 *
 * @async
 * @function getMenuItems
 * @returns {Promise<Object[]>} A promise that resolves to an array of menu item objects.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * getMenuItems()
 *   .then(menuItems => console.log("Menu Items:", menuItems))
 *   .catch(error => console.error("Error fetching menu items:", error.message));
 */
const getMenuItems = async () => {
  try {
    // Send a GET request to the backend API to fetch menu items.
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/menuItems");

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

export default getMenuItems;
