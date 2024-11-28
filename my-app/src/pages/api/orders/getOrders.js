const getOrders = async (page) => {
  try {
    const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/orders?page=${page}`);
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
