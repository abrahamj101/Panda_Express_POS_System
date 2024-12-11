/**
 * Application Entry Point
 * This file is the entry point for the React application. It renders the `App` component
 * into the root DOM node using ReactDOM. Strict Mode is enabled for identifying potential 
 * issues in development.
 *
 * @file index.js
 * @module index
 * @requires react
 * @requires react-dom/client
 * @requires ./styles/Pages/index.css
 * @requires ./pages/App
 * @requires bootstrap/dist/css/bootstrap.min.css
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/Pages/index.css";
import App from "./pages/App";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Root ReactDOM rendering instance.
 * Initializes and renders the `App` component into the root DOM node with StrictMode enabled.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component within React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
