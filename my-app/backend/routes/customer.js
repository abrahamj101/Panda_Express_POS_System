// routes/customer.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Route to get all customers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY customer_id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch customer data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      customer_first_name,
      customer_last_name,
      payment_method,
      payment_information,
    } = req.body;

    const result = await pool.query(
      "INSERT INTO customers (customer_first_name, customer_last_name, payment_method, payment_information) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        customer_first_name,
        customer_last_name,
        payment_method,
        payment_information,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding the customer" });
  }
});

module.exports = router;
