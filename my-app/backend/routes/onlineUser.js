// routes/onlineUser.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Route to get all online users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM onlineusers ORDER BY user_id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch online user data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      role,
      customer_id,
      employee_id,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO onlineusers (first_name, last_name, email, role, customer_id, employee_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [first_name, last_name, email, role, customer_id, employee_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding the online user" });
  }
});

router.get("/exists", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const result = await pool.query(
      "SELECT * FROM onlineusers WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;
