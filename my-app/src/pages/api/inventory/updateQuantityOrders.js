const updateInventoryItemQuantity = async (id, quantity) => {
    try {
      // Build the request body
      const body = {
        quantity: quantity,
        id: id,
      };
      // Send the POST request
      const response = await fetch("http://localhost:5001/api/inventoryItems/update/quantity/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
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
  
  export default updateInventoryItemQuantity;
  