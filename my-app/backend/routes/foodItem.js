const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection

// Endpoint to fetch all food items
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

// Endpoint to fetch a single food item by ID
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

// Endpoint to update a food item by ID
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

// Endpoint to delete a food item by ID
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

// Endpoint to update the 'in_stock' status of a food item
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

// Endpoint to add a new food item
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
