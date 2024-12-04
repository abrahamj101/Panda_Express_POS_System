// routes/report.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you have a db module for database connection

// Route to get a summary of all orders
router.get('/orders', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.order_id, o.employee_id, o.customer_id, o.menuitem_ids, o.fooditem_ids, o.total, o.tax, o.ordered_time
      FROM orders o
      ORDER BY o.ordered_time DESC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Error fetching orders');
  }
});

// Route to get a report of total sales by employee
router.get('/sales-by-employee', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.employee_id, e.employee_first_name, e.employee_last_name, SUM(o.total) AS total_sales
      FROM orders o
      JOIN employees e ON o.employee_id = e.employee_id
      GROUP BY e.employee_id
      ORDER BY total_sales DESC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sales by employee:', error);
    res.status(500).send('Error fetching sales by employee');
  }
});

module.exports = router;
