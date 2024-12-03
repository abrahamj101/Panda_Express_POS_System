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
    await pool.query("DELETE FROM MenuItems WHERE menuItem_id = $1", [
      menuItem_id,
    ]);
    res.json("Deleted Menu Item Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

/**
 *  Food Items
 */

// Adds a Food Item
app.post("/api/foodItems", async (req, res) => {
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

// Deletes a Food Item by id
app.delete("/api/foodItems/:foodItem_id", async (req, res) => {
  try {
    const { foodItem_id } = req.params;
    await pool.query("DELETE FROM FoodItems WHERE foodItem_id = $1", [
      foodItem_id,
    ]);
    res.json("Deleted Food Item Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete food item" });
  }
});

/**
 *  Inventory Items
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

// Adds an Inventory Item
app.post("/api/inventoryItems", async (req, res) => {
  try {
    const { inventoryitem_name, quantity, last_restocked } = req.body;

    const result = await pool.query(
      "INSERT INTO InventoryItems (item_name, quantity, last_restocked) VALUES ($1,$2,$3) RETURNING *",
      [inventoryitem_name, quantity, last_restocked]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the inventory item" });
  }
});

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

// Deletes an Inventory Item by id
app.delete("/api/inventoryItems/:inventoryItem_id", async (req, res) => {
  try {
    const { inventoryItem_id } = req.params;
    await pool.query("DELETE FROM InventoryItems WHERE inventoryItem_id = $1", [
      inventoryItem_id,
    ]);
    res.json("Deleted Inventory Item Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete inventory item" });
  }
});

/**
 *  Employees
 */

// Adds an Employee
app.post("/api/employees", async (req, res) => {
  try {
    const { employee_first_name, employee_last_name, hours_worked, schedule } = req.body;
    
    const result = await pool.query(
      "INSERT INTO Employees (employee_first_name, employee_last_name, hours_worked, schedule) VALUES ($1, $2, $3, $4) RETURNING *",
      [employee_first_name, employee_last_name, hours_worked, schedule]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the employee" });
  }
});


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

// Deletes an Employee by id
app.delete("/api/employees/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params;
    const id = parseInt(employee_id, 10);

    // Check if the employee exists
    const employee = await pool.query("SELECT * FROM Employees WHERE employee_id = $1", [id]);

    if (employee.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Delete the employee
    await pool.query("DELETE FROM Employees WHERE employee_id = $1", [id]);
    res.json({ message: "Deleted Employee Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete employee" });
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
    res
      .status(500)
      .json({ error: "An error occurred while adding the order" });
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
 * Online Users
 */

// Add an online user
app.post("/api/online-users", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      role,
      customer_id,
      employee_id,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO onlineusers (first_name, last_name, email, role, customer_id, employee_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [first_name, last_name, email, role, customer_id, employee_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding the online user" });
  }
});

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
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch customer data" });
  }
});

// Add a customer
app.post("/api/customers", async (req, res) => {
  try {
    const {
      customer_first_name,
      customer_last_name,
      payment_method,
      payment_information,
    } = req.body;

    const result = await pool.query(
      "INSERT INTO customers (customer_first_name, customer_last_name, payment_method, payment_information) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        customer_first_name,
        customer_last_name,
        payment_method,
        payment_information,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding the customer" });
  }
});
