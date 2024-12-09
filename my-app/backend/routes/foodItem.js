const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection

// Endpoint to fetch all food items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM FoodItems ORDER BY foodItem_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
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
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM FoodItems WHERE foodItem_id = $1", [
      id,
    ]);
    res.json("Deleted Food Item Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete food item" });
  }
});

router.put("/update/instock", async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const updateInventory = await pool.query(
      "UPDATE fooditems SET in_stock = $1 WHERE fooditem_id = $2",
      [inStock, id]
    );
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
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

    const result = await pool.query(
      "INSERT INTO FoodItems (fooditem_name, type, inventoryitem_ids, inventory_amounts, in_stock, seasonal, image_link, premium, restriction) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [foodItem_name,
        type,
        inventoryitem_ids,
        inventory_amounts,
        in_stock,
        seasonal,
        image_link,
        premium,
        restriction,]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the food item" });
  }
});
// Export the router
module.exports = router;
