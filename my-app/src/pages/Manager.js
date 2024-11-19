// ManagerPage.js
import React, { useState } from "react";
import "../styles/Manager.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import { useZoom } from "../components/Zoom/ZoomContext";

function ManagerPage() {
  const { zoomLevel } = useZoom();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const reports = [
    { title: "Sales Report", description: "Daily sales summary." },
    { title: "Inventory Status", description: "Current stock levels." },
    { title: "Employee Schedule", description: "Employee work schedule." },
    { title: "Customer Feedback", description: "Recent customer reviews." },
    { title: "Revenue Analysis", description: "Monthly revenue breakdown." },
    { title: "Product Performance", description: "Top-selling products." },
  ];

  return (
    <div
      className="manager-page"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
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
