import getOrders from "../../pages/api/orders/getCustomerOrders";
import getFoodItems from "../../pages/api/fooditems/getFooditems";
import getMenuItems from "../../pages/api/menuItems/getMenuitem";
import OrderEntry from "./orderEntry";
import { useState, useEffect } from "react";
import "../../styles/OrderHistory/customer.css"

const Customer = () => {
  const [orders, setOrders] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders(0);
        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    const fetchFoodItems = async () => {
      try {
        const foodItemsData = await getFoodItems();
        setFoodItems(foodItemsData);
      } catch (err) {
        console.error("Error fetching food items:", err);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const menuItemsData = await getMenuItems();
        setMenuItems(menuItemsData);
      } catch (err) {
        console.error("Error fetching menu items:", err);
      }
    };

    fetchOrders();
    fetchFoodItems();
    fetchMenuItems();
  }, []);

  return (
    <div className="customer-orders-table">
      {orders.map((order) => (
        <OrderEntry
          key={order.order_id}
          order={order}
          menuItems={menuItems}
          foodItems={foodItems}
        />
      ))}
    </div>
  );
};

export default Customer;
