import getEmployees from "../../pages/api/employees/getEmployees";

class Employee {
    constructor(employee_id, employee_first_name, employee_last_name, hours_worked, schedule) {
        this.employee_id = employee_id;
        this.employee_first_name = employee_first_name;
        this.employee_last_name = employee_last_name;
        this.hours_worked = hours_worked;
        this.schedule = schedule;
    }

    // Returns the employee's full name
    getFullName() {
        return `${this.employee_first_name} ${this.employee_last_name}`;
    }

    // Returns the employee's ID
    getEmployeeId() {
        return this.employee_id;
    }

    // Returns the hours worked by the employee
    getHoursWorked() {
        return this.hours_worked;
    }

    // Returns the employee's schedule as a readable string
    getSchedule() {
        return this.schedule.map((time) => time).join(", ");
    }

    // Static method to fetch all employees from the database
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

    // Static method to fetch a specific employee by ID
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
