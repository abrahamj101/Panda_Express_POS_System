/**
 * @module Menu Items Router
 * @fileoverview Provides endpoints for CRUD operations and managing menu items.
 */

const express = require("express");
const pool = require("../db"); // Import the database connection
const router = express.Router(); // Create an instance of the Express router

/**
 * @route POST /
 * @description Add a new menu item to the database.
 * @body {string} menuitem_name - Name of the menu item.
 * @body {number} price - Price of the menu item.
 * @body {Array} fooditem_ids - Array of associated food item IDs.
 * @body {Array} inventoryitem_ids - Array of associated inventory item IDs.
 * @body {boolean} in_stock - Whether the menu item is in stock.
 * @body {string} image_link - URL link to the menu item's image.
 * @returns {Object} Newly created menu item.
 * @throws {Error} 500 - Failed to add the menu item.
 */
router.post("/", async (req, res) => {
  try {
    // Destructure menu item details from the request body
    const {
      menuitem_name,
      price,
      fooditem_ids,
      inventoryitem_ids,
      in_stock,
      image_link
    } = req.body;

    // Insert a new menu item into the database and return the inserted row
    const result = await pool.query(
      "INSERT INTO MenuItems (menuitem_name, price, fooditem_ids, inventoryitem_ids, in_stock, image_link) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [
        menuitem_name,
        price,
        fooditem_ids,
        inventoryitem_ids,
        in_stock,
        image_link
      ]
    );

    res.status(201).json(result.rows[0]); // Respond with the newly created menu item
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: "An error occurred while adding the menu item" });
  }
});

/**
 * @route GET /
 * @description Fetch all menu items, ordered by their ID.
 * @returns {Object[]} Array of menu items.
 * @throws {Error} 500 - Failed to fetch menu items.
 */
router.get("/", async (req, res) => {
  try {
    // Query the database to retrieve all menu items, ordered by menuItem_id
    const result = await pool.query(
      "SELECT * FROM MenuItems ORDER BY menuItem_id"
    );
    res.json(result.rows); // Send the retrieved rows as JSON response
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

/**
 * @route DELETE /:menuItem_id
 * @description Delete a menu item by its ID.
 * @param {string} menuItem_id - ID of the menu item to delete.
 * @returns {string} Success message.
 * @throws {Error} 500 - Failed to delete menu item.
 */
router.delete("/:menuItem_id", async (req, res) => {
  try {
    const { menuItem_id } = req.params; // Extract menuItem_id from the request parameters

    // Delete the specified menu item from the database
    await pool.query("DELETE FROM MenuItems WHERE menuItem_id = $1", [menuItem_id]);

    res.json("Deleted Menu Item Successfully"); // Respond with a success message
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

/**
 * @route PUT /update/instock
 * @description Update the stock status of a menu item.
 * @body {string} id - ID of the menu item to update.
 * @body {boolean} inStock - New stock status of the menu item.
 * @returns {string} Success message.
 * @throws {Error} 500 - Failed to update stock status.
 */
router.put("/update/instock", async (req, res) => {
  try {
    console.log("update instock "); // Log update operation for debugging

    const { id, inStock } = req.body; // Extract the menu item ID and stock status from the request body

    // Update the 'in_stock' column for the specified menu item
    const updateInventory = await pool.query(
      "UPDATE menuitems SET in_stock = $1 WHERE menuitem_id = $2",
      [inStock, id]
    );

    res.json({ message: "Menu item stock status updated successfully" }); // Respond with success message
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ error: "Failed to update menu item stock status" });
  }
});

// Export the router to be used in the main application
module.exports = router;
