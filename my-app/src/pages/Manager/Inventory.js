/**
 * InventoryPage Component
 * This page displays a table of inventory data within a manager interface.
 * It includes navigation components (Header, Footer, and BackButton) and utilizes
 * a zoom context to adjust the display scale.
 *
 * @file Inventory.js
 * @module pages/Inventory
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
 * InventoryPage Component
 *
 * @returns {JSX.Element} The inventory management page, displaying a zoomable table of inventory items.
 */
function InventoryPage() {
  const { zoomLevel } = useZoom();

  return (
    <div
      className="employeePage"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Page header */}
      <Header />

      {/* Main content section with back button and inventory table */}
      <div className="main-content">
        <BackButton location="/manager" />
        <ManagerTable dataType="inventory" />
      </div>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default InventoryPage;
