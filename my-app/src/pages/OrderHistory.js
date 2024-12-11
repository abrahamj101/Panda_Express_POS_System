/**
 * OrderHistory Component
 * This page displays order history information based on the user's role.
 * - For customers, it shows their personal order history using the `Customer` component.
 * - For cashiers or other roles, it shows cashier-specific order information using the `Cashier` component.
 * 
 * The page also supports zoom accessibility and includes navigation components (Header, Footer, and BackButton).
 * 
 * @file OrderHistory.js
 * @module pages/OrderHistory
 * @requires react
 * @requires ../styles/Pages/default.css
 * @requires ../components/Navigation/Header
 * @requires ../components/Navigation/Footer
 * @requires ../components/Zoom/ZoomContext
 * @requires ../components/OrderHistory/customer
 * @requires ../components/OrderHistory/cashier
 * @requires ../components/Login/LoginContext
 * @requires ../components/Navigation/BackButton
 * @requires ../components/Login/ProtectedPages
 */

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

/**
 * CashierPage Component
 *
 * @returns {JSX.Element} A page that conditionally displays customer or cashier views based on user role.
 *                        It ensures protected access and supports zoom accessibility features.
 */
function CashierPage() {
  const { zoomLevel } = useZoom(); // Zoom level for accessibility
  const { role } = useContext(LoginContext); // User role from login context

  return (
    <div
      className="order-history"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Ensure page access is protected */}
      <ProtectedPage />

      {/* Page header */}
      <Header />

      {/* Main content section */}
      <div className="main-content">
        {/* Back button to navigate to the home page */}
        <BackButton location="/" />

        {/* Conditional rendering based on user role */}
        {role === "customer" ? (
          <Customer />
        ) : (
          <Cashier />
        )}
      </div>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default CashierPage;
