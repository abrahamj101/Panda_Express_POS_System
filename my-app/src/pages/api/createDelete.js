// my-app/src/pages/api/createDelete.js

const API_BASE_URL = "http://localhost:5001";

// Function to create an employee
export async function createEmployee(employeeData) {
  // Ensure hours_worked is a float, defaulting to 0 if invalid
  employeeData["hours_worked"] = employeeData["hours_worked"] ? parseFloat(employeeData["hours_worked"]) : 0;

  // Ensure schedule is an array of valid time strings or default to an empty array if invalid
  employeeData["schedule"] = Array.isArray(employeeData["schedule"])
    ? employeeData["schedule"]
    : [];

  try {
    const response = await fetch(`${API_BASE_URL}/api/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to create employee: ${response.statusText}`
      );
    }

    const newEmployee = await response.json();
    return newEmployee;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}


// Function to delete an employee
export async function deleteEmployee(employeeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to delete employee: ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
}

// Function to create a food item
export async function createFoodItem(foodItemData) {
  // Formatting the foodItemData
  const formattedData = {
    foodItem_name: foodItemData["fooditem_name"] || null,
    type: foodItemData["type"] || null,
    inventoryitem_ids: foodItemData["inventoryitem_ids"] ? foodItemData["inventoryitem_ids"].split(',').map(Number) : [], 
    inventory_amounts: foodItemData["inventory_amounts"] ? foodItemData[3].split(',').map(Number) : [], 
    in_stock: foodItemData["in_stock"] === "true",
    seasonal: foodItemData["seasonal"] ? foodItemData["seasonal"].split(',').map(Number) : [], 
    image_link: foodItemData["image_link"] || null,
    premium: foodItemData["premium"] === "true",
    restriction: foodItemData["restriction"] || null,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/foodItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to create food item: ${response.statusText}`
      );
    }

    const newFoodItem = await response.json();
    return newFoodItem;
  } catch (error) {
    console.error("Error creating food item:", error);
    throw error;
  }
}


// Function to delete a food item
export async function deleteFoodItem(foodItemId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/foodItems/${foodItemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to delete food item: ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting food item:", error);
    throw error;
  }
}

// Function to create a menu item
export async function createMenuItem(menuItemData) {
  // Formatting the menuItemData
  const formattedData = {
    menuitem_name: menuItemData.menuitem_name || null, // Use null if the value is an empty string
    price: isNaN(parseFloat(menuItemData.price)) ? null : parseFloat(menuItemData.price), // Convert to number or null if invalid
    fooditem_ids: menuItemData.fooditem_ids && menuItemData.fooditem_ids.length > 0
      ? menuItemData.fooditem_ids.map(id => parseInt(id, 10)) // Ensure integers
      : [], // Default to empty array if invalid
    inventoryitem_ids: menuItemData.inventoryitem_ids && menuItemData.inventoryitem_ids.length > 0
      ? menuItemData.inventoryitem_ids.map(id => parseInt(id, 10)) // Ensure integers
      : [], // Default to empty array if invalid
    in_stock: menuItemData.in_stock === "true", // Convert to boolean
    image_link: menuItemData.image_link || null, // Use null if the value is an empty string
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/menuItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to create menu item: ${response.statusText}`
      );
    }

    const newMenuItem = await response.json();
    return newMenuItem;
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw error;
  }
}


// Function to delete a menu item
export async function deleteMenuItem(menuItemId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/menuItems/${menuItemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to delete menu item: ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
}

// Function to create an inventory item
export async function createInventoryItem(inventoryItemData) {
  try {
    console.log(inventoryItemData);
    const response = await fetch(`${API_BASE_URL}/api/inventoryItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inventoryItemData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error ||
          `Failed to create inventory item: ${response.statusText}`
      );
    }

    const newInventoryItem = await response.json();
    return newInventoryItem;
  } catch (error) {
    console.error("Error creating inventory item:", error);
    throw error;
  }
}

// Function to delete an inventory item
export async function deleteInventoryItem(inventoryItemId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/inventoryItems/${inventoryItemId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error ||
          `Failed to delete inventory item: ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    throw error;
  }
}
