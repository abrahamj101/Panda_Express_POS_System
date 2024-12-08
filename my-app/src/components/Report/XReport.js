import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const XReport = () => {
    const [date, setDate] = useState('');
    const [chartData, setChartData] = useState(null);

    const fetchXReport = async () => {
        try {
            const response = await axios.get(`/api/xreports/xreport/${date}`);
            const data = response.data;

            const labels = data.map(row => `${row.hour_of_day}:00`);
            const sales = data.map(row => row.total_sales);

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
                onChange={e => setDate(e.target.value)}
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
