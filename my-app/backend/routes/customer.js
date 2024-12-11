/**
 * @module Customer Routes
 * @fileoverview Provides endpoints for managing customer data, including CRUD operations for customer records.
 */

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool for executing SQL queries.

/**
 * @file customer.js
 * @description Routes for handling customer-related API endpoints.
 */

/**
 * GET /api/customers
 * Retrieves all customers from the database.
 * 
 * @route GET /api/customers
 * @async
 * @returns {JSON} An array of customer objects.
 * @throws {500} Returns an error message if the query fails.
 */
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

/**
 * POST /api/customers
 * Adds a new customer to the database.
 * 
 * @route POST /api/customers
 * @async
 * @param {Object} req.body - The request body containing customer details.
 * @param {string} req.body.customer_first_name - The first name of the customer.
 * @param {string} req.body.customer_last_name - The last name of the customer.
 * @param {string} req.body.payment_method - The payment method of the customer.
 * @param {string} req.body.payment_information - The payment information of the customer.
 * @returns {JSON} The newly created customer object.
 * @throws {500} Returns an error message if the query fails.
 */
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
