/**
 * updateMenuItemInStock Utility Function
 * Updates the in-stock status of a specific menu item in the backend API.
 *
 * @file updateInStock.js
 * @module utils/updateMenuItemInStock
 * @requires fetch
 */

/**
 * Updates the in-stock status of a menu item by its ID.
 *
 * @async
 * @function updateMenuItemInStock
 * @param {number|string} id - The unique ID of the menu item.
 * @param {boolean} inStock - The updated in-stock status (true for in stock, false otherwise).
 * @returns {Promise<Object>} A promise that resolves to the updated menu item object.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * updateMenuItemInStock(3, true)
 *   .then(updatedItem => console.log("Updated Menu Item:", updatedItem))
 *   .catch(error => console.error("Error updating menu item stock status:", error.message));
 */
const updateMenuItemInStock = async (id, inStock) => {
  try {
    // Build the request body
    const body = {
      id: id,
      inStock: inStock,
    };

    // Send the PUT request to update the menu item's in-stock status
    const response = await fetch(
      `https://project-3-team-3-b-backend.vercel.app/api/menuitems/update/instock`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

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

export default updateMenuItemInStock;
