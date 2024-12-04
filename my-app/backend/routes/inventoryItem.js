const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection

// Endpoint to fetch all inventory items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventoryitems");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch inventory items" });
  }
});

// Endpoint to fetch a single inventory item by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM inventoryitems WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Inventory item not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch inventory item" });
  }
});

// Endpoint to add a new inventory item
router.post("/", async (req, res) => {
  const { name, quantity, price } = req.body; // Example fields
  try {
    const result = await pool.query(
      "INSERT INTO inventoryitems (name, quantity, price) VALUES ($1, $2, $3) RETURNING *",
      [name, quantity, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create inventory item" });
  }
});

// Endpoint to update an inventory item by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  try {
    const result = await pool.query(
      "UPDATE inventoryitems SET name = $1, quantity = $2, price = $3 WHERE id = $4 RETURNING *",
      [name, quantity, price, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Inventory item not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to update inventory item" });
  }
});

// Endpoint to delete an inventory item by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM inventoryitems WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length > 0) {
      res.json({ message: "Inventory item deleted" });
    } else {
      res.status(404).json({ error: "Inventory item not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete inventory item" });
  }
});

// Export the router
module.exports = router;
