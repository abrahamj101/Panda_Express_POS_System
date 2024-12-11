/**
 * @module Product Usage Routes
 * @fileoverview Provides an endpoint to query and retrieve product usage data.
 */

const express = require('express');
const db = require('../db'); // Adjust this path if your database module is in a different location
const router = express.Router();

/**
 * @route GET /product-usage
 * @description Fetch product usage data within a specified date range.
 * @query {string} startDate - The start date for the data range (ISO string).
 * @query {string} endDate - The end date for the data range (ISO string).
 * @returns {Object[]} Array of product usage data, including inventory item name and total orders.
 * @throws {Error} 400 - Start and end dates are required.
 * @throws {Error} 500 - Internal server error during database query.
 */
router.get('/product-usage', async (req, res) => {
  const { startDate, endDate } = req.query;

  // Check if startDate and endDate are provided
  if (!startDate || !endDate) {
    console.log('Start or end date is missing');
    return res.status(400).json({ error: 'Start and end dates are required.' });
  }

  // Format dates to include the time part and set the correct time range
  const formattedStartDate = new Date(startDate).setHours(0, 0, 0, 0); // Set to start of the day
  const formattedEndDate = new Date(endDate).setHours(23, 59, 59, 999); // Set to end of the day

  // Convert formatted dates to ISO strings for database query
  const startDateISO = new Date(formattedStartDate).toISOString();
  const endDateISO = new Date(formattedEndDate).toISOString();

  const query = `
    SELECT ii.inventoryItem_name, COUNT(o.order_id) AS total_orders
    FROM orders o
    JOIN UNNEST(o.menuitem_ids) WITH ORDINALITY AS oi(menuitem_id, ord_m) ON TRUE
    JOIN menuitems mi ON mi.menuitem_id = oi.menuitem_id
    JOIN UNNEST(mi.inventoryitem_ids) WITH ORDINALITY AS t(inventoryItem_id, ord_i) ON TRUE
    JOIN inventoryitems ii ON ii.inventoryitem_id = t.inventoryItem_id
    WHERE o.ordered_time BETWEEN $1 AND $2
    GROUP BY ii.inventoryItem_name
    ORDER BY total_orders DESC;
  `;

  try {
    console.log(`Querying database with startDate: ${startDateISO}, endDate: ${endDateISO}`);
    const result = await db.query(query, [startDateISO, endDateISO]);
    console.log('Query result:', result.rows);

    // Send the query results as a JSON response
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying product usage:', err);
    res.status(500).json({ error: 'Internal server error.', details: err.message });
  }
});

module.exports = router;
