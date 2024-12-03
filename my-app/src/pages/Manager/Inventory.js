const addInventoryItem = async (item) => {
  try {
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/inventoryItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to add inventory item");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export default addInventoryItem;
