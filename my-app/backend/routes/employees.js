// routes/employees.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Route to get all employees
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY employee_id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Error fetching employees');
  }
});

module.exports = router;
