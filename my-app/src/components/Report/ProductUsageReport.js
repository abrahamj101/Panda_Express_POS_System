/**
 * @file ProductUsageReport.js
 * @description React component for generating and displaying a product usage report with total orders data.
 *              Fetches data from a backend API and visualizes it using a bar chart.
 */

import React, { useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../../styles/Components/ProductUsageReport.css';

// Register Chart.js components globally
ChartJS.register(Title, Tooltip, Legend, BarElement);

/**
 * ProductUsageReport Component
 * @description This component allows users to input start and end dates, fetch product usage data from an API,
 *              and display the results in a bar chart.
 * @returns {JSX.Element} The rendered ProductUsageReport component.
 */
const ProductUsageReport = () => {
  /** @type {string} The start date for the report. */
  const [startDate, setStartDate] = useState('');

  /** @type {string} The end date for the report. */
  const [endDate, setEndDate] = useState('');

  /** @type {Array} Array to hold the data for the report. */
  const [reportData, setReportData] = useState([]);

  /** @type {string|null} Error message if an error occurs during data fetch. */
  const [error, setError] = useState(null);

  /** @type {boolean} Indicates whether the data fetching process is ongoing. */
  const [loading, setLoading] = useState(false);

    /**
   * Handles the form submission to fetch data for the selected date range.
   * @async
   * @function handleSubmit
   * @returns {Promise<void>}
   */
  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert('Please enter both start and end dates.');
      return;
    }

    try {
      const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/product-usage?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching data: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Invalid response format');
      setReportData(data);
    } catch (err) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generates the data structure for the chart based on the report data.
   * @type {Object}
   */
  const chartData = {
    labels: reportData.map((item) => item.inventoryitem_name || 'Unknown'),
    datasets: [
      {
        label: 'Total Orders',
        data: reportData.map((item) => parseInt(item.total_orders, 10) || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="product-usage-report">
      <h2>Product Usage Report</h2>
      <div className="date-inputs">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      {error && <p className="error">Error: {error}</p>}
      {loading && <p>Loading data...</p>}
      {reportData.length > 0 ? (
        <Bar data={chartData} />
      ) : (
        !loading && <p>No data available. Please submit dates to generate a report.</p>
      )}
    </div>
  );
};

export default ProductUsageReport;
