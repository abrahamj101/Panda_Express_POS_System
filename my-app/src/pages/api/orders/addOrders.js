const addOrders = async (menuItems, total, tax) => {
    try {
      // Build the request body
      const body = {
        employee_id: 0,
        customer_id: 0,
        menuitem_ids: menuItems.map(item => item.getMenuItemId()),
        total,
        tax,
        ordered_time: new Date().toISOString(),
        fooditem_ids: JSON.stringify(menuItems.map(item => item.getFoodItemIds())),
      };
  
      // Send the POST request
      const response = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
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
  
  export default addOrders;
  