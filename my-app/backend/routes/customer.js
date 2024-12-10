// routes/customer.js
// This file defines routes for managing customer-related operations in the app.

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool for executing SQL queries.

// Route to get all customers
router.get('/', async (req, res) => {
  try {
    // Execute a SQL query to fetch all customers, sorted by customer ID.
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY customer_id"
    );
    // Return the result rows (customer records) as JSON.
    res.json(result.rows);
  } catch (error) {
    // Log any errors to the console and respond with a 500 status code.
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch customer data" });
  }
});

// Route to add a new customer
router.post("/", async (req, res) => {
  try {
    // Destructure customer details from the request body.
    const {
      customer_first_name,
      customer_last_name,
      payment_method,
      payment_information,
    } = req.body;

    // Execute a SQL query to insert a new customer into the database.
    // Use parameterized queries ($1, $2, etc.) to prevent SQL injection.
    const result = await pool.query(
      "INSERT INTO customers (customer_first_name, customer_last_name, payment_method, payment_information) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        customer_first_name,
        customer_last_name,
        payment_method,
        payment_information,
      ]
    );

    // Return the newly created customer record with a 201 status code.
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Log any errors to the console and respond with a 500 status code.
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding the customer" });
  }
});

module.exports = router; // Export the router to use in the main application file.
