const addInventoryItems = async (newItem) => {
    try {
      const response = await fetch(
        "https://project-3-team-3-b-backend.vercel.app/api/inventoryItems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const jsonData = await response.json();
      return jsonData;
    } catch (err) {
      console.error("Error adding inventory item:", err.message);
      throw err;
    }
  };
  
  export default addInventoryItems;
  