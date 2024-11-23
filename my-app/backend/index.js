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

/**
 *  Menu Items
 */

// Adds a Menu Item
app.post("/api/menuItems", async (req, res) => {
  try {
    const {
      menuItem_id,
      menuItem_name,
      price,
      foodItem_ids,
      inventoryItem_ids,
      in_stock,
    } = req.body;

    const result = await pool.query(
      "INSERT INTO MenuItems (menuItem_id, menuItem_name, price, foodItem_ids, inventoryitem_ids, in_stock) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        menuItem_id,
        menuItem_name,
        price,
        foodItem_ids,
        inventoryItem_ids,
        in_stock,
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

// Gets the Menu Items
app.get("/api/menuItems", async (req, res) => {
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

// Deletes a given Menu Item by id
app.delete("/api/menuItems/:menuItem_id", async (req, res) => {
  try {
    const { menuItem_id } = req.params;
    const deleteMenuItem = await pool.query(
      "DELETE FROM MenuItems WHERE menuItem_id = $1",
      [menuItem_id]
    );
    res.json("Deleted Menu Item Successfully");
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/menuitems/update/instock", async (req, res) => {
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

/**
 *  Food Items
 */
// Gets Food Items
app.get("/api/foodItems", async (req, res) => {
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

app.put("/api/foodItems/update/instock", async (req, res) => {
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

app.delete("/api/foodItems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFoodItem = await pool.query(
      "DELETE FROM FoodItems WHERE foodItem_id = $1",
      [id]
    );
    res.json("Deleted Food Item Successfully");
  } catch (error) {
    console.error(error);
  }
});

/**
 *  Orders
 */

// inserting an order
app.post("/api/orders", async (req, res) => {
  try {
    const {
      employee_id,
      customer_id,
      menuitem_ids,
      total,
      tax,
      ordered_time,
      fooditem_ids,
    } = req.body;

    const result = await pool.query(
      "INSERT INTO Orders (employee_id, customer_id, menuitem_ids, total, tax, ordered_time, fooditem_ids) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        employee_id,
        customer_id,
        menuitem_ids,
        total,
        tax,
        ordered_time,
        fooditem_ids,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the order" });
  }
});

// getting the orders
app.get("/api/orders", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = 50;
    const offset = (page - 1) * pageSize; // Calculate the offset based on the page

    // Fetch the orders with pagination
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY ordered_time DESC LIMIT $1 OFFSET $2",
      [pageSize, offset]
    );

    // Get the total count of orders to determine the total number of pages
    const totalResult = await pool.query("SELECT COUNT(*) FROM orders");
    const totalOrders = totalResult.rows[0].count;
    const totalPages = Math.ceil(totalOrders / pageSize);

    res.json({
      orders: result.rows,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


// getting orders for the specific customer
app.get("/api/orders/customer", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    const result = await pool.query(
      "SELECT * FROM orders WHERE customer_id = $1 ORDER BY ordered_time DESC LIMIT 10",
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});



/**
 * Inventory Items
 */

app.put("/api/inventoryItems/update/quantity/orders", async (req, res) => {
  try {
    const { quantity, id } = req.body;
    const updateInventory = await pool.query(
      "UPDATE inventoryitems SET quantity = quantity - $1 WHERE inventoryItem_id = $2",
      [quantity, id]
    );
    res.json("Inventory item quantity updated");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch food items" });
  }
});

app.get("/api/inventoryItems", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM InventoryItems ORDER BY inventoryItem_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to inventory items" });
  }
});


/**
 * Nutrition
 */

app.get("/api/nutrition", async (req, res) => {
  try {
    // const { id } = req.query;
    // if (!id) {
    //   return res.status(400).json({ error: "Food Item ID is required" });
    // }
    const result = await pool.query(
      "SELECT * FROM Nutrition WHERE fooditem_id = 1"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});