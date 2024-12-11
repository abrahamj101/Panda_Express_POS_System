/**
 * Fetches the list of online customers from the backend API.
 * 
 * @async
 * @function getOnlineUsers
 * @returns {Promise<Object[]>} A promise resolving to an array of online users.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 * 
 * @example
 * getOnlineUsers()
 *   .then(users => console.log("Online Users:", users))
 *   .catch(error => console.error("Error fetching users:", error.message));
 */
const getOnlineUsers = async () => {
  try {
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/customers");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export default getOnlineUsers;
