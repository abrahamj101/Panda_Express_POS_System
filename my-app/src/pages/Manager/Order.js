// import Header from "../../components/Navigation/Header";
// import Footer from "../../components/Navigation/Footer";
// import ManagerTable from "../../components/ManagerPage/ManagerTable";
// import { useZoom } from "../../components/Zoom/ZoomContext";

// function OrderPage() {
//   const { zoomLevel } = useZoom();
//   return (
//     <div
//       className="employeePage"
//       style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
//     >
//       <Header />
//       <ManagerTable dataType="order" />
//       <Footer />
//     </div>
//   );
// }

// export default OrderPage;

import React from "react";
import "../../styles/Pages/default.css";
import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import { useZoom } from "../../components/Zoom/ZoomContext";
import Customer from "../../components/OrderHistory/customer";
import Cashier from "../../components/OrderHistory/cashier";

function OrderPage() {
  const { zoomLevel } = useZoom();
  const customer = true; // Adjust this based on logic to identify the user's role.

  return (
    <div
      className="order-history"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <div className="main-content">
        {customer ? <Customer /> : <Cashier />}
      </div>
      <Footer />
    </div>
  );
}

export default OrderPage;
