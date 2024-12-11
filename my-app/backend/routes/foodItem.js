/**
 * @module Food Item Routes
 * @fileoverview Provides endpoints for managing food item data, including CRUD operations for food item records and details.
 */

const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection

/**
 * @file fooditems.js
 * @description Routes for managing food items in the database.
 */

/**
 * GET /api/fooditems
 * Retrieves all food items from the database.
 * 
 * @route GET /api/fooditems
 * @async
 * @returns {JSON} An array of food item objects.
 * @throws {500} Returns an error message if the query fails.
 */
router.get("/", async (req, res) => {
  try {
    // Query the database to retrieve all food items, ordered by their ID.
    const result = await pool.query(
      "SELECT * FROM FoodItems ORDER BY foodItem_id"
    );
    res.json(result.rows); // Send the retrieved rows as JSON response.
  } catch (err) {
    console.error(err); // Log the error for debugging.
    res.status(500).json({ error: "Failed to fetch food items" });
  }
});

/**
 * GET /api/fooditems/:id
 * Retrieves a single food item by ID.
 * 
 * @route GET /api/fooditems/:id
 * @async
 * @param {Object} req.params - The request parameters.
 * @param {number} req.params.id - The ID of the food item.
 * @returns {JSON} The food item object if found, or an error message if not found.
 * @throws {404} Returns an error message if the food item is not found.
 * @throws {500} Returns an error message if the query fails.
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters.
  try {
    // Query the database for a specific food item based on the given ID.
    const result = await pool.query("SELECT * FROM fooditems WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Send the food item if found.
    } else {
      res.status(404).json({ error: "Food item not found" }); // Handle not found.
    }
  } catch (error) {
    console.error(error.message); // Log the error.
    res.status(500).json({ error: "Failed to fetch food item" });
  }
});

/**
 * PUT /api/fooditems/:id
 * Updates a food item by ID.
 * 
 * @route PUT /api/fooditems/:id
 * @async
 * @param {Object} req.params - The request parameters.
 * @param {number} req.params.id - The ID of the food item.
 * @param {Object} req.body - The request body containing updated food item details.
 * @param {string} req.body.name - The updated name of the food item.
 * @param {string} req.body.description - The updated description of the food item.
 * @param {number} req.body.price - The updated price of the food item.
 * @returns {JSON} The updated food item object, or an error message if not found.
 * @throws {404} Returns an error message if the food item is not found.
 * @throws {500} Returns an error message if the query fails.
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters.
  const { name, description, price } = req.body; // Destructure updated details from the request body.
  try {
    // Query to update the specified food item in the database.
    const result = await pool.query(
      "UPDATE fooditems SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *",
      [name, description, price, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Send the updated food item if found.
    } else {
      res.status(404).json({ error: "Food item not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to update food item" });
  }
});

/**
 * DELETE /api/fooditems/:id
 * Deletes a food item by ID.
 * 
 * @route DELETE /api/fooditems/:id
 * @async
 * @param {Object} req.params - The request parameters.
 * @param {number} req.params.id - The ID of the food item to delete.
 * @returns {JSON} A success message upon successful deletion.
 * @throws {500} Returns an error message if the query fails.
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters.
    // Query to delete the specified food item.
    await pool.query("DELETE FROM FoodItems WHERE foodItem_id = $1", [id]);
    res.json("Deleted Food Item Successfully"); // Send a success message.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete food item" });
  }
});

/**
 * PUT /api/fooditems/update/instock
 * Updates the stock status of a food item.
 * 
 * @route PUT /api/fooditems/update/instock
 * @async
 * @param {Object} req.body - The request body containing stock status details.
 * @param {number} req.body.id - The ID of the food item to update.
 * @param {boolean} req.body.inStock - The new stock status of the food item.
 * @throws {500} Returns an error message if the query fails.
 */
router.put("/update/instock", async (req, res) => {
  try {
    const { id, inStock } = req.body; // Extract the ID and stock status from the request body.
    // Query to update the 'in_stock' field for the specified food item.
    const updateInventory = await pool.query(
      "UPDATE fooditems SET in_stock = $1 WHERE fooditem_id = $2",
      [inStock, id]
    );
    res.json({ message: "Inventory status updated successfully" });
  } catch (error) {
    console.error(error); // Log the error.
    res.status(500).json({ error: "Failed to update inventory status" });
  }
});

/**
 * POST /api/fooditems
 * Adds a new food item to the database.
 * 
 * @route POST /api/fooditems
 * @async
 * @param {Object} req.body - The request body containing food item details.
 * @param {string} req.body.foodItem_name - The name of the food item.
 * @param {string} req.body.type - The type of the food item.
 * @param {string[]} req.body.inventoryitem_ids - IDs of inventory items used.
 * @param {number[]} req.body.inventory_amounts - Amounts of inventory items used.
 * @param {boolean} req.body.in_stock - Whether the food item is in stock.
 * @param {boolean} req.body.seasonal - Whether the food item is seasonal.
 * @param {string} req.body.image_link - Link to the food item's image.
 * @param {boolean} req.body.premium - Whether the food item is premium.
 * @param {string[]} req.body.restriction - Dietary restrictions associated.
 * @returns {JSON} The newly created food item object.
 * @throws {500} Returns an error message if the query fails.
 */
router.post("/", async (req, res) => {
  try {
    // Destructure food item details from the request body.
    const {
      foodItem_name,
      type,
      inventoryitem_ids,
      inventory_amounts,
      in_stock,
      seasonal,
      image_link,
      premium,
      restriction,
    } = req.body;

    // Query to insert a new food item into the database.
    const result = await pool.query(
      "INSERT INTO FoodItems (fooditem_name, type, inventoryitem_ids, inventory_amounts, in_stock, seasonal, image_link, premium, restriction) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        foodItem_name,
        type,
        inventoryitem_ids,
        inventory_amounts,
        in_stock,
        seasonal,
        image_link,
        premium,
        restriction,
      ]
    );

    res.status(201).json(result.rows[0]); // Send the newly created food item.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the food item" });
  }
});

// Export the router to be used in the main application file.
module.exports = router;
