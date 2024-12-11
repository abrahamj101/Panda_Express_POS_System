/**
 * App Component
 * This is the main application component that sets up routing, global context providers,
 * and accessibility features. It renders different pages and components based on the defined routes.
 *
 * @file App.js
 * @module App
 * @requires react
 * @requires react-router-dom
 * @requires ../styles/Pages/default.css
 * @requires ../styles/Accessibility/Weather.css
 * @requires ./Menu
 * @requires ./Food
 * @requires ./OrderHistory
 * @requires ./Manager/Manager
 * @requires ./Manager/Fooditem
 * @requires ./Manager/Menuitem
 * @requires ./Manager/Order
 * @requires ./Manager/Inventory
 * @requires ./Manager/Employee
 * @requires ./Manager/Report
 * @requires ../components/Report/ProductUsageReport
 * @requires ../components/Report/XReport
 * @requires ../components/Report/ZReport
 * @requires ../components/Report/XReportPayments
 * @requires ../components/Report/ZReportPayments
 * @requires ../components/Report/SalesReport
 * @requires ./MenuBoard
 * @requires ../components/Navigation/Header
 * @requires ../components/Navigation/Footer
 * @requires ../components/Carosuel/ImageCarousel
 * @requires ../components/Cart/CartContext
 * @requires ./api/weather/weatherApi
 * @requires ../components/weather/WeatherWidget
 * @requires ../components/Zoom/ZoomContext
 * @requires ../components/Navigation/AccessibilityButton
 * @requires ../components/Login/LoginContext
 * @requires ../components/Login/ProtectedPages
 */

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MenuPage from "./Menu";
import FoodPage from "./Food";
import OrderHistoryPage from "./OrderHistory";
import ManagerPage from "./Manager/Manager";
import FoodItemPage from "./Manager/Fooditem";
import MenuItemPage from "./Manager/Menuitem";
import ProtectedPage from "../components/Login/ProtectedPages";
import OrderPage from "./Manager/Order";
import CheckoutPage from "./Checkout";
import InventoryPage from "./Manager/Inventory";
import EmployeePage from "./Manager/Employee";
import ReportPage from "./Manager/Report";
import ProductUsageReport from "../components/Report/ProductUsageReport";
import XReport from "../components/Report/XReport";
import ZReport from "../components/Report/ZReport";
import XReportPayments from "../components/Report/XReportPayments";
import ZReportPayments from "../components/Report/ZReportPayments";
import SalesReport from "../components/Report/SalesReport";
import MenuBoard from "./MenuBoard";
import "../styles/Pages/default.css";
import "../styles/Accessibility/Weather.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import ImageCarousel from "../components/Carosuel/ImageCarousel";
import { CartContextProvider } from "../components/Cart/CartContext";
import useWeather from "./api/weather/weatherApi";
import WeatherWidget from "../components/weather/WeatherWidget";
import { ZoomProvider, useZoom } from "../components/Zoom/ZoomContext";
import AccessibilityButton from "../components/Navigation/AccessibilityButton";
import { LoginProvider } from "../components/Login/LoginContext";
import LoginContext from "../components/Login/LoginContext";
import { useContext } from "react";

/**
 * LandingPage Component
 * Displays the landing page with a weather widget, image carousel, and navigation buttons.
 *
 * @returns {JSX.Element} The landing page with links to menu, menu board, and manager page (conditional).
 */
function LandingPage() {
  const { weather, error } = useWeather("College Station");
  const { zoomLevel } = useZoom();
  const { isLoggedIn, role } = useContext(LoginContext);

  return (
    <div
      className="App"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Page header */}
      <Header />

      {/* Main content with weather widget and carousel */}
      <div className="main-content">
        <WeatherWidget weather={weather} error={error} />
        <ImageCarousel />

        {/* Navigation buttons */}
        <div className="button-container">
          <Link to="/menu">
            <button className="order-btn">ORDER NOW</button>
          </Link>
          <Link to="/menu-board">
            <button className="order-btn">SEE MENU</button>
          </Link>
          {isLoggedIn && (role === "manager" || role === "admin") ? (
            <Link to="/manager">
              <button className="order-btn">MANAGER</button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

/**
 * App Component
 * The root component of the application that sets up routing, context providers,
 * and the accessibility button.
 *
 * @returns {JSX.Element} The application with global providers and route definitions.
 */
function App() {
  return (
    <LoginProvider>
      <ZoomProvider>
        <CartContextProvider>
          <Router>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* User Pages */}
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/food" element={<FoodPage />} />
              <Route
                path="/order-history"
                element={
                  <ProtectedPage requiredRole={["customer", "cashier", "manager", "admin"]}>
                    <OrderHistoryPage />
                  </ProtectedPage>
                }
              />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/menu-board" element={<MenuBoard />} />

              {/* Manager Pages */}
              <Route
                path="/manager"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <ManagerPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/employee"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <EmployeePage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/order"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <OrderPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/fooditem"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <FoodItemPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/menuitem"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <MenuItemPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/inventory"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <InventoryPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/report"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <ReportPage />
                  </ProtectedPage>
                }
              />
              {/* Report Pages */}
              <Route
                path="/manager/report/product-usage"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <ProductUsageReport />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/report/sales-report"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <SalesReport />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/report/xreport"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <XReport />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/report/zreport"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <ZReport />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/report/xreport-payments"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <XReportPayments />
                  </ProtectedPage>
                }
              />
              <Route
                path="/manager/report/zreport-payments"
                element={
                  <ProtectedPage requiredRole={["manager", "admin"]}>
                    <ZReportPayments />
                  </ProtectedPage>
                }
              />
            </Routes>

            {/* Accessibility button */}
            <AccessibilityButton />
          </Router>
        </CartContextProvider>
      </ZoomProvider>
    </LoginProvider>
  );
}

export default App;
