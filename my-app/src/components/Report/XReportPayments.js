import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const XReportPayments = () => {
    const [date, setDate] = useState('');
    const [chartData, setChartData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5001/api/xreport-payments?date=${date}`, {
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
