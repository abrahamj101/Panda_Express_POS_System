import { Pool } from "pg";
import Cors from "cors";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    origin: "*",
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  const { method } = req;

  const { dataType, id } = req.query;

  switch (method) {
    case "POST":
      await handleCreate(req, res, dataType);
      break;
    case "DELETE":
      await handleDelete(req, res, dataType, id);
      break;
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleCreate(req, res, dataType) {
  try {
    const body = req.body;

    switch (dataType) {
      case "fooditem":
        await createFoodItem(res, body);
        break;
      case "menuitem":
        await createMenuItem(res, body);
        break;
      case "inventory":
        await createInventoryItem(res, body);
        break;
      case "employee":
        await createEmployee(res, body);
        break;
      default:
        res.status(400).json({ error: "Invalid data type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function handleDelete(req, res, dataType, id) {
  try {
    switch (dataType) {
      case "fooditem":
        await deleteFoodItem(res, id);
        break;
      case "menuitem":
        await deleteMenuItem(res, id);
        break;
      case "inventory":
        await deleteInventoryItem(res, id);
        break;
      case "employee":
        await deleteEmployee(res, id);
        break;
      default:
        res.status(400).json({ error: "Invalid data type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function createEmployee(res, body) {
  try {
    const { first_name, last_name, position, salary } = body;

    const result = await pool.query(
      "INSERT INTO Employees (first_name, last_name, position, salary) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, position, salary]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating employee:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the employee" });
  }
}

async function createFoodItem(res, body) {
  try {
    const { fooditem_name, price, inventoryitem_ids, in_stock } = body;

    const result = await pool.query(
      "INSERT INTO FoodItems (foodItem_name, price, inventoryitem_ids, in_stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [fooditem_name, price, inventoryitem_ids, in_stock]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating food item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the food item" });
  }
}

async function createMenuItem(res, body) {
  try {
    const { menuitem_name, price, fooditem_ids, inventoryitem_ids, in_stock } =
      body;

    const result = await pool.query(
      "INSERT INTO MenuItems (menuItem_name, price, foodItem_ids, inventoryitem_ids, in_stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [menuitem_name, price, fooditem_ids, inventoryitem_ids, in_stock]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the menu item" });
  }
}

async function createInventoryItem(res, body) {
  try {
    const { item_name, quantity, unit } = body;

    const result = await pool.query(
      "INSERT INTO InventoryItems (item_name, quantity, unit) VALUES ($1, $2, $3) RETURNING *",
      [item_name, quantity, unit]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating inventory item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the inventory item" });
  }
}

async function deleteEmployee(res, id) {
  try {
    const employee_id = parseInt(id, 10);
    await pool.query("DELETE FROM Employees WHERE employee_id = $1", [
      employee_id,
    ]);
    res.json({ message: "Deleted Employee Successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
}

async function deleteFoodItem(res, id) {
  try {
    const fooditem_id = parseInt(id, 10);
    await pool.query("DELETE FROM FoodItems WHERE foodItem_id = $1", [
      fooditem_id,
    ]);
    res.json({ message: "Deleted Food Item Successfully" });
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({ error: "Failed to delete food item" });
  }
}

async function deleteMenuItem(res, id) {
  try {
    const menuitem_id = parseInt(id, 10);
    await pool.query("DELETE FROM MenuItems WHERE menuItem_id = $1", [
      menuitem_id,
    ]);
    res.json({ message: "Deleted Menu Item Successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
}

async function deleteInventoryItem(res, id) {
  try {
    const inventoryitem_id = parseInt(id, 10);
    await pool.query("DELETE FROM InventoryItems WHERE inventoryItem_id = $1", [
      inventoryitem_id,
    ]);
    res.json({ message: "Deleted Inventory Item Successfully" });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res.status(500).json({ error: "Failed to delete inventory item" });
  }
}
