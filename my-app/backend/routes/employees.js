// routes/employees.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Route to get all employees
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY employee_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employee data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { employee_first_name, employee_last_name, hours_worked, schedule } = req.body;
    
    const result = await pool.query(
      "INSERT INTO Employees (employee_first_name, employee_last_name, hours_worked, schedule) VALUES ($1, $2, $3, $4) RETURNING *",
      [employee_first_name, employee_last_name, hours_worked, schedule]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the employee" });
  }
});

router.delete("/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params;
    const id = parseInt(employee_id, 10);

    // Check if the employee exists
    const employee = await pool.query("SELECT * FROM Employees WHERE employee_id = $1", [id]);

    if (employee.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Delete the employee
    await pool.query("DELETE FROM Employees WHERE employee_id = $1", [id]);
    res.json({ message: "Deleted Employee Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

module.exports = router;
