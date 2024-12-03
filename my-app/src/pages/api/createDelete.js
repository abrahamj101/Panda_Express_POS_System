const API_BASE_URL = "https://project-3-team-3-b-backend.vercel.app";

// Function to create an employee
export async function createEmployee(employeeData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create employee: ${response.statusText}`);
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
      throw new Error(`Failed to delete employee: ${response.statusText}`);
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
  try {
    const response = await fetch(`${API_BASE_URL}/api/foodItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodItemData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create food item: ${response.statusText}`);
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
      throw new Error(`Failed to delete food item: ${response.statusText}`);
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
  try {
    const response = await fetch(`${API_BASE_URL}/api/menuItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menuItemData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create menu item: ${response.statusText}`);
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
      throw new Error(`Failed to delete menu item: ${response.statusText}`);
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
    const response = await fetch(`${API_BASE_URL}/api/inventoryItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inventoryItemData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create inventory item: ${response.statusText}`);
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
      throw new Error(`Failed to delete inventory item: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    throw error;
  }
}
