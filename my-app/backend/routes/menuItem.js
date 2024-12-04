const express = require("express");
const pool = require("../db"); // Import the database connection
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { menuItem_id, menuItem_name, price, foodItem_ids, inventoryItem_ids, in_stock } = req.body;
    const result = await pool.query(
      "INSERT INTO MenuItems (menuItem_id, menuItem_name, price, foodItem_ids, inventoryItem_ids, in_stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [menuItem_id, menuItem_name, price, foodItem_ids, inventoryItem_ids, in_stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the menu item" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM MenuItems ORDER BY menuItem_id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

router.delete("/:menuItem_id", async (req, res) => {
  try {
    const { menuItem_id } = req.params;
    await pool.query("DELETE FROM MenuItems WHERE menuItem_id = $1", [menuItem_id]);
    res.json("Deleted Menu Item Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

module.exports = router;
