/**
 * ManagerTable Component
 * A dynamic table interface for managing food items, menu items, orders, inventory, and employees.
 * Supports adding, removing, and displaying items fetched via API calls.
 *
 * @file ManagerTable.js
 * @module components/ManagerTable
 * @requires getFoodItems - API function to fetch food items.
 * @requires getMenuItems - API function to fetch menu items.
 * @requires getOrders - API function to fetch orders.
 * @requires getInventory - API function to fetch inventory items.
 * @requires getEmployees - API function to fetch employee data.
 * @requires createDelete.js - API module for creating and deleting items.
 * @requires Form - Component for rendering input forms.
 * @requires ManagerTable.css - Styles for the manager table layout.
 */

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

// Fields that need to be parsed as arrays in the add form
const fieldsToParseAsArray = [
  "foodItem_ids",
  "inventoryItem_ids",
  "menuitem_ids",
  "fooditem_ids",
  "inventoryitem_ids",
  "item_sub_ids",
];

/**
 * ManagerTable Component
 *
 * @param {Object} props - Component props.
 * @param {string} props.dataType - The type of data to manage (e.g., "fooditem", "menuitem").
 *
 * @returns {JSX.Element} A table displaying data with add and remove functionality.
 */
function ManagerTable({ dataType }) {
  const [data, setData] = useState([]); // Holds fetched data
  const [title, setTitle] = useState(""); // Table title
  const [error, setError] = useState(null); // Tracks errors

  const [showAddForm, setShowAddForm] = useState(false); // Toggles add form
  const [showRemoveForm, setShowRemoveForm] = useState(false); // Toggles remove form
  const [formData, setFormData] = useState({}); // State for add form input
  const [removeId, setRemoveId] = useState(""); // State for remove form input

  const navigate = useNavigate();

  // State for existing items (used to populate placeholders in add form)
  const [existingItems, setExistingItems] = useState([]);

  /**
   * Fetches the data based on the provided `dataType`.
   */
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

  /**
   * Fetch existing items to populate the "add form" input placeholders.
   */
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

  // Determines the ID field for each data type
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

  /**
   * handleAdd - Handles adding a new item based on the dataType.
   */
  const handleAdd = async () => {
    try {
      const processedFormData = { ...formData };
      // Parse specific fields into arrays
      fieldsToParseAsArray.forEach((field) => {
        if (processedFormData[field]) {
          processedFormData[field] = processedFormData[field]
            .split(",")
            .map((item) => item.trim());
        }
      });

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

      // Update state to reflect the new item
      setData((prevData) => [...prevData, newItem]);
      setFormData({});
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding item:", error);
      setError(error);
    }
  };

  /**
   * handleRemove - Handles removing an item based on its ID.
   */
  const handleRemove = async () => {
    try {
      const idField = getIdField();
      switch (dataType) {
        case "fooditem":
          await deleteFoodItem(removeId);
          break;
        case "menuitem":
          await deleteMenuItem(removeId);
          break;
        case "inventory":
          await deleteInventoryItem(removeId);
          break;
        case "employee":
          await deleteEmployee(removeId);
          break;
        default:
          throw new Error("Invalid data type");
      }

      setData((prevData) =>
        prevData.filter((item) => item[idField] !== parseInt(removeId, 10))
      );
      setRemoveId("");
      setShowRemoveForm(false);
    } catch (error) {
      console.error("Error removing item:", error);
      setError(error);
    }
  };

  return (
    <div className="manager-table-container">
      <h2 className="mana-title" aria-live="polite">
        {title}
      </h2>
      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {Object.keys(data[0] || {}).map((key) => (
                <th key={key}>{key.replace(/_/g, " ")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.keys(item).map((key) => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button onClick={() => setShowAddForm(true)}>Add {dataType}</button>
        <button onClick={() => setShowRemoveForm(true)}>Remove {dataType}</button>
      </div>
    </div>
  );
}

export default ManagerTable;
