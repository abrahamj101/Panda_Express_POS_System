import express from 'express';
import db from './db.js'; // Ensure this path matches your project structure
const router = express.Router();

router.get('/sales-report', async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Missing startDate or endDate query parameter.' });
  }

  try {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    if (isNaN(formattedStartDate.getTime()) || isNaN(formattedEndDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format. Please provide dates in the format YYYY-MM-DD.' });
    }

    // Assuming your query retrieves sales data based on the given date range
    const query = `
      SELECT * FROM sales
      WHERE sale_date BETWEEN $1 AND $2
    `;
    const values = [formattedStartDate, formattedEndDate];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No sales data found for the specified date range.' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching sales report:', error);
    res.status(500).json({ message: 'An error occurred while fetching the sales report.' });
  }
});

export default router;
