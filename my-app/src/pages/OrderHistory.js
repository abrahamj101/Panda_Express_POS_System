import React, { useContext } from "react";
import "../styles/Pages/default.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import { useZoom } from "../components/Zoom/ZoomContext";
import Customer from "../components/OrderHistory/customer";
import Cashier from "../components/OrderHistory/cashier";
import LoginContext from "../components/Login/LoginContext";

function CashierPage() {
  const { zoomLevel } = useZoom();
  const { role } = useContext(LoginContext);

  return (
    <div
      className="order-history"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <div className="main-content">
      {role === "customer" ? (
        <Customer />
      ) : (
        <Cashier/> 
      )}
      </div>
      <Footer />
    </div>
  );
}

export default CashierPage;
