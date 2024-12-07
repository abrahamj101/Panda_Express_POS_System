// routes/nutrition.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Route to get all nutrition data
router.get("/", async (req, res) => {
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

module.exports = router;
