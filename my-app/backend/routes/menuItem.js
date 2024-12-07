const express = require("express");
const pool = require("../db"); // Import the database connection
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      menuitem_name,
      price,
      fooditem_ids,
      inventoryitem_ids,
      in_stock,
      image_link
    } = req.body;

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

    res.status(201).json(result.rows[0]); // Send back the inserted row as JSON
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the menu item" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM MenuItems ORDER BY menuItem_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

router.delete("/:menuItem_id", async (req, res) => {
  try {
    const { menuItem_id } = req.params;
    await pool.query("DELETE FROM MenuItems WHERE menuItem_id = $1", [
      menuItem_id,
    ]);
    res.json("Deleted Menu Item Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

router.put("/update/instock", async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const updateInventory = await pool.query(
      "UPDATE menuitems SET in_stock = $1 WHERE menuitems = $2",
      [inStock, id]
    );
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;