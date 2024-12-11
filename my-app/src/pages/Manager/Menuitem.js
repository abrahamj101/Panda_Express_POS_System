/**
 * MenuItemPage Component
 * This page displays a table of menu item data within a manager interface.
 * It includes navigation components (Header, Footer, and BackButton) and utilizes
 * a zoom context to adjust the display scale.
 *
 * @file MenuItem.js
 * @module pages/MenuItem
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
 * MenuItemPage Component
 *
 * @returns {JSX.Element} The menu item management page, displaying a zoomable table of menu items.
 */
function MenuItemPage() {
  const { zoomLevel } = useZoom();

  return (
    <div
      className="menuitemPage" // Class for styling
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Page header */}
      <Header />

      {/* Main content section with back button and menu item table */}
      <div className="main-content">
        <BackButton location="/manager" />
        <ManagerTable dataType="menuitem" />
      </div>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default MenuItemPage;
