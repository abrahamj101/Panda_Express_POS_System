import React from 'react';
import "../../styles/OrderHistory/cashierTable.css";

/**
 * CashierTable component that displays order details in a tabular format.
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.data - The array of order objects to display in the table.
 * @returns {JSX.Element} The rendered CashierTable component.
 */
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
            <th>Food Items</th>
            <th>Total</th>
            <th>Ordered Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => {
            let foodItems;
            if (order.fooditem_ids){
              foodItems = order.fooditem_ids.flat().join(', ');
            }


            // Format the ordered time in CST
            const orderedTime = new Date(order.ordered_time);
            const options = {
              weekday: 'short',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
              timeZone: 'America/Chicago', // CST timezone
            };

            const formattedTime = orderedTime.toLocaleString('en-US', options);

            return (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.employee_id}</td>
                <td>{order.customer_id}</td>
                <td>{order.menuitem_ids.join(', ')}</td>
                <td>{foodItems}</td>
                <td>${order.total}</td>
                <td>{formattedTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CashierTable;
