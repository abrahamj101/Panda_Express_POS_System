// routes/employees.js
// This file defines routes for managing employee-related operations in the Panda Express POS system.

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool for executing SQL queries.

// Route to get all employees
router.get('/', async (req, res) => {
  try {
    // Execute a SQL query to fetch all employees, sorted by employee ID.
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY employee_id"
    );
    // Return the result rows (employee records) as JSON.
    res.json(result.rows);
  } catch (err) {
    // Log any errors to the console and respond with a 500 status code.
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employee data" });
  }
});

// Route to add a new employee
router.post("/", async (req, res) => {
  try {
    // Destructure employee details from the request body.
    const { employee_first_name, employee_last_name, hours_worked, schedule } = req.body;
    
    // Execute a SQL query to insert a new employee into the database.
    // Use parameterized queries ($1, $2, etc.) to prevent SQL injection.
    const result = await pool.query(
      "INSERT INTO Employees (employee_first_name, employee_last_name, hours_worked, schedule) VALUES ($1, $2, $3, $4) RETURNING *",
      [employee_first_name, employee_last_name, hours_worked, schedule]
    );

    // Return the newly created employee record with a 201 status code.
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Log any errors to the console and respond with a 500 status code.
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the employee" });
  }
});

// Route to delete an employee by ID
router.delete("/:employee_id", async (req, res) => {
  try {
    // Extract the employee_id parameter from the request URL and parse it as an integer.
    const { employee_id } = req.params;
    const id = parseInt(employee_id, 10);

    // Check if the employee exists in the database.
    const employee = await pool.query("SELECT * FROM Employees WHERE employee_id = $1", [id]);
    if (employee.rows.length === 0) {
      // Respond with a 404 status code if the employee is not found.
      return res.status(404).json({ error: "Employee not found" });
    }

    // Execute a SQL query to delete the employee by ID.
    await pool.query("DELETE FROM Employees WHERE employee_id = $1", [id]);

    // Respond with a success message upon successful deletion.
    res.json({ message: "Deleted Employee Successfully" });
  } catch (error) {
    // Log any errors to the console and respond with a 500 status code.
    console.error(error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

module.exports = router; // Export the router to use in the main application file.
