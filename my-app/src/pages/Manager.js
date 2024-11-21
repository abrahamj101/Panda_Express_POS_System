// ManagerPage.js
import React, { useState } from "react";
import "../styles/Manager.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import { useNavigate } from "react-router-dom";
import BackButton from "my-app/src/components/Navigation/BackButton.js";

function ManagerPage() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const reports = [
    { title: "Generate Reports", description: "Generate sales reports.", path: "/manager/report" },
    { title: "Order History", description: "View past orders.", path: "/manager/order" },
    { title: "Inventory Status", description: "Current stock levels.", path: "/manager/inventory" },
    { title: "Employee Info", description: "Manage and edit employee information.", path: "/manager/employee" },
    { title: "Menu Items", description: "Manage and edit menu item information.", path: "/manager/menuitem" },
    { title: "Food Items", description: "Manage and edit food item information.", path: "/manager/fooditem" },
  ];

  return (
    <div className="manager-page">
      <Header />
        <div className="back">
        <BackButton location="/" />
        </div>
      <main className="manager-content">
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

      <Footer />
    </div>
  );
}

export default ManagerPage;
