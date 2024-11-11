import React from "react";
import "../styles/default.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

function ManagerPage() {
  return (
    <div className="manager-page">
      <Header />
      <h3>Manager Page</h3>
      <Footer />
    </div>
  );
}

export default ManagerPage;
