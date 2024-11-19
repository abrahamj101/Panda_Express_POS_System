import React from "react";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import MenuItemGrid from "../components/MenuItems/MenuItemGrid";
import BackButton from "../components/Navigation/BackButton";
import "../styles/default.css";
import { ZoomProvider, useZoom } from "../components/Zoom/ZoomContext";

function MenuPage() {
  const { zoomLevel } = useZoom();

  return (
    <div
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <div className="main-content">
        <BackButton location="/" />
        <MenuItemGrid />
      </div>
      <Footer />
    </div>
  );
}

export default MenuPage;
