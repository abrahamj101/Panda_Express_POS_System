const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.post("/api/menuItems", async (req, res) => {
  try {
    // const { menuItem_name, price, foodItem_ids, inventoryItem_ids, in_stock } = req.body;

    // const result = await pool.query(
    //   "INSERT INTO MenuItems (menuItem_name, price, foodItem_ids, inventoryitem_ids, in_stock) VALUES($1, $2, $3, $4, $5) RETURNING *",
    //   [menuItem_name, price, foodItem_ids, inventoryItem_ids, in_stock]
    // );

    const { menuItem_id, menuItem_name, price, foodItem_ids, inventoryItem_ids, in_stock } = req.body;

    const result = await pool.query(
      "INSERT INTO MenuItems (menuItem_id, menuItem_name, price, foodItem_ids, inventoryitem_ids, in_stock) VALUES ($1,$2,$3,$4,$5,$6)",
      [menuItem_id, menuItem_name, price, foodItem_ids, inventoryItem_ids, in_stock]
    );

    res.status(201).json(result.rows[0]); // Send back the inserted row as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the menu item" });
  }
});


app.get("/api/menuItems", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM MenuItems ORDER BY menuItem_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch menu items"})
  }
})

app.delete("/api/menuItems/:menuItem_id", async (req, res) => {
  try {
    const { menuItem_id } = req.params;
    const deleteMenuItem = await pool.query(
      "DELETE FROM MenuItems WHERE menuItem_id = $1",
      [menuItem_id]
    )
    res.json("Deleted Menu Item Successfully")
  } catch (error) {
    console.error(error)
  }
})

app.get("/api/foodItems", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM FoodItems ORDER BY foodItem_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch food items"})
  }
})

app.put("/api/foodItems/:id", async (req, res) => {
  try {
    const { id } = req.params;

    
  } catch (error) {
    console.error(error)
  }
})

app.delete("/api/foodItems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFoodItem = await pool.query(
      "DELETE FROM FoodItems WHERE foodItem_id = $1",
      [id]
    )
    res.json("Deleted Food Item Successfully")
  } catch (error) {
    console.error(error)
  }
})