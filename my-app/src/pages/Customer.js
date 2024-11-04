import React from "react";
import "../styles/Customer.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
function MenuPage() {
  const foodItems = Array(9).fill("*Food Item Image*");

  return (
    <div className="menu-page">
      <Header />

      <main className="menu-content">
        <div className="food-grid">
          {foodItems.map((item, index) => (
            <div key={index} className="food-item">
              <p>{item}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MenuPage;
