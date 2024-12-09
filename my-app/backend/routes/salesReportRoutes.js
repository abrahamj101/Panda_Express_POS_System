// myapp/backend/routes/salesReportRoutes.js
const express = require('express');
const db = require('../db'); // Adjust this path if needed
const router = express.Router();

// Route for total sales report
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
