const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming 'pool' is used for database connection

// Endpoint for X-Report
router.get('/xreport', async (req, res) => {
    console.log('Received request to /api/xreports/xreport');
    console.log('Query parameters:', req.query);

    const { date } = req.query;

    if (!date) {
        console.log('Date parameter is missing');
        return res.status(400).json({ message: 'Date is required' });
    }

    console.log('Date parameter:', date);
    const formattedDate = new Date(date).setHours(23, 59, 59, 999);
    const DateISO = new Date(formattedDate).toISOString();

    console.log('Formatted date for query (ISO):', DateISO);

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


module.exports = router;
