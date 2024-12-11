/**
 * Adds a new customer by sending their information to the backend API.
 * 
 * @async
 * @function addCustomer
 * @param {string} firstName - The first name of the customer.
 * @param {string} lastName - The last name of the customer.
 * @param {string} paymentMethod - The payment method used (e.g., "credit card", "cash").
 * @param {string} paymentInformation - Additional payment details (e.g., card number).
 * @returns {Promise<Object>} The response data from the API containing the customer details.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 * 
 * @example
 * addCustomer("John", "Doe", "credit card", "1234-5678-9012-3456")
 *   .then(data => console.log("Customer added:", data))
 *   .catch(error => console.error("Error:", error.message));
 */
const addCustomer = async (firstName, lastName, paymentMethod, paymentInformation) => {
  try {
    // Build the request body
    const body = {
      customer_first_name: firstName,
      customer_last_name: lastName,
      payment_method: paymentMethod,
      payment_information: paymentInformation,
    };

    // Send the POST request
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    // Parse and return the response data
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error adding customer:", error.message);
    throw error;
  }
};

export default addCustomer;
