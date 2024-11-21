import React, { useState, useEffect } from 'react';
import getFoodItems from '../pages/api/fooditems/getFooditems';
import getMenuItems from '../pages/api/menuItems/getMenuitem';
import getOrders from '../pages/api/orders/getOrders';
import "../styles/ManagerTable.css";

function ManagerTable({ dataType }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    async function fetchData() {
      let result = [];
      try {
        if (dataType === 'fooditem') {
          result = await getFoodItems();
        } else if (dataType === 'menuitem') {
          result = await getMenuItems();
        } else if (dataType === 'order') {
          result = await getOrders();
        }
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error); // Set error state
      }
    }
    fetchData();
  }, [dataType]);

  if (error) {
    return <div className="error">Error fetching data: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  const tableHeaders = Object.keys(data[0]);

  return (
    <div className="manager-table-container">
      <h2>Data Table: {dataType}</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {tableHeaders.map((key) => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {tableHeaders.map((key) => (
                  <td key={`${index}-${key}`}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerTable;
