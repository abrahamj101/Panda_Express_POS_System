/**
 * addOnlineUsers Utility Function
 * Adds a new online user to the backend API with details such as name, email, role, and optional IDs.
 *
 * @file addOnlineUsers.js
 * @module utils/addOnlineUsers
 * @requires fetch
 */

/**
 * Adds a new online user to the system.
 *
 * @async
 * @function addOnlineUsers
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} role - The role of the user (e.g., "customer", "employee").
 * @param {number|null} [customerId=null] - Optional customer ID if the user is a customer.
 * @param {number|null} [employeeId=null] - Optional employee ID if the user is an employee.
 * @returns {Promise<Object>} A promise that resolves to the added user object.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * addOnlineUsers("John", "Doe", "john.doe@example.com", "customer", 123, null)
 *   .then(user => console.log("Added Online User:", user))
 *   .catch(error => console.error("Error adding user:", error.message));
 */
const addOnlineUsers = async (firstName, lastName, email, role, customerId = null, employeeId = null) => {
  try {
    // Build the request body
    const body = {
      first_name: firstName,
      last_name: lastName,
      email,
      role,
      customer_id: customerId,
      employee_id: employeeId,
    };

    // Send the POST request to the backend
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/online-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Throw an error if the response is not successful
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    // Parse and return the response data
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    // Log the error message to the console and rethrow the error
    console.error("Error adding online user:", err.message);
    throw err;
  }
};

export default addOnlineUsers;
