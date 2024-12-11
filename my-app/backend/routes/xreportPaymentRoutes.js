/**
 * @module X Report Payments Route
 * @fileoverview Provides an endpoint for fetching X report payments for a specific date.
 */

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you are using a database pool

/**
 * @route GET /xreport-payments
 * @description Fetches X report data that summarizes total sales by hour of the day and payment method for a given date.
 * @query {string} date - The date for which the report is requested (in ISO format).
 * @returns {Object[]} Array of objects with hour of the day, total sales, and payment method.
 * @throws {Error} 400 - Missing date parameter in the request.
 * @throws {Error} 500 - Error querying the database.
 */
router.get('/xreport-payments', async (req, res) => {
    const { date } = req.query;

    // Validate if the date parameter is provided
    if (!date) {
        return res.status(400).json({ error: 'Date is required in the query parameter' });
    }

    // Format the date to include the correct end time (23:59:59)
    const formattedDate = new Date(date).setHours(23, 59, 59, 999);
    const DateISO = new Date(formattedDate).toISOString();

    const query = `
        SELECT EXTRACT(HOUR FROM o.ordered_time) AS hour_of_day,
               SUM(o.total) AS total_sales,
               c.payment_method
        FROM Orders o
        JOIN Customers c ON o.customer_id = c.customer_id
        WHERE DATE(o.ordered_time) = $1
        GROUP BY EXTRACT(HOUR FROM o.ordered_time), c.payment_method
        ORDER BY hour_of_day, total_sales DESC
    `;

    try {
        // Execute the query and return the result as JSON
        const { rows } = await pool.query(query, [DateISO]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching X Report Payments:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router
module.exports = router;
