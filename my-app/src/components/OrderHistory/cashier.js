import React, { useState, useEffect } from 'react';
import CashierTable from "./cashierTable";
import getOrders from "../../pages/api/orders/getOrders";
import "../../styles/OrderHistory/cashier.css"

const Cashier = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const items = await getOrders();
      setOrders(items);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="cashier-page">
      <h1>Cashier Orders</h1>
      <CashierTable data={orders} />
    </div>
  );
};

export default Cashier;
