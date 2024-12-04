// routes/customer.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Route to get all customers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY customer_id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).send('Error fetching customers');
  }
});

module.exports = router;
