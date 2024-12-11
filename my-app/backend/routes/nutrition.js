// routes/nutrition.js
// This file defines routes for managing nutrition-related data for food items.

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the database connection

// Route to get nutrition data for a specific food item
router.get("/", async (req, res) => {
  try {
    const { id } = req.query; // Extract the 'id' parameter from the query string

    // Validate that the 'id' parameter is provided
    if (!id) {
      return res.status(400).json({ error: "Food Item ID is required" });
    }

    // Query the database to fetch nutrition data for the specified food item
    const result = await pool.query(
      "SELECT * FROM Nutrition WHERE fooditem_id = $1",
      [id]
    );

    // Return the retrieved nutrition data as a JSON response
    res.json(result.rows);
  } catch (err) {
    // Log any errors to the console and respond with a 500 status code
    console.error(err);
    res.status(500).json({ error: "Failed to fetch nutrition data" });
  }
});

module.exports = router; // Export the router to use in the main application file
