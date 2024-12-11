/**
 * @file SalesReport.js
 * @description React component for generating and displaying a sales report based on a specified date range. 
 *              Fetches data from a backend API and visualizes it using a bar chart.
 */
import React, { useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

ChartJS.register(Title, Tooltip, Legend, BarElement);

/**
 * SalesReport Component
 * @description This component allows users to input a date range, fetch sales report data from an API, 
 *              and display the results in a bar chart.
 * @returns {JSX.Element} The rendered SalesReport component.
 */
const SalesReport = () => {
  const [startDate, setStartDate] = useState(''); // State to track the start date input by the user
  const [endDate, setEndDate] = useState(''); // State to track the end date input by the user
  const [reportData, setReportData] = useState([]); // State to hold the sales report data fetched from the API
  const [loading, setLoading] = useState(false); // State to indicate whether data is being fetched
  const [error, setError] = useState(null); // State to store any error messages during the data fetch process

  /**
   * fetchSalesReport
   * @description Fetches sales report data from the backend API for the specified date range.
   *              Updates state variables with the fetched data or any error that occurs.
   */
  const fetchSalesReport = async () => {
    if (!startDate || !endDate) {
      alert('Please provide both start and end dates.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://project-3-team-3-b-backend.vercel.app/api/sales-report?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON data from the API response
      setReportData(data); // Update the report data state
    } catch (err) {
      setError(err.message || 'Error fetching sales report.'); // Update the error state
    } finally {
      setLoading(false); // Set loading state to false after fetch completes
    }
  };

    /**
   * Constructs the data object for rendering the bar chart.
   * @type {Object}
   */
  const chartData = {
    labels: reportData.map((item) => item.order_date),
    datasets: [
      {
        label: 'Total Sales ($)', // Label for the dataset
        data: reportData.map((item) => parseFloat(item.total_sales)), // Y-axis data values
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar fill color
        borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
        borderWidth: 1, // Width of the bar borders
      },
    ],
  };

  return (
    <div>
      <h2>Sales Report</h2>
      <div>
        {/* Date input for the start date */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        {/* Date input for the end date */}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        {/* Submit button to trigger the fetch process */}
        <button onClick={fetchSalesReport} disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
            {/* Display error messages, if any */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Render the bar chart if data is available */}
      {reportData.length > 0 ? (
        <Bar data={chartData} options={{ plugins: { legend: { display: true } } }} />
      ) : (
        !loading && <p>No data available. Please submit a valid date range.</p>
      )}
    </div>
  );
};

export default SalesReport;
