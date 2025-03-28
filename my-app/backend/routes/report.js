/**
 * @module Report Routes
 * @fileoverview Provides endpoints to retrieve various reports including orders, sales by employee, and product usage.
 */

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you have a db module for database connection

/**
 * @route GET /orders
 * @description Fetches a summary of all orders.
 * @returns {Object[]} Array of orders with details such as order ID, employee ID, customer ID, etc.
 * @throws {Error} 500 - Error fetching orders.
 */
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

/**
 * @route GET /sales-by-employee
 * @description Fetches a report of total sales by employee.
 * @returns {Object[]} Array of employee sales data with employee ID, name, and total sales.
 * @throws {Error} 500 - Error fetching sales by employee.
 */
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

/**
 * @route GET /product-usage
 * @description Fetches a product usage report for a given date range.
 * @query {string} startDate - The start date of the range (ISO string).
 * @query {string} endDate - The end date of the range (ISO string).
 * @returns {Object[]} Array of product usage data, including inventory item name and total order count.
 * @throws {Error} 500 - Error fetching product usage report.
 */
router.get('/product-usage', async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      if (!startDate || !endDate) {
        console.log('Start or end date is missing');
        return res.status(400).json({ error: 'Start and end dates are required.' });
      }
      
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
