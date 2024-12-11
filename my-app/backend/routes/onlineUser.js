/**
 * @module Online User Router
 * @fileoverview Provides endpoints for managing online user data.
 * This file defines routes for managing online users in the system.
 */

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the database connection

/**
 * @route GET /
 * @description Fetch all online users.
 * @returns {Object[]} Array of online users.
 * @throws {Error} 500 - Failed to fetch online user data.
 */
router.get('/', async (req, res) => {
  try {
    // Query the database to retrieve all online users, ordered by user ID
    const result = await pool.query(
      "SELECT * FROM onlineusers ORDER BY user_id"
    );
    // Send the retrieved rows as JSON response
    res.json(result.rows);
  } catch (error) {
    // Log any errors to the console and send a 500 status code
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch online user data" });
  }
});

/**
 * @route POST /
 * @description Add a new online user.
 * @body {Object} User data including first_name, last_name, email, role, customer_id, and employee_id.
 * @returns {Object} The added online user data.
 * @throws {Error} 500 - An error occurred while adding the online user.
 */
router.post("/", async (req, res) => {
  try {
    // Destructure user details from the request body
    const {
      first_name,
      last_name,
      email,
      role,
      customer_id,
      employee_id,
    } = req.body;

    // Query to insert a new online user into the database
    const result = await pool.query(
      "INSERT INTO onlineusers (first_name, last_name, email, role, customer_id, employee_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [first_name, last_name, email, role, customer_id, employee_id]
    );

    // Respond with the newly created user data
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Log the error and respond with a 500 status code
    console.error(error.message);
    res.status(500).json({ error: "An error occurred while adding the online user" });
  }
});

/**
 * @route GET /exists
 * @description Check if an online user exists by email.
 * @query {string} email - The email of the user to check.
 * @returns {Object} The user data if found.
 * @throws {Error} 400 - Email is required.
 * @throws {Error} 404 - User not found.
 * @throws {Error} 500 - Failed to fetch user.
 */
router.get("/exists", async (req, res) => {
  try {
    const { email } = req.query; // Extract the email from the query parameters

    // Validate if the email parameter is provided
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Query to check for a user with the specified email
    const result = await pool.query(
      "SELECT * FROM onlineusers WHERE email = $1",
      [email]
    );

    // Respond with 404 if no user is found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user data if the user exists
    res.status(200).json(result.rows[0]);
  } catch (err) {
    // Log the error and respond with a 500 status code
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Export the router to be used in the main application
module.exports = router;
