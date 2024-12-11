/**
 * getOrders Utility Function
 * Fetches a paginated list of orders from the backend API.
 *
 * @file getOrders.js
 * @module utils/getOrders
 * @requires fetch
 */

/**
 * Retrieves a paginated list of orders.
 *
 * @async
 * @function getOrders
 * @param {number} page - The page number for paginated results.
 * @returns {Promise<Object>} A promise that resolves to an object containing order data, including pagination details.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * getOrders(1)
 *   .then(orders => console.log("Paginated Orders:", orders))
 *   .catch(error => console.error("Error fetching orders:", error.message));
 */
const getOrders = async (page) => {
  try {
    // Send a GET request to the backend API with the page query parameter
    const response = await fetch(
      `https://project-3-team-3-b-backend.vercel.app/api/orders?page=${page}`
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

export default getOrders;
