const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you are using a database pool

/**
 * GET X Report Payments for a specific date
 */
router.get('/xreport-payments', async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ error: 'Date is required in the query parameter' });
    }

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
        const { rows } = await pool.query(query, [DateISO]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching X Report Payments:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
