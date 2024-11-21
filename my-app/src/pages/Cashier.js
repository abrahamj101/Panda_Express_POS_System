import React from "react";
import "../styles/default.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

function CashierPage() {
  return (
    <div className="cashier-page">
      <Header />
      <h3>Cashier Page</h3>
      <Footer />
    </div>
  );
}

export default CashierPage;
