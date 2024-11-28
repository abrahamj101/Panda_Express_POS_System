const removeMenuItem = async (id) => {
    try {
      const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/menuItems/${id}`, {
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
  