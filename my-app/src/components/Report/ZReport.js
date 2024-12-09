import React, { useState, useEffect } from "react";

const ZReport = () => {
    const [date, setDate] = useState("");
    const [reportData, setReportData] = useState([]);
    const [error, setError] = useState("");

    const fetchZReport = async () => {
        try {
            if (!date) {
                setError("Please select a date.");
                console.log("Error: No date selected."); // Log for missing date
                return;
            }

            console.log("Before API Call"); // Log before the API call
            const url = `https://project-3-team-3-b-backend.vercel.app/api/zreport?date=${date}`; //`/api/zreports/zreport?date=${date}`
            console.log("Fetching Z Report with URL:", url); // Log for API URL
            const response = await fetch(url);
            console.log("After API Call"); // Log after the API call
            const data = await response.json();
            console.log("Data received:", data); // Log for received data

            if (data.error) {
                console.error("API Error:", data.error); // Log for API error
                setError(data.error);
                setReportData([]);
            } else {
                console.log("Z Report Data Received:", data); // Log for Z report data received
                setError("");
                setReportData(data);
            }
        } catch (err) {
            console.error("Error fetching Z Report:", err); // Log for fetch error
            setError("Failed to fetch Z Report. Please try again later.");
        }
    };

    return (
        <div>
            <h2>Z Report</h2>
            <div>
                <label htmlFor="date">Select Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                        console.log("Selected Date:", e.target.value); // Log for selected date
                    }}
                />
                <button onClick={fetchZReport}>Submit</button>
            </div>
            {error && (
                <p style={{ color: "red" }}>
                    {error}
                    {console.log("Displaying error message:", error)} {/* Log for error */}
                </p>
            )}
            {reportData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Hour of Day</th>
                            <th>Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((row, index) => {
                            console.log(
                                "Row Data:",
                                row,
                                "Total Sales Type:",
                                typeof row.total_sales
                            ); // Log for each row and total_sales type
                            return (
                                <tr key={index}>
                                    <td>{row.hour_of_day}</td>
                                    <td>{Number(row.total_sales).toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ZReport;
