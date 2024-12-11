/**
 * getEmployees Utility Function
 * Fetches a list of employees from the backend API.
 *
 * @file getEmployees.js
 * @module utils/getEmployees
 * @requires fetch
 */

/**
 * Retrieves the list of employees from the backend.
 *
 * @async
 * @function getEmployees
 * @returns {Promise<Object[]>} A promise that resolves to an array of employee objects.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * getEmployees()
 *   .then(employees => console.log("Employees:", employees))
 *   .catch(error => console.error("Error fetching employees:", error.message));
 */
const getEmployees = async () => {
  try {
    // Send a GET request to the backend API to fetch employee data.
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/employees"); 
    
    // Throw an error if the response is not successful.
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the response JSON data.
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    // Log the error message to the console and rethrow the error.
    console.error(err.message);
    throw err;
  }
};

export default getEmployees;
