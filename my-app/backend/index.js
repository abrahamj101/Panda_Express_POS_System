/**
 * Index is our file that runs the Server
 * @fileoverview The main entry point for the server application, setting up the Express server,
 * configuring middleware, and defining API routes for the project.
 * @module index
 */
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

// Initialize the Express app
/**
 * @constant {express.Application} app - The Express application instance used to define routes,
 * middleware, and handle server operations.
 */
const app = express();

// Import custom modules
/**
 * @constant {Object} db - Database connection module for interacting with the PostgreSQL database.
 */
const db = require("./db"); // Database connection (from db.js)
const reportRoutes = require("./routes/report"); // Report routes (from routes/report.js)
const menuItemRoutes = require("./routes/menuItem"); // Menu item routes
const foodItemRoutes = require("./routes/foodItem"); // Food item routes
const inventoryItemRoutes = require("./routes/inventoryItem"); // Inventory item routes
const customerRoutes = require("./routes/customer"); // Customer routes
const onlineUserRoutes = require("./routes/onlineUser"); // Online user routes
const nutritionRoutes = require("./routes/nutrition"); // Nutrition routes
const employeeRoutes = require("./routes/employees"); // Employee routes
const orderRoutes = require("./routes/orders"); // Order routes
const productUsageRoutes = require("./routes/productUsageRoutes"); // Product usage routes
const salesReportRoutes = require("./routes/salesReportRoutes");
const xreportRoutes = require("./routes/xreportRoutes"); // X report routes
const zreportRoutes = require("./routes/zreportRoutes"); // Z report routes
const xreportPaymentRoutes = require("./routes/xreportPaymentRoutes"); // X pay routes
const zreportPaymentRoutes = require("./routes/zreportPaymentRoutes"); // X pay routes

// Middleware setup
/**
 * Middleware for enabling Cross-Origin Resource Sharing (CORS) to allow cross-origin requests.
 */
app.use(cors()); // Enable Cross-Origin Resource Sharing

/**
 * Middleware for parsing incoming JSON request bodies and making them accessible via `req.body`.
 */
app.use(express.json()); // Parse incoming JSON requests

// Define API routes
/**
 * Routes for handling report-related API requests.
 * @constant {express.Router} reportRoutes
 */
app.use("/api/reports", reportRoutes); // Route for reports API

/**
 * Routes for handling menu item-related API requests.
 * @constant {express.Router} menuItemRoutes
 */
app.use("/api/menuitems", menuItemRoutes);

/**
 * Routes for handling food item-related API requests.
 * @constant {express.Router} foodItemRoutes
 */
app.use("/api/fooditems", foodItemRoutes);

/**
 * Routes for handling inventory item-related API requests.
 * @constant {express.Router} inventoryItemRoutes
 */
app.use("/api/inventoryitems", inventoryItemRoutes);

/**
 * Routes for handling customer-related API requests.
 * @constant {express.Router} customerRoutes
 */
app.use("/api/customers", customerRoutes);

/**
 * Routes for handling online user-related API requests.
 * @constant {express.Router} onlineUserRoutes
 */
app.use("/api/online-users", onlineUserRoutes);

/**
 * Routes for handling nutrition-related API requests.
 * @constant {express.Router} nutritionRoutes
 */
app.use("/api/nutrition", nutritionRoutes);

/**
 * Routes for handling employee-related API requests.
 * @constant {express.Router} employeeRoutes
 */
app.use("/api/employees", employeeRoutes);

/**
 * Routes for handling order-related API requests.
 * @constant {express.Router} orderRoutes
 */
app.use("/api/orders", orderRoutes);

/**
 * Routes for handling product usage data.
 * @constant {express.Router} productUsageRoutes
 */
app.use('/api', productUsageRoutes); // Product usage route

/**
 * Routes for handling sales report data.
 * @constant {express.Router} salesReportRoutes
 */
app.use('/api', salesReportRoutes)

/**
 * Routes for handling X report data.
 * @constant {express.Router} xreportRoutes
 */
app.use('/api', xreportRoutes); // X route

/**
 * Routes for handling Z report data.
 * @constant {express.Router} zreportRoutes
 */
app.use('/api', zreportRoutes); // Z route

/**
 * Routes for handling X payment data.
 * @constant {express.Router} xreportPaymentRoutes
 */
app.use('/api', xreportPaymentRoutes); // X pay route

/**
 * Routes for handling Z payment data.
 * @constant {express.Router} zreportPaymentRoutes
 */
app.use('/api', zreportPaymentRoutes); // Z pay route

// Root endpoint
/**
 * Handles GET requests to the root endpoint and sends a basic response indicating the server is running.
 * @function
 * @name rootEndpoint
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Define the port to listen on
/**
 * The port number on which the Express server will listen for incoming requests.
 * @constant {number|string} PORT - Port value, defaulting to 5001 if not specified in environment variables.
 */
const PORT = process.env.PORT || 5001;

// Start the server
/**
 * Starts the Express server and logs a message to indicate the server is up and running.
 * @function
 * @name startServer
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
