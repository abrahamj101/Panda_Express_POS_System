/**
 * @file XReport.js
 * @description React component for generating and displaying hourly sales data (X-Report) for a selected date.
 *              Fetches data from a backend API and visualizes it using a bar chart.
 */

import React, { useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Register Chart.js components globally
ChartJS.register(Title, Tooltip, Legend, BarElement);

/**
 * XReport Component
 * @description This component allows users to select a date, fetch hourly sales data (X-Report) from an API, 
 *              and display the results in a bar chart.
 * @returns {JSX.Element} The rendered XReport component.
 */
const XReport = () => {
    const [date, setDate] = useState(''); // State to store the selected date
    const [chartData, setChartData] = useState(null); // State to hold the data for the chart

    /**
     * fetchXReport
     * @description Fetches X-Report data (hourly sales) for the specified date from the backend API.
     *              Processes the response data to create labels and datasets for the chart.
     *              Updates the chartData state or logs errors in case of failure.
     */
    const fetchXReport = async () => {
        console.log('Fetching XReport...');
        console.log('Selected date:', date);
    
        try {
            const url = `https://project-3-team-3-b-backend.vercel.app/api/xreport?date=${date}`; 
            const response = await fetch(url);
    
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                const errorText = await response.text(); // Log response text if not JSON
                console.error('Error response text:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Response data:', data);
    
            if (data.length === 0) {
                console.log('No data received from server.');
            }
    
             // Process the API response to prepare data for the chart
            const labels = data.map(row => `${row.hour_of_day}:00`);
            const sales = data.map(row => row.total_sales);
    
            console.log('Labels for chart:', labels);
            console.log('Sales data for chart:', sales);
    
            // Update chartData state with processed data
            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Sales Per Hour', // Label for the dataset
                        data: sales, // Y-axis data values
                        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar fill color
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching XReport:', error);
        }
    };
    

    return (
        <div>
            <h2>XReport: Sales Per Hour</h2>
            {/* Input field for the user to select a date */}
            <input
                type="date"
                value={date}
                onChange={(e) => {
                    console.log('Date input changed:', e.target.value);
                    setDate(e.target.value);
                }}
            />
            {/* Button to trigger the fetch process */}
            <button onClick={fetchXReport}>Submit</button>

            {/* Render the bar chart if data is available */}
            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            legend: { display: true }, // Show legend on the chart
                        },
                    }}
                />
            )}
        </div>
    );
};

export default XReport;
