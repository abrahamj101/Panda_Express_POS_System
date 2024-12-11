/**
 * updateInventoryItemQuantity Utility Function
 * Updates the quantity of a specific inventory item in the backend API.
 *
 * @file updateQuantityOrders.js
 * @module utils/updateInventoryItemQuantity
 * @requires fetch
 */

/**
 * Updates the quantity of an inventory item by its ID.
 *
 * @async
 * @function updateInventoryItemQuantity
 * @param {number|string} id - The unique ID of the inventory item.
 * @param {number} quantity - The updated quantity value for the inventory item.
 * @returns {Promise<Object>} A promise that resolves to the updated inventory item object.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * updateInventoryItemQuantity(1, 100)
 *   .then(updatedItem => console.log("Updated Item:", updatedItem))
 *   .catch(error => console.error("Error updating inventory quantity:", error.message));
 */
const updateInventoryItemQuantity = async (id, quantity) => {
  try {
    // Build the request body
    const body = {
      quantity: quantity,
      id: id,
    };

    // Send the PUT request to update the inventory item's quantity
    const response = await fetch(
      "https://project-3-team-3-b-backend.vercel.app/api/inventoryItems/update/quantity/orders",
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

export default updateInventoryItemQuantity;
