import React from 'react';

const CashierTable = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Employee ID</th>
            <th>Customer ID</th>
            <th>Menu Items</th>
            <th>Total</th>
            <th>Ordered Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.employee_id}</td>
              <td>{order.customer_id}</td>
              <td>{order.menuitem_ids.join(', ')}</td> {/* Assuming this is an array */}
              <td>{order.total}</td>
              <td>{new Date(order.ordered_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CashierTable;
