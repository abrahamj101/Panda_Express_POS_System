const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming 'pool' is used for database connection

// Endpoint for X-Report
router.get('/xreport', async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Date is required' });
    }

    const query = `
        SELECT EXTRACT(HOUR FROM o.ordered_time) AS hour_of_day, 
               SUM(o.total) AS total_sales 
        FROM orders o
        WHERE DATE(o.ordered_time) = $1
        GROUP BY EXTRACT(HOUR FROM o.ordered_time)
        ORDER BY hour_of_day;
    `;

    try {
        const { rows } = await pool.query(query, [date]);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
