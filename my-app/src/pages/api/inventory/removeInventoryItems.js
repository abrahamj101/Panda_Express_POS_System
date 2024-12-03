const removeInventoryItem = async (id) => {
    try {
      const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/inventoryItems/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete inventory item");
      }
      return true;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };
  
  export default removeInventoryItem;
  