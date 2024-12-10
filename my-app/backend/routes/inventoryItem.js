const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection

// Endpoint to fetch all inventory items
router.get("/", async (req, res) => {
  try {
    // Query to fetch all inventory items, ordered by inventoryItem_id
    const result = await pool.query(
      "SELECT * FROM InventoryItems ORDER BY inventoryItem_id"
    );
    // Send the result rows as JSON response
    res.json(result.rows);
  } catch (err) {
    // Log any errors and send a 500 status code with an error message
    console.error(err);
    res.status(500).json({ error: "Failed to fetch inventory items" });
  }
});

// Endpoint to fetch a single inventory item by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Extract the item ID from the request parameters
  try {
    // Query to fetch a specific inventory item based on ID
    const result = await pool.query("SELECT * FROM inventoryitems WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Send the inventory item data if found
    } else {
      res.status(404).json({ error: "Inventory item not found" }); // Handle item not found
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch inventory item" });
  }
});

// Endpoint to add a new inventory item
router.post("/", async (req, res) => {
  try {
    // Destructure inventory item details from the request body
    const { inventoryitem_name, quantity, last_restocked } = req.body;

    // Query to insert a new inventory item into the database
    const result = await pool.query(
      "INSERT INTO InventoryItems (inventoryitem_name, quantity, last_restocked) VALUES ($1,$2,$3) RETURNING *",
      [inventoryitem_name, quantity, last_restocked]
    );

    // Send the newly created inventory item as the response
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the inventory item" });
  }
});

// Endpoint to update an inventory item by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params; // Extract the item ID from the request parameters
  const { name, quantity, price } = req.body; // Extract updated values from the request body
  try {
    // Query to update the specific inventory item with new values
    const result = await pool.query(
      "UPDATE inventoryitems SET name = $1, quantity = $2, price = $3 WHERE id = $4 RETURNING *",
      [name, quantity, price, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Send the updated inventory item
    } else {
      res.status(404).json({ error: "Inventory item not found" }); // Handle item not found
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to update inventory item" });
  }
});

// Endpoint to delete an inventory item by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the item ID from the request parameters
    // Query to delete the specified inventory item from the database
    await pool.query("DELETE FROM InventoryItems WHERE inventoryItem_id = $1", [id]);
    res.json("Deleted Inventory Item Successfully"); // Send success response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete inventory item" });
  }
});

// Endpoint to update inventory item quantity after orders
router.put("/update/quantity/orders", async (req, res) => {
  try {
    const { quantity, id } = req.body; // Extract quantity and item ID from the request body
    // Query to decrement the quantity of the specified inventory item
    const updateInventory = await pool.query(
      "UPDATE inventoryitems SET quantity = quantity - $1 WHERE inventoryItem_id = $2",
      [quantity, id]
    );
    res.json("Inventory item quantity updated"); // Send success message
  } catch (err) {
    console.error(err); // Log error
    res.status(500).json({ error: "Failed to update inventory quantity" });
  }
});

// Export the router to be used in the main application
module.exports = router;
