// ManagerTable.js

import React, { useState, useEffect } from "react";
import getFoodItems from "../../pages/api/fooditems/getFooditems";
import getMenuItems from "../../pages/api/menuItems/getMenuitem";
import getOrders from "../../pages/api/orders/getOrders";
import getInventory from "../../pages/api/inventory/getInventoryItems";
import getEmployees from "../../pages/api/employees/getEmployees";
import "../../styles/ManagerTable.css";

import Form from "./Form";
import { useNavigate } from "react-router-dom";

// Import the create and delete functions
import {
  createEmployee,
  deleteEmployee,
  createFoodItem,
  deleteFoodItem,
  createMenuItem,
  deleteMenuItem,
  createInventoryItem,
  deleteInventoryItem,
} from "../../pages/api/createDelete";

// Fields that need to be parsed as arrays
const fieldsToParseAsArray = [
  "foodItem_ids",
  "inventoryItem_ids",
  "menuitem_ids",
  "fooditem_ids",
  "inventoryitem_ids",
  "item_sub_ids",
];

function ManagerTable({ dataType }) {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [removeId, setRemoveId] = useState("");

  const navigate = useNavigate();

  // State for existing items
  const [existingItems, setExistingItems] = useState([]);

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

  // Fetch existing items when the add form is opened
  useEffect(() => {
    if (showAddForm) {
      fetchExistingItems();
    }
  }, [showAddForm]);

  const fetchExistingItems = async () => {
    try {
      let result = [];
      switch (dataType) {
        case "fooditem":
          result = await getFoodItems();
          break;
        case "menuitem":
          result = await getMenuItems();
          break;
        case "inventory":
          result = await getInventory();
          break;
        case "employee":
          result = await getEmployees();
          break;
        default:
          result = [];
      }
      setExistingItems(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error fetching existing items:", error);
    }
  };

  const getRandomItem = () => {
    if (existingItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * existingItems.length);
      return existingItems[randomIndex];
    }
    return {};
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
  const excludedFields = [
    "id",
    "employee_id",
    "menuitem_id",
    "fooditem_id",
    "inventoryitem_id",
    "order_id",
  ];

  // Function to handle adding a new item
  const handleAdd = async () => {
    try {
      // Create a copy of formData to manipulate
      const processedFormData = { ...formData };

      // Parse specific fields into arrays
      fieldsToParseAsArray.forEach((field) => {
        if (processedFormData[field]) {
          processedFormData[field] = processedFormData[field]
            .split(",")
            .map((item) => item.trim());
        }
      });
      console.log(processedFormData);

      let newItem;
      switch (dataType) {
        case "fooditem":
          newItem = await createFoodItem(processedFormData);
          break;
        case "menuitem":
          newItem = await createMenuItem(processedFormData);
          break;
        case "inventory":
          newItem = await createInventoryItem(processedFormData);
          break;
        case "employee":
          newItem = await createEmployee(processedFormData);
          break;
        default:
          throw new Error("Invalid data type");
      }

      if (dataType === "employee") {
        // Refresh the page after adding an employee
        window.location.reload();
      } else {
        // For other data types, update the state without refreshing
        setData((prevData) => [...prevData, newItem]);
        setFormData({});
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setError(error);
    }
  };

  // Function to handle removing an item
  const handleRemove = async () => {
    try {
      const idValue = removeId;

      switch (dataType) {
        case "fooditem":
          await deleteFoodItem(idValue);
          break;
        case "menuitem":
          await deleteMenuItem(idValue);
          break;
        case "inventory":
          await deleteInventoryItem(idValue);
          break;
        case "employee":
          await deleteEmployee(idValue);
          break;
        default:
          throw new Error("Invalid data type");
      }

      const idField = getIdField();
      setData((prevData) =>
        prevData.filter((item) => item[idField] !== parseInt(idValue))
      );
      setRemoveId("");
      setShowRemoveForm(false);
    } catch (error) {
      console.error("Error removing item:", error);
      setError(error);
    }
  };

  // Function to handle closing the error message
  const handleCloseError = () => {
    setError(null);
  };

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error.message}</p>
        <button onClick={handleCloseError}>Dismiss</button>
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
          <thead>
            <tr>
              {tableHeaders.map((key) => (
                <th key={key}>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
              >
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
        <button onClick={() => setShowRemoveForm(true)}>
          Remove {dataType}
        </button>
      </div>


      {/* Add Form */}
      {showAddForm && (
        <Form onClose={() => setShowAddForm(false)}>
          <h3>Add {dataType}</h3>
          {(() => {
            const randomItem = getRandomItem();
            return tableHeaders
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
                    placeholder={
                      fieldsToParseAsArray.includes(header)
                      ? "e.g., 1,2,3"
                      : randomItem[header] !== undefined
                      ? String(randomItem[header])
                      : ""
                    }
                    />
                </div>
              ));
            })()}
          <button onClick={handleAdd}>Submit</button>
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
