/**
 * @file XReport.js
 * @description React component for generating and displaying hourly sales data (X-Report) for a selected date.
 *              Fetches data from a backend API and visualizes it using a bar chart.
 */

import React, { useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Register Chart.js components globally for use in the chart
ChartJS.register(Title, Tooltip, Legend, BarElement);

/**
 * XReport Component
 * @description This component allows users to select a date, fetch hourly sales data (X-Report) from an API, 
 *              and display the results in a bar chart.
 * @returns {JSX.Element} The rendered XReport component.
 */
const XReportPayments = () => {
    /** @type {string} State variable for storing the selected date */
    const [date, setDate] = useState('');

    /** @type {?Object} State variable for storing chart data */
    const [chartData, setChartData] = useState(null);

    /**
     * Handles the form submission to fetch data for the selected date.
     * @async
     * @function handleSubmit
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/xreport-payments?date=${date}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            processChartData(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    /**
     * Processes the data to create the chart data structure.
     * @function processChartData
     * @param {Array<Object>} data - The data fetched from the API.
     * @returns {void}
     */
    const processChartData = (data) => {
        const paymentMethods = {};
        data.forEach((row) => {
            const { hour_of_day, total_sales, payment_method } = row;

            if (!paymentMethods[payment_method]) {
                paymentMethods[payment_method] = {
                    label: payment_method,
                    data: Array(24).fill(0), // Initialize 24 hours with 0
                };
            }

            paymentMethods[payment_method].data[hour_of_day] = total_sales;
        });

        const datasets = Object.values(paymentMethods).map((method) => ({
            ...method,
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
        }));

        setChartData({
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets,
        });
    };

    return (
        <div>
            <h2>X Report by Payment Method</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Enter Date (YYYY-MM-DD):</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>

            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'X Report Payments' },
                        },
                        scales: {
                            x: { title: { display: true, text: 'Hour of Day' } },
                            y: { title: { display: true, text: 'Total Sales' } },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default XReportPayments;
