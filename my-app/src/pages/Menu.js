import React from "react";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import MenuItemGrid from "../components/MenuItems/MenuItemGrid";
import BackButton from "../components/Navigation/BackButton";
import "../styles/default.css"


function MenuPage() {

  return (
    <div>
      <Header />
      <div className="main-content">
        <BackButton />
        <MenuItemGrid />
      </div>
      <Footer />
    </div>
  );
}

export default MenuPage;
