/**
 * addOrders Utility Function
 * Adds a new order to the backend API, including customer, menu items, total cost, and tax.
 *
 * @file addOrders.js
 * @module utils/addOrders
 * @requires fetch
 */

/**
 * Adds a new order to the system.
 *
 * @async
 * @function addOrders
 * @param {number|string} customerId - The ID of the customer placing the order.
 * @param {Object[]} menuItems - An array of menu item objects to be included in the order.
 * @param {function} menuItems[].getMenuItemId - A function to retrieve the menu item's ID.
 * @param {function} menuItems[].getFoodItemIds - A function to retrieve the associated food item IDs.
 * @param {number} total - The total cost of the order.
 * @param {number} tax - The tax amount for the order.
 * @returns {Promise<Object>} A promise that resolves to the created order object.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * const menuItems = [
 *   { getMenuItemId: () => 1, getFoodItemIds: () => [101, 102] },
 *   { getMenuItemId: () => 2, getFoodItemIds: () => [103] },
 * ];
 * addOrders(123, menuItems, 25.99, 2.50)
 *   .then(order => console.log("Order created:", order))
 *   .catch(error => console.error("Error adding order:", error.message));
 */
const addOrders = async (customerId, menuItems, total, tax) => {
  try {
    // Build the request body
    const now = new Date();

    // Get the components of the date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");
    const millisecond = String(now.getMilliseconds()).padStart(3, "0");

    // Simulate microseconds with random digits
    const microsecond = String(Math.floor(Math.random() * 1000)).padStart(3, "0");

    // Format the date as "YYYY-MM-DD HH:mm:ss.mmmuuu"
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}${microsecond}`;

    const body = {
      employee_id: 0,
      customer_id: parseInt(customerId),
      menuitem_ids: menuItems.map((item) => item.getMenuItemId()),
      total,
      tax,
      ordered_time: formattedDate,
      fooditem_ids: JSON.stringify(menuItems.map((item) => item.getFoodItemIds())),
    };

    // Send the POST request
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/orders", {
      method: "POST",
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

export default addOrders;
