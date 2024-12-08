import React, { useState } from 'react';
import Header from '../../components/Navigation/Header';
import Footer from '../../components/Navigation/Footer';
import ProductUsageReport from '../../components/Report/ProductUsageReport';
import '../../styles/Pages/ReportPage.css';

const ReportsPage = () => {
  const [currentReport, setCurrentReport] = useState(null);

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
          <button onClick={() => console.log('Sales Report')}>Sales Report</button>
          <button onClick={() => console.log('XReport Sales')}>XReport Sales</button>
          <button onClick={() => console.log('ZReport Sales')}>ZReport Sales</button>
          <button onClick={() => console.log('XReport Payments')}>XReport Payments</button>
          <button onClick={() => console.log('ZReport Payments')}>ZReport Payments</button>
        </div>

        {/* Render the selected report dynamically */}
        <div className="report-content">
          {currentReport === 'product-usage' && <ProductUsageReport />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportsPage;
