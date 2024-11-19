import React from "react";
import "../styles/default.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import { useZoom } from "../components/Zoom/ZoomContext";

function CashierPage() {
  const { zoomLevel } = useZoom();

  return (
    <div
      className="cashier-page"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <h3>Cashier Page</h3>
      <Footer />
    </div>
  );
}

export default CashierPage;
