import React, { useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../../styles/Components/ProductUsageReport.css';

// Register Chart.js components globally
ChartJS.register(Title, Tooltip, Legend, BarElement);

const ProductUsageReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert('Please enter both start and end dates.');
      return;
    }

    try {
      const response = await fetch(`/api/reports/product-usage?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) throw new Error('Failed to fetch report data');
      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const chartData = {
    labels: reportData.map(item => item.inventoryitem_name),
    datasets: [
      {
        label: 'Total Usage',
        data: reportData.map(item => item.total_used),
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
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <p className="error">{error}</p>}
      {reportData.length > 0 ? (
        <Bar data={chartData} />
      ) : (
        <p>No data available. Please submit dates to generate a report.</p>
      )}
    </div>
  );
};

export default ProductUsageReport;
