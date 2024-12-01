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
import Cashier from "../../components/OrderHistory/cashier";
import BackButton from "../../components/Navigation/BackButton";

function OrderPage() {
  const { zoomLevel } = useZoom();

  return (
    <div
      className="order-history"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <div className="main-content">
        <BackButton location='/manager'/>
        <Cashier />
      </div>
      <Footer />
    </div>
  );
}

export default OrderPage;
