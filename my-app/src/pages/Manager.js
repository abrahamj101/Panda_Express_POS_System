// ManagerPage.js
import React, { useState } from "react";
import "../styles/Manager.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

function ManagerPage() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const reports = [
    { title: "Sales Report", description: "Daily sales summary." },
    { title: "Inventory Status", description: "Current stock levels." },
    { title: "Employee Information", description: "Manage and edit employee information." },
    { title: "Menu Item Analysis", description: "Manage and edit menu item information." },
    { title: "Food Item Information", description: "Manage and edit food item information." },
    { title: "Product Performance", description: "Top-selling products." }
  ];

  return (
    <div className="manager-page">
      <Header />

      <main className="manager-content">
        <div className="report-grid">
          {reports.map((report, index) => (
            <button key={index} className="report-button">
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
