const getOrders = async (id) => {
    try {
      const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/orders/customer?id=${id}`);
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
  
  export default getOrders;
  