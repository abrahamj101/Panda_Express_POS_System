/**
 * @module Orders Router
 * @fileoverview Provides endpoints for managing and retrieving order data.
 */

const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * @route GET /
 * @description Fetch all orders with pagination.
 * @query {number} page - The page number to fetch (default is 1).
 * @returns {Object} Paginated orders with total pages and current page.
 * @throws {Error} 500 - Failed to fetch orders.
 */
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = 50;
    const offset = (page - 1) * pageSize; // Calculate the offset based on the page

    // Fetch the orders with pagination
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY ordered_time DESC LIMIT $1 OFFSET $2",
      [pageSize, offset]
    );

    // Get the total count of orders to determine the total number of pages
    const totalResult = await pool.query("SELECT COUNT(*) FROM orders");
    const totalOrders = totalResult.rows[0].count;
    const totalPages = Math.ceil(totalOrders / pageSize);

    res.json({
      orders: result.rows,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/**
 * @route POST /
 * @description Add a new order.
 * @body {Object} Order data including employee_id, customer_id, menuitem_ids, total, tax, ordered_time, and fooditem_ids.
 * @returns {Object} The added order data.
 * @throws {Error} 500 - An error occurred while adding the order.
 */
router.post("/", async (req, res) => {
  try {
    const {
      employee_id,
      customer_id,
      menuitem_ids,
      total,
      tax,
      ordered_time,
      fooditem_ids,
    } = req.body;

    const result = await pool.query(
      "INSERT INTO Orders (employee_id, customer_id, menuitem_ids, total, tax, ordered_time, fooditem_ids) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        employee_id,
        customer_id,
        menuitem_ids,
        total,
        tax,
        ordered_time,
        fooditem_ids,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the order" });
  }
});

/**
 * @route GET /customer
 * @description Fetch orders for a specific customer.
 * @query {string} id - The ID of the customer.
 * @returns {Object[]} Array of orders for the specified customer.
 * @throws {Error} 400 - Customer ID is required.
 * @throws {Error} 500 - Failed to fetch orders.
 */
router.get("/customer", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    const result = await pool.query(
      "SELECT * FROM orders WHERE customer_id = $1 ORDER BY ordered_time DESC LIMIT 10",
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
