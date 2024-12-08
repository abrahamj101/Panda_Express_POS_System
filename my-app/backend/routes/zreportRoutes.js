const express = require("express");
const router = express.Router();
const pool = require("../db"); // Assuming you're using the same database connection as X Reports

// Fetch Z Report data
router.get("/zreport", async (req, res) => {
    try {
        const { date } = req.query;

        // Log the received date to the console
        console.log("Request received with date:", date);

        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }

        // Ensure the date format is consistent
        const formattedDate = new Date(date).toISOString();

        // SQL query for Z Reports
        const query = `
            SELECT
                EXTRACT(HOUR FROM ordered_time) AS hour_of_day,
                SUM(total) AS total_sales
            FROM orders
            WHERE DATE(ordered_time) = $1
            GROUP BY hour_of_day
            ORDER BY hour_of_day;
        `;

        const updateQuery = `
            UPDATE orders
            SET total = 0
            WHERE DATE(ordered_time) = $1;
        `;

        // Execute the main query
        const result = await pool.query(query, [formattedDate]);

        // Reset total sales for the specified date
        await pool.query(updateQuery, [formattedDate]);

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching Z Report:", err);
        res.status(500).json({ error: "An error occurred while generating the Z Report" });
    }
});

module.exports = router;
