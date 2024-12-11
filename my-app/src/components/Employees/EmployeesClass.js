import getEmployees from "../../pages/api/employees/getEmployees";

/**
 * Represents an Employee.
 * 
 * @class
 */
class Employee {
    /**
     * Creates an instance of the Employee class.
     * @param {number} employee_id - The unique ID of the employee.
     * @param {string} employee_first_name - The first name of the employee.
     * @param {string} employee_last_name - The last name of the employee.
     * @param {number} hours_worked - The number of hours worked by the employee.
     * @param {Array<string>} schedule - The work schedule of the employee.
     */
    constructor(employee_id, employee_first_name, employee_last_name, hours_worked, schedule) {
        this.employee_id = employee_id;
        this.employee_first_name = employee_first_name;
        this.employee_last_name = employee_last_name;
        this.hours_worked = hours_worked;
        this.schedule = schedule;
    }

    /**
     * Returns the employee's full name.
     * @returns {string} The full name of the employee.
     */
    getFullName() {
        return `${this.employee_first_name} ${this.employee_last_name}`;
    }

    /**
     * Returns the employee's ID.
     * @returns {number} The ID of the employee.
     */
    getEmployeeId() {
        return this.employee_id;
    }

    /**
     * Returns the number of hours worked by the employee.
     * @returns {number} The number of hours worked.
     */
    getHoursWorked() {
        return this.hours_worked;
    }

    /**
     * Returns the employee's schedule as a formatted string.
     * @returns {string} The schedule of the employee.
     */
    getSchedule() {
        return this.schedule.map((time) => time).join(", ");
    }

    /**
     * Static method to fetch all employees from the database.
     * @returns {Promise<Employee[]>} A promise that resolves to an array of Employee instances.
     */
    static async fetchAllEmployees() {
        try {
            const response = await fetch("http://localhost:5001/api/employees");
            if (!response.ok) {
                throw new Error("Network response was not ok 2");
            }
            const data = await response.json();
            return data.map((employee) => 
                new Employee(
                    employee.employee_id,
                    employee.employee_first_name,
                    employee.employee_last_name,
                    employee.hours_worked,
                    employee.schedule
                )
            );
        } catch (err) {
            console.error("Error fetching employees:", err);
            return [];
        }
    }

    /**
     * Static method to fetch a specific employee by their ID.
     * @param {number} employee_id - The ID of the employee to fetch.
     * @returns {Promise<Employee|null>} A promise that resolves to an Employee instance or null if not found.
     */
    static async fetchEmployeeById(employee_id) {
        try {
            const response = await fetch(`http://localhost:5001/api/employees/${employee_id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const employee = await response.json();
            return new Employee(
                employee.employee_id,
                employee.employee_first_name,
                employee.employee_last_name,
                employee.hours_worked,
                employee.schedule
            );
        } catch (err) {
            console.error(`Error fetching employee with ID ${employee_id}:`, err);
            return null;
        }
    }
}

export default Employee;
