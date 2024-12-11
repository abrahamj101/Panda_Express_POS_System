/**
 * @file ZReportPayments.js
 * @description React component for displaying hourly payment data for a given date using a bar chart.
 *              Fetches data from a backend API and visualizes it with Chart.js.
 */
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

/**
 * ZReportPayments Component
 * @description This component allows users to select a date and view hourly payment data in a bar chart.
 *              It fetches data from a backend API and processes it for visualization.
 * @returns {JSX.Element} The rendered ZReportPayments component.
 */
const ZReportPayments = () => {
    const [date, setDate] = useState(''); // State to store the selected date
    const [chartData, setChartData] = useState(null); // State to hold the chart data

    /**
     * handleSubmit
     * @description Handles form submission, fetches payment data for the given date, and processes it for chart rendering.
     * @param {Event} e - Form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Ensure ISO format with seconds
        const formattedDate = new Date(date).toISOString().split('T')[0];

        try {
            const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/zreport-payments?date=${formattedDate}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json(); // Parse the response as JSON
            processChartData(data);
        } catch (error) {
            console.error('Error:', error.message); // Log fetch error
        }
    };

    /**
     * processChartData
     * @description Processes fetched payment data and formats it for Chart.js.
     * @param {Array} data - The fetched payment data containing `hour_of_day` and `total_sales`.
     */
    const processChartData = (data) => {
        const hourlyData = Array(24).fill(0); // Initialize 24 hours with 0
        data.forEach((row) => {
            const { hour_of_day, total_sales } = row;
            hourlyData[hour_of_day] = total_sales; // Populate data for each hour
        });

        // Update chart data state
        setChartData({
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [
                {
                    label: 'Total Payments',
                    data: hourlyData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        });
    };

    return (
        <div>
            <h2>Z Report Payments</h2>
            {/* Date input form */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Enter Date (YYYY-MM-DD):</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} // Update date state
                    required
                />
                <button type="submit">Submit</button>
            </form>

            {/* Display bar chart if chart data is available */}
            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true, // Ensure responsiveness
                        plugins: {
                            legend: { position: 'top' }, // Position legend at top
                            title: { display: true, text: 'Z Report Payments' },
                        },
                        scales: {
                            x: { title: { display: true, text: 'Hour of Day' } },
                            y: { title: { display: true, text: 'Total Payments' } },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default ZReportPayments;
