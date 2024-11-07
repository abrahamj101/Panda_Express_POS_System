const removeMenuItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/menuItems/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete menu item");
      }
  
      return await response.json();
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };
  
  export default removeMenuItem;
  