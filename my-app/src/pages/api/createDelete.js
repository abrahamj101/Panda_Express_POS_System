/**
 * API Functions for Creating and Deleting Entities
 * This module provides utility functions to create and delete employees, food items,
 * menu items, and inventory items through API requests.
 *
 * @file createDelete.js
 * @module api/createDelete
 */

const API_BASE_URL = "https://project-3-team-3-b-backend.vercel.app";

/**
 * Create an employee.
 *
 * @param {Object} employeeData - Data of the employee to be created.
 * @param {string} employeeData.name - The employee's name.
 * @param {string|number} employeeData.hours_worked - Hours worked, defaulted to 0 if invalid.
 * @param {Array<string>} employeeData.schedule - Array of time strings for the employee's schedule.
 * @returns {Promise<Object>} The created employee data.
 * @throws {Error} If the API request fails.
 */
export async function createEmployee(employeeData) {
  employeeData["hours_worked"] = employeeData["hours_worked"]
    ? parseFloat(employeeData["hours_worked"])
    : 0;

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

/**
 * Delete an employee.
 *
 * @param {number|string} employeeId - The ID of the employee to delete.
 * @returns {Promise<Object>} Result of the deletion operation.
 * @throws {Error} If the API request fails.
 */
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

/**
 * Create a food item.
 *
 * @param {Object} foodItemData - Data of the food item to be created.
 * @returns {Promise<Object>} The created food item data.
 * @throws {Error} If the API request fails.
 */
export async function createFoodItem(foodItemData) {
  const formattedData = {
    foodItem_name: foodItemData["fooditem_name"] || null,
    type: foodItemData["type"] || null,
    inventoryitem_ids: foodItemData["inventoryitem_ids"]
      ? foodItemData["inventoryitem_ids"].split(",").map(Number)
      : [],
    inventory_amounts: foodItemData["inventory_amounts"]
      ? foodItemData["inventory_amounts"].split(",").map(Number)
      : [],
    in_stock: foodItemData["in_stock"] === "true",
    seasonal: foodItemData["seasonal"]
      ? foodItemData["seasonal"].split(",").map(Number)
      : [],
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

/**
 * Delete a food item.
 *
 * @param {number|string} foodItemId - The ID of the food item to delete.
 * @returns {Promise<Object>} Result of the deletion operation.
 * @throws {Error} If the API request fails.
 */
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

/**
 * Create a menu item.
 *
 * @param {Object} menuItemData - Data of the menu item to be created.
 * @returns {Promise<Object>} The created menu item data.
 * @throws {Error} If the API request fails.
 */
export async function createMenuItem(menuItemData) {
  const formattedData = {
    menuitem_name: menuItemData.menuitem_name || null,
    price: isNaN(parseFloat(menuItemData.price))
      ? null
      : parseFloat(menuItemData.price),
    fooditem_ids:
      menuItemData.fooditem_ids && menuItemData.fooditem_ids.length > 0
        ? menuItemData.fooditem_ids.map((id) => parseInt(id, 10))
        : [],
    inventoryitem_ids:
      menuItemData.inventoryitem_ids &&
      menuItemData.inventoryitem_ids.length > 0
        ? menuItemData.inventoryitem_ids.map((id) => parseInt(id, 10))
        : [],
    in_stock: menuItemData.in_stock === "true",
    image_link: menuItemData.image_link || null,
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

/**
 * Delete a menu item.
 *
 * @param {number|string} menuItemId - The ID of the menu item to delete.
 * @returns {Promise<Object>} Result of the deletion operation.
 * @throws {Error} If the API request fails.
 */
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

/**
 * Create an inventory item.
 *
 * @param {Object} inventoryItemData - Data of the inventory item to be created.
 * @returns {Promise<Object>} The created inventory item data.
 * @throws {Error} If the API request fails.
 */
export async function createInventoryItem(inventoryItemData) {
  const formattedData = {
    inventoryitem_name: inventoryItemData.inventoryitem_name || null,
    quantity: parseInt(inventoryItemData.quantity, 10) || 0,
    last_restocked: isNaN(Date.parse(inventoryItemData.last_restocked))
      ? null
      : new Date(inventoryItemData.last_restocked).toISOString(),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/inventoryItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
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

/**
 * Delete an inventory item.
 *
 * @param {number|string} inventoryItemId - The ID of the inventory item to delete.
 * @returns {Promise<Object>} Result of the deletion operation.
 * @throws {Error} If the API request fails.
 */
export async function deleteInventoryItem(inventoryItemId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/inventoryItems/${inventoryItemId}`,
      { method: "DELETE" }
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
