const getInventoryItems = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/inventoryItems");
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
  
  export default getInventoryItems;
  