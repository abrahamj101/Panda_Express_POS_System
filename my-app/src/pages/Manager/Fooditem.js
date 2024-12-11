/**
 * FoodItemPage Component
 * This page displays a table of food item data within a manager interface.
 * It includes navigation components (Header, Footer, and BackButton) and utilizes
 * a zoom context to adjust the display scale.
 *
 * @file FoodItem.js
 * @module pages/FoodItem
 * @requires ../../components/Navigation/Header
 * @requires ../../components/Navigation/Footer
 * @requires ../../components/ManagerPage/ManagerTable
 * @requires ../../components/Zoom/ZoomContext
 * @requires ../../components/Navigation/BackButton
 */

import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ManagerTable from "../../components/ManagerPage/ManagerTable";
import { useZoom } from "../../components/Zoom/ZoomContext";
import BackButton from "../../components/Navigation/BackButton";

/**
 * FoodItemPage Component
 *
 * @returns {JSX.Element} The food item management page, displaying a zoomable table of food items.
 */
function FoodItemPage() {
  const { zoomLevel } = useZoom();

  return (
    <div
      className="foodItemPage"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Page header */}
      <Header />

      {/* Main content section with back button and food item table */}
      <div className="main-content">
        <BackButton location="/manager" />
        <ManagerTable dataType="fooditem" />
      </div>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default FoodItemPage;
