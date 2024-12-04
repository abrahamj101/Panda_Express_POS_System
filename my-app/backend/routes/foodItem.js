const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection

// Endpoint to fetch all food items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fooditems");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch food items" });
  }
});

// Endpoint to fetch a single food item by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM fooditems WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Food item not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch food item" });
  }
});

// Endpoint to add a new food item
router.post("/", async (req, res) => {
  const { name, description, price } = req.body; // Example fields
  try {
    const result = await pool.query(
      "INSERT INTO fooditems (name, description, price) VALUES ($1, $2, $3) RETURNING *",
      [name, description, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create food item" });
  }
});

// Endpoint to update a food item by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const result = await pool.query(
      "UPDATE fooditems SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *",
      [name, description, price, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
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
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM fooditems WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length > 0) {
      res.json({ message: "Food item deleted" });
    } else {
      res.status(404).json({ error: "Food item not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete food item" });
  }
});

// Export the router
module.exports = router;
