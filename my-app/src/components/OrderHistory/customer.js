import getOrders from "../../pages/api/orders/getCustomerOrders";
import getFoodItems from "../../pages/api/fooditems/getFooditems";
import getMenuItems from "../../pages/api/menuItems/getMenuitem";
import OrderEntry from "./orderEntry";
import { useState, useEffect, useContext } from "react";
import "../../styles/OrderHistory/customer.css"
import LoginContext from "../Login/LoginContext";

const Customer = () => {
  const [orders, setOrders] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const {customerId} = useContext(LoginContext)

  useEffect(() => {
      const fetchOrders = async () => {
          try {
              const ordersData = await getOrders(customerId);
              setOrders(ordersData || []);
          } catch (err) {
              console.error("Error fetching orders:", err);
              setOrders([]);
          }
      };

      const fetchFoodItems = async () => {
          try {
              const foodItemsData = await getFoodItems();
              setFoodItems(foodItemsData || []);
          } catch (err) {
              console.error("Error fetching food items:", err);
              setFoodItems([]);
          }
      };

      const fetchMenuItems = async () => {
          try {
              const menuItemsData = await getMenuItems();
              setMenuItems(menuItemsData || []);
          } catch (err) {
              console.error("Error fetching menu items:", err);
              setMenuItems([]);
          }
      };

      fetchOrders();
      fetchFoodItems();
      fetchMenuItems();
  }, []);

  if (!orders.length) {
      return <div>Loading orders...</div>;
  }

  return (
    <div className="customer-orders-table">
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <OrderEntry
            key={order.order_id}
            order={order}
            menuItems={menuItems}
            foodItems={foodItems}
          />
        ))
      ) : (
        <p>No Orders Yet!</p>
      )}
    </div>
  );
  
};

export default Customer;

