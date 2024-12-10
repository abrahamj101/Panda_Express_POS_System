// routes/onlineUser.js
// This file defines routes for managing online users in the system.

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the database connection

// Route to fetch all online users
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

// Route to add a new online user
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

// Route to check if a user exists based on their email
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
