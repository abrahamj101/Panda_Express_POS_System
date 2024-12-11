import getOrders from "../../pages/api/orders/getCustomerOrders";
import getFoodItems from "../../pages/api/fooditems/getFooditems";
import getMenuItems from "../../pages/api/menuItems/getMenuitem";
import OrderEntry from "./orderEntry";
import { useState, useEffect, useContext } from "react";
import "../../styles/OrderHistory/customer.css"
import LoginContext from "../Login/LoginContext";

/**
 * Customer component that fetches and displays customer orders with associated menu and food items.
 * @component
 * @returns {JSX.Element} The rendered Customer component with a list of orders or a loading message.
 */
const Customer = () => {
  const [orders, setOrders] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const {customerId} = useContext(LoginContext)

  useEffect(() => {
    /**
     * Fetches the orders for the current customer.
     * @async
     * @function
     */
      const fetchOrders = async () => {
          try {
              const ordersData = await getOrders(customerId);
              setOrders(ordersData || []);
          } catch (err) {
              console.error("Error fetching orders:", err);
              setOrders([]);
          }
      };

      /**
       * Fetches the food items available.
       * @async
       * @function
       */
      const fetchFoodItems = async () => {
          try {
              const foodItemsData = await getFoodItems();
              setFoodItems(foodItemsData || []);
          } catch (err) {
              console.error("Error fetching food items:", err);
              setFoodItems([]);
          }
      };

      /**
     * Fetches the menu items available.
     * @async
     * @function
     */
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

