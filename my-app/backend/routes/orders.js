// routes/orders.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Route to get all orders
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT order_id, employee_id, customer_id, menuitem_ids, fooditem_ids, total, tax, ordered_time
      FROM orders
      ORDER BY ordered_time DESC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Error fetching orders');
  }
});

module.exports = router;
