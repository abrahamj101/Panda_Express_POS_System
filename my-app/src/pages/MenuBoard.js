import React from "react";
import "../styles/Pages/MenuBoard.css";

const MenuPage = () => {
  return (
    <div className="menu-page">
      {/* Take-Out Meals Section */}
      <div className="menu-section">
        <h2 className="section-title">Take-Out Meals</h2>
        <div className="meal-options">
          <div className="meal-item">
            <h3>Bowl</h3>
            <p>1 Entrée & 1 Side</p>
            <p className="price">$6.40</p>
          </div>
          <div className="meal-item">
            <h3>Plate</h3>
            <p>2 Entrées & 1 Side</p>
            <p className="price">$7.40</p>
          </div>
          <div className="meal-item">
            <h3>Bigger Plate</h3>
            <p>3 Entrées & 1 Side</p>
            <p className="price">$8.90</p>
          </div>
          <div className="meal-item">
            <h3>Kid's Meal</h3>
            <p>Jr. Entrée, Jr. Side, 12 oz Drink & Cookie</p>
            <p className="price">$5.50</p>
          </div>
        </div>
      </div>

      {/* Side Choices Section */}
      <div className="menu-section">
        <h2 className="section-title">Side Choices</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <img src="https://via.placeholder.com/150" alt="Chow Mein" />
            <h3>Chow Mein</h3>
            <p className="calories">510 Cal</p>
          </div>
          <div className="menu-item">
            <img src="https://via.placeholder.com/150" alt="Fried Rice" />
            <h3>Fried Rice</h3>
            <p className="calories">520 Cal</p>
          </div>
          <div className="menu-item">
            <img src="https://via.placeholder.com/150" alt="Mixed Vegetables" />
            <h3>Mixed Vegetables</h3>
            <p className="calories">90 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://via.placeholder.com/150"
              alt="White Steamed Rice"
            />
            <h3>White Steamed Rice</h3>
            <p className="calories">520 Cal</p>
          </div>
        </div>
      </div>

      {/* Entrée Choices Section */}
      <div className="menu-section">
        <h2 className="section-title">Entrée Choices</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <img src="https://via.placeholder.com/150" alt="Orange Chicken" />
            <h3>Orange Chicken</h3>
            <p className="calories">490 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://via.placeholder.com/150"
              alt="Beef with Broccoli"
            />
            <h3>Beef with Broccoli</h3>
            <p className="calories">150 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://via.placeholder.com/150"
              alt="Honey Walnut Shrimp"
            />
            <h3>Honey Walnut Shrimp</h3>
            <p className="calories">360 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://via.placeholder.com/150"
              alt="Grilled Teriyaki Chicken"
            />
            <h3>Grilled Teriyaki Chicken</h3>
            <p className="calories">300 Cal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
