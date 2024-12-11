import React, { useState, useEffect } from 'react'; // Import React, useState for state management, and useEffect for side effects
import CashierTable from "./cashierTable"; // Import the table component to display orders
import getOrders from "../../pages/api/orders/getOrders"; // Import the API function to fetch orders
import "../../styles/OrderHistory/cashier.css"; // Import CSS for styling

// Component to manage and display cashier orders with pagination
const Cashier = () => {
  // State to store the list of orders
  const [orders, setOrders] = useState([]);
  // State to track the current page number
  const [currentPage, setCurrentPage] = useState(1);
  // State to store the total number of pages available
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch orders for a specific page
  const fetchOrders = async (page) => {
    try {
      // Call API to get orders and total pages for the given page number
      const { orders, totalPages } = await getOrders(page);
      setOrders(orders); // Update the orders state
      setTotalPages(totalPages); // Update the total pages state
    } catch (err) {
      // Log error in case of failure
      console.error('Error fetching orders:', err);
    }
  };

  // Effect to fetch orders when the current page changes
  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]); // Dependency on currentPage ensures re-fetching when the page updates

  // Function to handle going to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Increment the current page
    }
  };

  // Function to handle going to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrement the current page
    }
  };

  return (
    <div className="cashier-page">
      {/* Pagination controls for navigating pages */}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>

      {/* Render the table component and pass the fetched orders as props */}
      <CashierTable data={orders} />

      {/* Duplicate pagination controls at the bottom for convenience */}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Cashier; // Export the component for use elsewhere in the app
