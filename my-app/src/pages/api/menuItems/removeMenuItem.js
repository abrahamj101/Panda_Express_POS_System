/**
 * removeMenuItem Utility Function
 * Deletes a specific menu item from the backend API by its ID.
 *
 * @file removeMenuItem.js
 * @module utils/removeMenuItem
 * @requires fetch
 */

/**
 * Removes a menu item from the database by its ID.
 *
 * @async
 * @function removeMenuItem
 * @param {number|string} id - The unique ID of the menu item to be deleted.
 * @returns {Promise<Object>} A promise that resolves to the server's response confirming deletion.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * removeMenuItem(5)
 *   .then(response => console.log("Menu item deleted:", response))
 *   .catch(error => console.error("Error deleting menu item:", error.message));
 */
const removeMenuItem = async (id) => {
  try {
    // Send a DELETE request to the backend API with the specific menu item ID
    const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/menuItems/${id}`, {
      method: "DELETE",
    });

    // Throw an error if the response is not successful
    if (!response.ok) {
      throw new Error("Failed to delete menu item");
    }

    // Parse and return the response JSON data
    return await response.json();
  } catch (err) {
    // Log the error message to the console and rethrow the error
    console.error(err.message);
    throw err;
  }
};

export default removeMenuItem;
