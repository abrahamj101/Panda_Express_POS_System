/**
 * @module Z Report Route
 * @fileoverview Endpoint for fetching a Z report that summarizes total sales by hour of the day for a given date and resets the totals in the database.
 */

const express = require("express");
const router = express.Router();
const pool = require("../db"); // Assuming you're using the same database connection as X Reports

/**
 * @route GET /zreport
 * @description Retrieves total sales by hour for a given date and resets the total sales for that date in the database.
 * @query {string} date - The date for which the report is requested (in ISO format).
 * @returns {Object[]} Array of objects containing hour of the day and total sales.
 * @throws {Error} 400 - Missing date parameter in the request.
 * @throws {Error} 500 - Error querying the database or resetting totals.
 */
router.get("/zreport", async (req, res) => {
    try {
        const { date } = req.query;

        // Log the received date to the console
        console.log("Request received with date:", date);

        // Validate if the date parameter is provided
        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }

        // Ensure the date format is consistent
        const formattedDate = new Date(date).toISOString();

        // Log for SQL query preparation
        console.log("SQL Query being executed:", `
            SELECT
                EXTRACT(HOUR FROM ordered_time) AS hour_of_day,
                SUM(total) AS total_sales
            FROM orders
            WHERE DATE(ordered_time) = $1
            GROUP BY hour_of_day
            ORDER BY hour_of_day;
        `);

        // Main query to get Z Report data
        const query = `
            SELECT
                EXTRACT(HOUR FROM ordered_time) AS hour_of_day,
                SUM(total) AS total_sales
            FROM orders
            WHERE DATE(ordered_time) = $1
            GROUP BY hour_of_day
            ORDER BY hour_of_day;
        `;

        // Query to reset total sales in the 'Orders' table for the given date
        const updateQuery = `
            UPDATE orders
            SET total = 0
            WHERE DATE(ordered_time) = $1;
        `;

        // Log query execution start
        console.log("Executing main query...");
        const result = await pool.query(query, [formattedDate]);

        // Log after executing main query
        console.log("Main query executed successfully");

        // Log before resetting totals
        console.log("Executing update query to reset totals...");
        // Reset total sales for the specified date
        await pool.query(updateQuery, [formattedDate]);

        // Log after executing update query
        console.log("Update query executed successfully");

        // Log data being sent back to the client
        console.log("Data processed for rendering:", result.rows);

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching Z Report:", err);
        res.status(500).json({ error: "An error occurred while generating the Z Report" });
    }
});

// Export the router
module.exports = router;
