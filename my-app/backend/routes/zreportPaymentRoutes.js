/**
 * @module Z Report Payments Route
 * @fileoverview Provides an endpoint for fetching a Z report that summarizes total sales by hour for a specific date and resets the totals in the database.
 */

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you are using a database pool

/**
 * @route GET /zreport-payments
 * @description Fetches a Z report that shows total sales broken down by hour of the day for the specified date.
 *               This route also resets the total sales in the 'Orders' table for the specified date.
 * @query {string} date - The date for which the report is requested (in ISO format).
 * @returns {Object[]} Array of objects containing hour of the day and total sales.
 * @throws {Error} 400 - Missing date parameter in the request.
 * @throws {Error} 500 - Error querying the database.
 */
router.get('/zreport-payments', async (req, res) => {
    const { date } = req.query;

    // Validate if the date parameter is provided
    if (!date) {
        return res.status(400).json({ error: 'Date is required in the query parameter' });
    }

    try {
        // Query to get Z Report data: total sales by hour for the given date
        const selectQuery = `
            SELECT EXTRACT(HOUR FROM o.ordered_time) AS hour_of_day,
                   SUM(o.total) AS total_sales
            FROM Orders o
            WHERE DATE(o.ordered_time) = $1
            GROUP BY EXTRACT(HOUR FROM o.ordered_time)
            ORDER BY hour_of_day
        `;

        const { rows: zReportData } = await pool.query(selectQuery, [date]);

        // Query to reset the total sales in the 'Orders' table for the given date
        const updateQuery = `
            UPDATE Orders
            SET total = 0
            WHERE DATE(ordered_time) = $1
        `;
        await pool.query(updateQuery, [date]);

        // Respond with the Z Report data
        res.status(200).json(zReportData);
    } catch (error) {
        console.error('Error fetching Z Report Payments:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router
module.exports = router;