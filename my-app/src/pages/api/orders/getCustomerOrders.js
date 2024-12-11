/**
 * @file getOrders.js
 * @description A utility function for fetching orders associated with a specific customer from the backend API.
 */

/**
 * Retrieves the orders associated with a specific customer by sending a GET request to the backend API.
 * @async
 * @function getOrders
 * @param {number|string} id - The unique identifier of the customer whose orders are to be fetched.
 * @returns {Promise<Object[]>} A promise that resolves to an array of orders for the specified customer.
 * @throws {Error} Throws an error if the network response is not OK or if there is an issue with the request.
 * 
 * @example
 * const orders = await getOrders(123);
 * console.log(orders); // Logs the array of orders for customer ID 123.
 */
const getOrders = async (id) => {
    try {
      // Construct the API endpoint URL with the provided customer ID
      const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/orders/customer?id=${id}`);
      
      // Check if the response status is not OK
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    
      // Parse the JSON response from the API
      const jsonData = await response.json();
      return jsonData;  // Return the parsed JSON data
    } catch (err) {

      // Log the error message to the console for debugging
      console.error(err.message);
      throw err;  // Re-throw the error to allow further handling by the caller
    }
  };
  
  export default getOrders;
  