import React, { useState, useEffect } from 'react';
import CashierTable from "./cashierTable";
import getOrders from "../../pages/api/orders/getOrders";
import "../../styles/OrderHistory/cashier.css"

const Cashier = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (page) => {
    try {
      const { orders, totalPages } = await getOrders(page);
      setOrders(orders);
      setTotalPages(totalPages);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="cashier-page">
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
      <CashierTable data={orders} />
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

export default Cashier;
