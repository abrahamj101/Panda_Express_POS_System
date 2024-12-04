// Import core modules
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

// Import custom modules
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

// Initialize the Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Define API routes
app.use("/api/reports", reportRoutes); // Route for reports API
app.use("/api/menuitems", menuItemRoutes);
app.use("/api/fooditems", foodItemRoutes);
app.use("/api/inventoryitems", inventoryItemRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/online-users", onlineUserRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/orders", orderRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Define the port to listen on
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
