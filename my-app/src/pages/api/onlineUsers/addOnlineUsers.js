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
      const response = await fetch("http://localhost:5001/api/online-users", {
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
    } catch (err) {
      console.error("Error adding online user:", err.message);
      throw err;
    }
  };
  
  export default addOnlineUsers;
  