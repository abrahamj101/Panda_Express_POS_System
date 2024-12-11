/**
 * @module Sales Report Routes
 * @fileoverview Provides an endpoint for fetching total sales reports within a specified date range.
 */
const express = require('express');
const db = require('../db'); // Adjust this path if needed
const router = express.Router();

/**
 * @route GET /sales-report
 * @description Fetches a total sales report for a given date range.
 * @query {string} startDate - The start date of the range (ISO string).
 * @query {string} endDate - The end date of the range (ISO string).
 * @returns {Object[]} Array of objects containing order date and total sales for each date.
 * @throws {Error} 400 - Missing start or end date in the request.
 * @throws {Error} 500 - Error querying the database.
 */
router.get('/sales-report', async (req, res) => {
  const { startDate, endDate } = req.query;

  // Validate start and end dates
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Start and end dates are required.' });
  }

  // Set the start and end times of the day
  const formattedStartDate = new Date(startDate).setHours(0, 0, 0, 0);
  const formattedEndDate = new Date(endDate).setHours(23, 59, 59, 999);

  const startDateISO = new Date(formattedStartDate).toISOString();
  const endDateISO = new Date(formattedEndDate).toISOString();

  const query = `
    SELECT DATE(o.ordered_time) AS order_date, 
           SUM(o.total) AS total_sales
    FROM orders o
    WHERE o.ordered_time BETWEEN $1 AND $2
    GROUP BY order_date
    ORDER BY order_date;
  `;

  try {
    const result = await db.query(query, [startDateISO, endDateISO]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching sales report:', err.message);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

module.exports = router;
