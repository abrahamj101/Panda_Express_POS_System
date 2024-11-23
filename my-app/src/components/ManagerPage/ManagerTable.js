import React, { useState, useEffect } from "react";
import getFoodItems from "../../pages/api/fooditems/getFooditems";
import getMenuItems from "../../pages/api/menuItems/getMenuitem";
import getOrders from "../../pages/api/orders/getOrders";
import getInventory from "../../pages/api/inventory/getInventoryItems";
import "../../styles/ManagerTable.css";

function ManagerTable({ dataType }) {
  const [data, setData] = useState([]); // Default value as an empty array
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let result = [];
        switch (dataType) {
          case "fooditem":
            result = await getFoodItems();
            setTitle("Food Items");
            break;
          case "menuitem":
            result = await getMenuItems();
            setTitle("Menu Items");
            break;
          case "order":
            result = await getOrders();
            setTitle("Order History");
            break;
          case "inventory":
            result = await getInventory();
            setTitle("Inventory List");
            break;
          default:
            throw new Error("Invalid data type");
        }
        setData(Array.isArray(result) ? result : []); // Ensure result is an array
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setData([]); // Ensure `data` is reset to an empty array on error
      }
    }

    fetchData();
  }, [dataType]);

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="manager-table-container">
      <h2 className="mana-title" aria-live="polite">{title}</h2>
      <div className="table-wrapper">
        <table>
          <caption>{title}</caption>
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
