import React from "react";
import "../styles/Customer.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import MenuItemGrid from "../components/MenuItems/MenuItemGrid";

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
