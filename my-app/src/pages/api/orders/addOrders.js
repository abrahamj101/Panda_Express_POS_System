const addOrders = async (menuItems, total, tax) => {
  try {
    // Build the request body
    const now = new Date();

    // Get the components of the date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const millisecond = String(now.getMilliseconds()).padStart(3, '0');

    // To simulate microseconds, we can append some random digits (e.g., add the first 3 digits of milliseconds)
    const microsecond = String(Math.floor(Math.random() * 1000)).padStart(3, '0'); // Simulated microseconds

    // Format the date as "YYYY-MM-DD HH:mm:ss.mmmuuu"
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}${microsecond}`;

    console.log(formattedDate);

    const body = {
      employee_id: 0,
      customer_id: 0,
      menuitem_ids: menuItems.map(item => item.getMenuItemId()),
      total,
      tax,
      ordered_time: formattedDate,
      fooditem_ids: JSON.stringify(menuItems.map(item => item.getFoodItemIds())),
    };

    // Send the POST request
    const response = await fetch("https://project-3-team-3-b-backend.vercel.app/api/orders", {
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
