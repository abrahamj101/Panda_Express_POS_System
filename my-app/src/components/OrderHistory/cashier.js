import React, { useState, useEffect } from 'react';
import CashierTable from './cashierTable';
import getOrders from "../../pages/api/orders/getOrders";

const Cashier = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const items = await getOrders();
      setOrders(items);  // Sets the fetched orders into state
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <CashierTable data={orders} />
    </div>
  );
};

export default Cashier;
