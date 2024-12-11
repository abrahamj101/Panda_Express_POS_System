/**
 * ManagerPage Component
 * This page serves as the main manager dashboard, providing access to various reports,
 * inventory, employee information, and menu management options.
 * It includes navigation components (Header, Footer, and BackButton) and utilizes
 * a zoom context to adjust the display scale.
 *
 * @file Manager.js
 * @module pages/Manager
 * @requires react
 * @requires react-router-dom
 * @requires ../../styles/Pages/Manager.css
 * @requires ../../components/Navigation/Header
 * @requires ../../components/Navigation/Footer
 * @requires ../../components/Navigation/BackButton
 * @requires ../../components/Zoom/ZoomContext
 */

import React, { useState, useEffect } from "react";
import "../../styles/Pages/Manager.css";
import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/Navigation/BackButton";
import { useZoom } from "../../components/Zoom/ZoomContext";

/**
 * ManagerPage Component
 *
 * @returns {JSX.Element} The manager dashboard, offering navigation to reports, inventory,
 * employee management, menu management, and food item management.
 */
function ManagerPage() {
  const { zoomLevel } = useZoom();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; // Google client ID for authentication
  const [isSignedIn, setIsSignedIn] = useState(false); // State to manage user sign-in status
  const [user, setUser] = useState(null); // State to store user information

  const navigate = useNavigate();

  /**
   * Array of report options available on the manager page.
   * Each object includes a title, description, and path for navigation.
   *
   * @type {Array<Object>}
   * @property {string} title - The title of the report or section.
   * @property {string} description - A short description of the report.
   * @property {string} path - The navigation path for the report or section.
   */
  const reports = [
    {
      title: "Generate Reports",
      description: "Generate sales reports.",
      path: "/manager/report",
    },
    {
      title: "Order History",
      description: "View past orders.",
      path: "/manager/order",
    },
    {
      title: "Inventory Status",
      description: "Current stock levels.",
      path: "/manager/inventory",
    },
    {
      title: "Employee Info",
      description: "Manage and edit employee information.",
      path: "/manager/employee",
    },
    {
      title: "Menu Items",
      description: "Manage and edit menu item information.",
      path: "/manager/menuitem",
    },
    {
      title: "Food Items",
      description: "Manage and edit food item information.",
      path: "/manager/fooditem",
    },
  ];

  return (
    <div
      className="manager-page"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Page header */}
      <Header />

      {/* Main content section */}
      <main className="manager-content">
        <div className="back-button-container">
          <BackButton location="/" />
        </div>

        {/* Report grid with navigation buttons */}
        <div className="report-grid">
          {reports.map((report, index) => (
            <button
              key={index}
              className="report-button"
              onClick={() => navigate(report.path)}
            >
              <h3>{report.title}</h3>
              <p>{report.description}</p>
            </button>
          ))}
        </div>
      </main>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default ManagerPage;
