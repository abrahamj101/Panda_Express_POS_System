import React, { useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Register Chart.js components globally
ChartJS.register(Title, Tooltip, Legend, BarElement);

const XReport = () => {
    const [date, setDate] = useState('');
    const [chartData, setChartData] = useState(null);

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
    
            const labels = data.map(row => `${row.hour_of_day}:00`);
            const sales = data.map(row => row.total_sales);
    
            console.log('Labels for chart:', labels);
            console.log('Sales data for chart:', sales);
    
            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Sales Per Hour',
                        data: sales,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
            <input
                type="date"
                value={date}
                onChange={e => {
                    console.log('Date input changed:', e.target.value);
                    setDate(e.target.value);
                }}
            />
            <button onClick={fetchXReport}>Submit</button>

            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            legend: { display: true },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default XReport;
