import React, { useState, useEffect } from "react";
import getFoodItems from "../../pages/api/fooditems/getFooditems";
import getMenuItems from "../../pages/api/menuItems/getMenuitem";
import getOrders from "../../pages/api/orders/getOrders";
import getInventory from "../../pages/api/inventory/getInventoryItems";
import getEmployees from "../../pages/api/employees/getEmployees";
import "../../styles/ManagerTable.css";

import Form from "./Form"; 

function ManagerTable({ dataType }) {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [removeId, setRemoveId] = useState("");

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
          case "employee":
            result = await getEmployees();
            setTitle("Employee List");
            break;
          default:
            throw new Error("Invalid data type");
        }
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setData([]);
      }
    }

    fetchData();
  }, [dataType]);

  // Function to handle adding a new item
  const handleAdd = async () => {
    try {
      const response = await fetch(`/api/${dataType}s`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newItem = await response.json();
        setData((prevData) => [...prevData, newItem]);
        setFormData({});
        setShowAddForm(false);
      } else {
        throw new Error("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setError(error);
    }
  };

  // Function to handle removing an item
  const handleRemove = async () => {
    try {
      const idField = getIdField();
      const idValue = removeId;

      const response = await fetch(`/api/${dataType}s/${idValue}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item[idField] !== parseInt(idValue)));
        setRemoveId("");
        setShowRemoveForm(false);
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      setError(error);
    }
  };

  // Helper function to get the ID field name based on dataType
  const getIdField = () => {
    switch (dataType) {
      case "fooditem":
        return "fooditem_id";
      case "menuitem":
        return "menuitem_id";
      case "inventory":
        return "inventoryitem_id";
      case "employee":
        return "employee_id";
      default:
        return "id";
    }
  };

  // Exclude ID fields from the add form
  const excludedFields = ["id", "employee_id", "menuitem_id", "fooditem_id", "inventoryitem_id", "order_id"];

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
      <h2 className="mana-title" aria-live="polite">
        {title}
      </h2>
      <div className="table-wrapper">
        <table>
          <caption>{title}</caption>
          <thead>
            <tr>
              {tableHeaders.map((key) => (
                <th key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
                </th>
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

      {/* Add and Remove Buttons */}
      <div className="form-actions">
        <button onClick={() => setShowAddForm(true)}>Add {dataType}</button>
        <button onClick={() => setShowRemoveForm(true)}>Remove {dataType}</button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Form onClose={() => setShowAddForm(false)}>
          <h3>Add {dataType}</h3>
          {tableHeaders
            .filter((header) => !excludedFields.includes(header))
            .map((header) => (
              <div key={header}>
                <label>{header.replace(/_/g, " ")}</label>
                <input
                  type="text"
                  value={formData[header] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [header]: e.target.value })
                  }
                />
              </div>
            ))}
          <button onClick={handleAdd} styleClass="submit">Submit</button>
        </Form>
      )}

      {/* Remove Form */}
      {showRemoveForm && (
        <Form onClose={() => setShowRemoveForm(false)}>
          <h3>Remove {dataType}</h3>
          <label>ID</label>
          <input
            type="text"
            value={removeId}
            onChange={(e) => setRemoveId(e.target.value)}
          />
          <button onClick={handleRemove}>Remove</button>
        </Form>
      )}
    </div>
  );
}

export default ManagerTable;
