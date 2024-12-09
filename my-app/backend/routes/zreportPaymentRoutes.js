const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you are using a database pool

/**
 * GET Z Report Payments for a specific date
 */
router.get('/zreport-payments', async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ error: 'Date is required in the query parameter' });
    }

    try {
        // Retrieve the Z Report data
        const selectQuery = `
            SELECT EXTRACT(HOUR FROM o.ordered_time) AS hour_of_day,
                   SUM(o.total) AS total_sales
            FROM Orders o
            WHERE DATE(o.ordered_time) = $1
            GROUP BY EXTRACT(HOUR FROM o.ordered_time)
            ORDER BY hour_of_day
        `;

        const { rows: zReportData } = await pool.query(selectQuery, [date]);

        // Reset the totals
        const updateQuery = `
            UPDATE Orders
            SET total = 0
            WHERE DATE(ordered_time) = $1
        `;
        await pool.query(updateQuery, [date]);

        res.status(200).json(zReportData);
    } catch (error) {
        console.error('Error fetching Z Report Payments:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
