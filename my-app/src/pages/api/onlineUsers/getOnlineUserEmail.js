/**
 * getOnlineUsersEmail Utility Function
 * Checks if an online user exists in the backend system using their email address.
 *
 * @file getOnlineUserEmail.js
 * @module utils/getOnlineUsersEmail
 * @requires fetch
 */

/**
 * Retrieves user details from the backend if the user exists based on the provided email.
 *
 * @async
 * @function getOnlineUsersEmail
 * @param {string} email - The email address of the user to check.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws {Error} Throws an error if the email is not provided or the request fails.
 *
 * @example
 * getOnlineUsersEmail("john.doe@example.com")
 *   .then(user => {
 *     if (user) {
 *       console.log("User found:", user);
 *     } else {
 *       console.log("User not found");
 *     }
 *   })
 *   .catch(error => console.error("Error checking user email:", error.message));
 */
const getOnlineUsersEmail = async (email) => {
  try {
    // Ensure email is not empty
    if (!email) {
      throw new Error("Email is required");
    }

    // Call the backend endpoint to check if the user exists
    const response = await fetch(
      `https://project-3-team-3-b-backend.vercel.app/api/online-users/exists?email=${encodeURIComponent(email)}`
    );

    // If the user is not found, return null
    if (response.status === 404) {
      console.log("User not found");
      return null;
    }

    // If the request was not successful, throw an error
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Parse the response and return the user data
    const user = await response.json();
    return user; // This will be the user object from the backend
  } catch (error) {
    // Log the error message to the console and rethrow the error
    console.error("Error checking user existence:", error.message);
    throw error;
  }
};

export default getOnlineUsersEmail;
