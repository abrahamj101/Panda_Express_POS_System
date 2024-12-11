/**
 * getOnlineUsers Utility Function
 * Fetches the list of online users from the backend API.
 *
 * @file getOnlineUsers.js
 * @module utils/getOnlineUsers
 * @requires fetch
 */

/**
 * Retrieves the list of online users from the backend.
 *
 * @async
 * @function getOnlineUsers
 * @returns {Promise<Object[]>} A promise that resolves to an array of online user objects.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * getOnlineUsers()
 *   .then(users => console.log("Online Users:", users))
 *   .catch(error => console.error("Error fetching online users:", error.message));
 */
const getOnlineUsers = async () => {
  try {
    // Send a GET request to the backend API to fetch the list of online users.
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/online-users");

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

export default getOnlineUsers;
