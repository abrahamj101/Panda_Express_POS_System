// routes/onlineUser.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Route to get all online users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM onlineusers ORDER BY user_id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching online users:', error);
    res.status(500).send('Error fetching online users');
  }
});

module.exports = router;
