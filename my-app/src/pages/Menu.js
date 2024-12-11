/**
 * MenuPage Component
 * This page displays a grid of menu items for users to browse. It includes navigation 
 * components (Header, Footer, and BackButton) and optionally displays the cart sidebar 
 * for non-customer roles (e.g., manager or admin).
 * 
 * Zoom accessibility is supported to scale the content dynamically.
 *
 * @file Menu.js
 * @module pages/Menu
 * @requires react
 * @requires ../components/Navigation/Header
 * @requires ../components/Navigation/Footer
 * @requires ../components/MenuItems/MenuItemGrid
 * @requires ../components/Navigation/BackButton
 * @requires ../components/Zoom/ZoomContext
 * @requires ../components/Cart/CartSideBar
 * @requires ../components/Login/LoginContext
 * @requires ../styles/Pages/default.css
 */

import React from "react";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import MenuItemGrid from "../components/MenuItems/MenuItemGrid";
import BackButton from "../components/Navigation/BackButton";
import "../styles/Pages/default.css";
import { useZoom } from "../components/Zoom/ZoomContext";
import CartSidebar from "../components/Cart/CartSideBar";
import LoginContext from "../components/Login/LoginContext";
import { useContext } from "react";

/**
 * MenuPage Component
 *
 * @returns {JSX.Element} A page that displays a grid of menu items with optional cart functionality 
 * for logged-in managers and admins.
 */
function MenuPage() {
  const { zoomLevel } = useZoom(); // Zoom level for accessibility scaling
  const { isLoggedIn, role } = useContext(LoginContext); // User login context

  return (
    <div
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Page header */}
      <Header />

      {/* Main content section */}
      <div className="main-content">
        {/* Back button to navigate to the landing page */}
        <BackButton location="/" />

        {/* Grid of menu items */}
        <MenuItemGrid />

        {/* Cart sidebar (visible for non-customer roles) */}
        {isLoggedIn && role !== "customer" ? <CartSidebar /> : null}
      </div>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default MenuPage;
