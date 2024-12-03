// index.js

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

/**
 *  Inventory Items
 */

// Gets Inventory Items
app.get("/api/inventoryItems", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM InventoryItems ORDER BY inventoryItem_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch inventory items" });
  }
});

/**
 *  Employees
 */

// Gets all employees
app.get("/api/employees", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY employee_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employee data" });
  }
});

/**
 *  Orders
 */

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
 * Nutrition
 */

app.get("/api/nutrition", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Food Item ID is required" });
    }

    const result = await pool.query(
      "SELECT * FROM Nutrition WHERE fooditem_id = $1",
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch nutrition data" });
  }
});

/**
 * Customers
 */

// Get all customers
app.get("/api/customers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY customer_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customer data" });
  }
});

/**
 * Online Users
 */

app.get("/api/online-users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM onlineusers ORDER BY user_id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch online user data" });
  }
});

app.get("/api/online-users/exists", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const result = await pool.query(
      "SELECT * FROM onlineusers WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});
