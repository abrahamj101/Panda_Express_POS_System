import React from "react";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import MenuItemGrid from "../components/MenuItems/MenuItemGrid";
import "../styles/default.css"


function MenuPage() {

  return (
    <div className="menu-page">
      <Header />
      
      <main className="menu-content">
      <MenuItemGrid />
      </main>

      <Footer />
    </div>
  );
}

export default MenuPage;
