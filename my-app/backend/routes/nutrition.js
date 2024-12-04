// routes/nutrition.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Route to get all nutrition data
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM nutrition ORDER BY item_id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    res.status(500).send('Error fetching nutrition data');
  }
});

module.exports = router;
