import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const ZReportPayments = () => {
    const [date, setDate] = useState('');
    const [chartData, setChartData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure ISO format with seconds
        const formattedDate = new Date(date).toISOString().split('T')[0];

        try {
            const response = await fetch(`http://localhost:5001/api/zreport-payments?date=${formattedDate}`, {
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

    const processChartData = (data) => {
        const hourlyData = Array(24).fill(0); // Initialize 24 hours with 0
        data.forEach((row) => {
            const { hour_of_day, total_sales } = row;
            hourlyData[hour_of_day] = total_sales;
        });

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
