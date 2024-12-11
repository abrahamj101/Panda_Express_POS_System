/**
 * @fileoverview Database connection module for PostgreSQL using the `pg` library.
 * @module db
 */

const { Pool } = require("pg");
require("dotenv").config();

/**
 * Creates a new instance of a PostgreSQL pool with the configuration
 * details loaded from environment variables.
 * 
 * @constant {Pool} pool - The PostgreSQL pool instance used for database queries.
 */
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

/**
 * Event listener that logs a message when a connection to the database is established.
 */
pool.on('connect', () => {
  console.log('Connected to the database');
});

/**
 * Executes a query against the PostgreSQL database.
 * 
 * @function query
 * @param {string} text - The SQL query string to be executed.
 * @param {Array} [params] - Optional array of parameters to be passed to the SQL query.
 * @returns {Promise} A promise that resolves to the result of the query.
 */
module.exports = {
  query: (text, params) => pool.query(text, params),
};
