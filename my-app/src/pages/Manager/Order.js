/**
 * OrderPage Component
 * This page displays the order history in the manager interface. 
 * It includes navigation components (Header, Footer, and BackButton) and utilizes
 * a zoom context to adjust the display scale. The Cashier component handles the display of order history.
 *
 * @file Order.js
 * @module pages/Order
 * @requires react
 * @requires ../../styles/Pages/default.css
 * @requires ../../components/Navigation/Header
 * @requires ../../components/Navigation/Footer
 * @requires ../../components/Zoom/ZoomContext
 * @requires ../../components/OrderHistory/cashier
 * @requires ../../components/Navigation/BackButton
 */

import React from "react";
import "../../styles/Pages/default.css";
import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import { useZoom } from "../../components/Zoom/ZoomContext";
import Cashier from "../../components/OrderHistory/cashier";
import BackButton from "../../components/Navigation/BackButton";

/**
 * OrderPage Component
 *
 * @returns {JSX.Element} The order history page, displaying a zoomable view of cashier-managed orders.
 */
function OrderPage() {
  const { zoomLevel } = useZoom();

  return (
    <div
      className="order-history"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Page header */}
      <Header />

      {/* Main content section with back button and order history */}
      <div className="main-content">
        <BackButton location="/manager" />
        <Cashier />
      </div>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default OrderPage;
