/**
 * @module Employee Routes
 * @fileoverview Provides endpoints for managing employee data, including CRUD operations for employee records and schedules.
 * This file defines routes for managing employee-related operations in the Panda Express POS system.
 */

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection pool for executing SQL queries.

/**
 * @file employees.js
 * @description Routes for handling employee-related API endpoints.
 */

/**
 * GET /api/employees
 * Retrieves all employees from the database.
 * 
 * @route GET /api/employees
 * @async
 * @returns {JSON} An array of employee objects.
 * @throws {500} Returns an error message if the query fails.
 */
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

/**
 * POST /api/employees
 * Adds a new employee to the database.
 * 
 * @route POST /api/employees
 * @async
 * @param {Object} req.body - The request body containing employee details.
 * @param {string} req.body.employee_first_name - The first name of the employee.
 * @param {string} req.body.employee_last_name - The last name of the employee.
 * @param {number} req.body.hours_worked - The number of hours the employee has worked.
 * @param {string[]} req.body.schedule - An array of times representing the employee's schedule.
 * @returns {JSON} The newly created employee object.
 * @throws {500} Returns an error message if the query fails.
 */
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

/**
 * DELETE /api/employees/:employee_id
 * Deletes an employee from the database.
 * 
 * @route DELETE /api/employees/:employee_id
 * @async
 * @param {Object} req.params - The request parameters containing the employee ID.
 * @param {number} req.params.employee_id - The ID of the employee to delete.
 * @returns {JSON} A success message or an error message if the employee is not found.
 * @throws {404} Returns an error message if the employee is not found.
 * @throws {500} Returns an error message if the query fails.
 */
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
