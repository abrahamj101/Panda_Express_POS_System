import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Navigation/Header';
import Footer from '../../components/Navigation/Footer';
import '../../styles/Pages/ReportPage.css'; // Make sure the styling is set up as needed
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const ProductUsageReport = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState(null);

  const handleGenerateReport = async () => {
    const response = await fetch('/api/product-usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startDate, endDate }),
    });
    if (response.ok) {
      const data = await response.json();
      setChartData({
        labels: data.map(item => item.inventoryItem_name),
        datasets: [{
          label: 'Total Usage',
          data: data.map(item => item.total_used),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      });
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  };
  

  return (
    <div className="report">
      <Header />
      <main>
        <h2>Product Usage Report</h2>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleGenerateReport}>Generate Report</button>
        </div>
        {chartData && (
          <div style={{ marginTop: '20px' }}>
            <Bar data={chartData} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductUsageReport;
