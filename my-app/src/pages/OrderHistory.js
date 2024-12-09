import React, { useContext } from "react";
import "../styles/Pages/default.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import { useZoom } from "../components/Zoom/ZoomContext";
import Customer from "../components/OrderHistory/customer";
import Cashier from "../components/OrderHistory/cashier";
import LoginContext from "../components/Login/LoginContext";
import BackButton from "../components/Navigation/BackButton";
import ProtectedPage from "../components/Login/ProtectedPages";

function CashierPage() {
  const { zoomLevel } = useZoom();
  const { role } = useContext(LoginContext);

  return (
    <div
      className="order-history"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <ProtectedPage />
      <Header />
      <div className="main-content">
      <BackButton location='/'/>
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
