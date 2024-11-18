const updateFoodItemInStock = async (id, inStock) => {
    try {
      // Build the request body
      const body = {
        id: id,
        inStock: inStock
      };
  
      // Send the POST request
      const response = await fetch(`http://localhost:5001/api/foodItems/update/instock`, {
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
  
  export default updateFoodItemInStock;
  