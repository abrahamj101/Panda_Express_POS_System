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

const ReportsPage = () => {
  const [currentReport, setCurrentReport] = useState(null);

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
      // Add more cases as needed for other reports
      default:
        return <p>Please select a report type to view details.</p>;
    }
  };

  return (
    <div className="report">
      <Header />
      <main>
        <br />
        <br />
        <br />
        <h2>Reports</h2>
        <p>Select a report type to view details:</p>
        <div className="report-buttons">
          <button onClick={() => setCurrentReport('product-usage')}>Product Usage</button>
          <button onClick={() => setCurrentReport('sales-report')}>Sales Report</button>
          <button onClick={() => setCurrentReport('xreport')}>XReport </button>
          <button onClick={() => setCurrentReport('zreport')}>ZReport </button>
          <button onClick={() => setCurrentReport('xreport-payments')}>XReport Payments</button>
          <button onClick={() => setCurrentReport('zreport-payments')}>ZReport Payments</button>
        </div>

        {/* Render the selected report dynamically */}
        <div className="report-content">
          {renderReport()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportsPage;
