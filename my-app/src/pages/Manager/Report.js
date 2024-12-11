/**
 * ReportsPage Component
 * This page allows users to view different types of reports, such as product usage, sales reports, 
 * X and Z reports, and their payment variants. Users can dynamically select a report type, 
 * and the corresponding report is rendered.
 *
 * @file Reports.js
 * @module pages/Reports
 * @requires react
 * @requires ../../components/Navigation/Header
 * @requires ../../components/Navigation/Footer
 * @requires ../../components/Report/ProductUsageReport
 * @requires ../../components/Report/SalesReport
 * @requires ../../components/Report/XReport
 * @requires ../../components/Report/ZReport
 * @requires ../../components/Report/XReportPayments
 * @requires ../../components/Report/ZReportPayments
 * @requires ../../styles/Pages/ReportPage.css
 */

import React, { useState } from 'react';
import Header from '../../components/Navigation/Header';
import Footer from '../../components/Navigation/Footer';
import ProductUsageReport from '../../components/Report/ProductUsageReport';
import SalesReport from '../../components/Report/SalesReport';
import XReport from '../../components/Report/XReport';
import ZReport from '../../components/Report/ZReport';
import XReportPayments from '../../components/Report/XReportPayments';
import ZReportPayments from '../../components/Report/ZReportPayments';
import '../../styles/Pages/ReportPage.css';

/**
 * ReportsPage Component
 *
 * @returns {JSX.Element} A page with buttons to select and display different report types dynamically.
 */
const ReportsPage = () => {
  /**
   * State to manage the currently selected report type.
   * @type {string|null}
   */
  const [currentReport, setCurrentReport] = useState(null);

  /**
   * Renders the selected report component based on the currentReport state.
   *
   * @returns {JSX.Element} The corresponding report component or a prompt to select a report.
   */
  const renderReport = () => {
    switch (currentReport) {
      case 'product-usage':
        return <ProductUsageReport />;
      case 'sales-report':
        return <SalesReport />;
      case 'xreport':
        return <XReport />;
      case 'zreport':
        return <ZReport />;
      case 'xreport-payments':
        return <XReportPayments />;
      case 'zreport-payments':
        return <ZReportPayments />;
      default:
        return <p>Please select a report type to view details.</p>;
    }
  };

  return (
    <div className="report">
      {/* Page header */}
      <Header />
      <main>
        <br />
        <br />
        <br />
        <h2>Reports</h2>
        <p>Select a report type to view details:</p>

        {/* Buttons for selecting report types */}
        <div className="report-buttons">
          <button onClick={() => setCurrentReport('product-usage')}>Product Usage</button>
          <button onClick={() => setCurrentReport('sales-report')}>Sales Report</button>
          <button onClick={() => setCurrentReport('xreport')}>XReport</button>
          <button onClick={() => setCurrentReport('zreport')}>ZReport</button>
          <button onClick={() => setCurrentReport('xreport-payments')}>XReport Payments</button>
          <button onClick={() => setCurrentReport('zreport-payments')}>ZReport Payments</button>
        </div>

        {/* Render the selected report dynamically */}
        <div className="report-content">
          {renderReport()}
        </div>
      </main>

      {/* Page footer */}
      <Footer />
    </div>
  );
};

export default ReportsPage;
