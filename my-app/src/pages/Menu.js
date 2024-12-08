import React from "react";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import MenuItemGrid from "../components/MenuItems/MenuItemGrid";
import BackButton from "../components/Navigation/BackButton";
import "../styles/Pages/default.css";
import { useZoom } from "../components/Zoom/ZoomContext";
import CartSidebar from "../components/Cart/CartSideBar";
import LoginContext from "../components/Login/LoginContext";
import { useContext } from "react";

function MenuPage() {
  const { zoomLevel } = useZoom();
  const { isLoggedIn, role } = useContext(LoginContext)

  return (
    <div
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <div className="main-content">
        <BackButton location="/" />
        <MenuItemGrid />
        {isLoggedIn && role !== "customer" ? (
          <CartSidebar />
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MenuPage;
