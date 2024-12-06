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

// Endpoint for fetching product usage report
router.get('/product-usage', async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      // const query = `
      //   SELECT ii.inventoryItem_name, SUM(t.inventory_amount) AS total_used
      //   FROM orders o
      //   JOIN UNNEST(o.menuitem_ids) WITH ORDINALITY AS oi(menuitem_id, ord_m) ON TRUE
      //   JOIN menuitems mi ON mi.menuitem_id = oi.menuitem_id
      //   JOIN UNNEST(mi.fooditem_ids) WITH ORDINALITY AS fo(fooditem_id, ord_f) ON TRUE
      //   JOIN fooditems fi ON fi.fooditem_id = fo.fooditem_id
      //   JOIN UNNEST(fi.inventoryitem_ids, fi.inventory_amounts) WITH ORDINALITY AS t(inventoryItem_id, inventory_amount, ord_i) ON TRUE
      //   JOIN inventoryitems ii ON ii.inventoryitem_id = t.inventoryItem_id
      //   WHERE o.ordered_time BETWEEN $1 AND $2
      //   GROUP BY ii.inventoryItem_name
      //   ORDER BY total_used DESC;
      // `;
      const query = `
        SELECT ii.inventoryItem_name, COUNT(o.order_id) AS total_orders
        FROM orders o
        JOIN UNNEST(o.menuitem_ids) WITH ORDINALITY AS oi(menuitem_id, ord_m) ON TRUE
        JOIN menuitems mi ON mi.menuitem_id = oi.menuitem_id
        JOIN UNNEST(mi.inventoryitem_ids) WITH ORDINALITY AS t(inventoryItem_id, ord_i) ON TRUE
        JOIN inventoryitems ii ON ii.inventoryitem_id = t.inventoryItem_id
        WHERE o.ordered_time BETWEEN ? AND ?
        GROUP BY ii.inventoryItem_name
        ORDER BY total_orders DESC;
        `;
  
      const result = await pool.query(query, [startDate, endDate]);
      res.json(result.rows);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch product usage' });
    }
  });
  

module.exports = router;
