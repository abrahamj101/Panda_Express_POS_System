/**
 * @module X Report Route
 * @fileoverview Provides an endpoint for fetching an hourly breakdown of total sales for a specific date.
 */
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming 'pool' is used for database connection

/**
 * @route GET /xreport
 * @description Fetches an X report that summarizes total sales by hour of the day for the specified date.
 * @query {string} date - The date for which the report is requested (in ISO format).
 * @returns {Object[]} Array of objects with the hour of the day and total sales.
 * @throws {Error} 400 - Missing date parameter in the request.
 * @throws {Error} 404 - No data found for the given date.
 * @throws {Error} 500 - Error querying the database.
 */
router.get('/xreport', async (req, res) => {
    console.log('Received request to /api/xreports/xreport');
    console.log('Query parameters:', req.query);

    const { date } = req.query;

    // Validate if the date parameter is provided
    if (!date) {
        console.log('Date parameter is missing');
        return res.status(400).json({ message: 'Date is required' });
    }

    console.log('Date parameter:', date);

    // Format the date to include the correct end time (23:59:59)
    const formattedDate = new Date(date).setHours(23, 59, 59, 999);
    const DateISO = new Date(formattedDate).toISOString();

    console.log('Formatted date for query (ISO):', DateISO);

    // Query to get total sales by hour for the given date
    const query = `
        SELECT EXTRACT(HOUR FROM o.ordered_time) AS hour_of_day, 
               SUM(o.total) AS total_sales 
        FROM orders o
        WHERE DATE(o.ordered_time) = $1
        GROUP BY EXTRACT(HOUR FROM o.ordered_time)
        ORDER BY hour_of_day;
    `;

    try {
        console.log('Executing query...');
        const { rows } = await pool.query(query, [DateISO]);
        console.log('Query result:', rows);

        // Check if the query returned any data
        if (rows.length === 0) {
            console.log('No data found for the given date');
            return res.status(404).json({ message: 'No data found for the given date' });
        }

        // Set the Content-Type header to JSON (usually optional)
        res.setHeader('Content-Type', 'application/json');
        console.log('Sending JSON response');
        res.json(rows);
    } catch (err) {
        console.error('Error executing query:', err.message);
        console.error('Stack trace:', err.stack);
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the router
module.exports = router;
