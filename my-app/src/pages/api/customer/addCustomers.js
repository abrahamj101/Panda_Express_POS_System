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
  