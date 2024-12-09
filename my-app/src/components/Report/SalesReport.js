import React, { useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

ChartJS.register(Title, Tooltip, Legend, BarElement);

const SalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSalesReport = async () => {
    if (!startDate || !endDate) {
      alert('Please provide both start and end dates.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5001/api/sales-report?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError(err.message || 'Error fetching sales report.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: reportData.map((item) => item.order_date),
    datasets: [
      {
        label: 'Total Sales ($)',
        data: reportData.map((item) => parseFloat(item.total_sales)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Sales Report</h2>
      <div>
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
        <button onClick={fetchSalesReport} disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {reportData.length > 0 ? (
        <Bar data={chartData} options={{ plugins: { legend: { display: true } } }} />
      ) : (
        !loading && <p>No data available. Please submit a valid date range.</p>
      )}
    </div>
  );
};

export default SalesReport;
