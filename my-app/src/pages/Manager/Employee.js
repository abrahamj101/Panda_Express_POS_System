/**
 * EmployeePage Component
 * This page displays a table of employee data within a manager interface.
 * It includes navigation components (Header, Footer, and BackButton) and utilizes
 * a zoom context to adjust the display scale.
 *
 * @file Employee.js
 * @module pages/Employee
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
 * EmployeePage Component
 *
 * @returns {JSX.Element} The employee management page, displaying a zoomable table of employees.
 */
function EmployeePage() {
  const { zoomLevel } = useZoom();

  return (
    <div
      className="foodItemPage"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      {/* Page header */}
      <Header />

      {/* Main content section with back button and employee table */}
      <div className="main-content">
        <BackButton location="/manager" />
        <ManagerTable dataType="employee" />
      </div>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default EmployeePage;
