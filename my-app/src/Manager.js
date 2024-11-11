// ManagerPage.js
import React, { useState } from "react";
import logo from "./panda-express-logo-1.svg";
import AuthButton from "./AuthButton";
import "./Manager.css";

function ManagerPage() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const reports = [
    { title: "Sales Report", description: "Daily sales summary." },
    { title: "Inventory Status", description: "Current stock levels." },
    { title: "Employee Schedule", description: "Employee work schedule." },
    { title: "Customer Feedback", description: "Recent customer reviews." },
    { title: "Revenue Analysis", description: "Monthly revenue breakdown." },
    { title: "Product Performance", description: "Top-selling products." }
  ];

  return (
    <div className="manager-page">
      <header className="header">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Panda Express Logo" />
          </a>
        </div>
        <h1>Manager Dashboard</h1>

        <AuthButton
          clientId={clientId}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
          setUser={setUser}
        />
      </header>

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

      <footer className="footer">
        <p>300 Polo Rd Room 129, College Station, TX 77840</p>
        <p>
          <b>(979) 773-8811</b>
        </p>
      </footer>
    </div>
  );
}

export default ManagerPage;
