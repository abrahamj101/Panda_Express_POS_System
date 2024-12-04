import React from "react";
import "../styles/Pages/MenuBoard.css";

const MenuPage = () => {
  return (
    <div className="menu-page">
      {/* Menu Items Meals Section */}
      <div className="menu-section">
        <h2 className="section-title">Menu Items</h2>
        <div className="meal-options">
          <div className="meal-item">
            <h3>Bowl</h3>
            <p>1 Entrée & 1 Side</p>
            <p className="price">$8.30</p>
          </div>
          <div className="meal-item">
            <h3>Plate</h3>
            <p>2 Entrées & 1 Side</p>
            <p className="price">$9.80</p>
          </div>
          <div className="meal-item">
            <h3>Bigger Plate</h3>
            <p>3 Entrées & 1 Side</p>
            <p className="price">$11.30</p>
          </div>
          <div className="meal-item">
            <h3>Panda Cub Meal</h3>
            <p>Jr. Entrée, Jr. Side, 12 oz Drink & Cookie</p>
            <p className="price">$6.60</p>
          </div>
        </div>
      </div>

      {/* Appetizers Section */}
      <div className="menu-section">
        <h2 className="section-title">Appetizer Choices</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <img
              src="https://olo-images-live.imgix.net/52/524bbb9023e2409b8d3fceae944a808f.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=4f4cc30df356786bbe3968181f8c5160"
              alt="Chicken Egg Roll"
            />
            <h3>Chicken Egg Roll</h3>
          </div>
          <div className="menu-item">
            <img
              src="https://olo-images-live.imgix.net/18/183834b8a35a4737a73a28421f68b4f0.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=0d4be7c417ec1998251da41d5bfe13fb"
              alt="Veggie Spring Roll"
            />
            <h3>Veggie Spring Roll</h3>
          </div>
          <div className="menu-item">
            <img
              src="https://olo-images-live.imgix.net/fe/fef7db209d7d41e6ae065af16afa1577.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=f14d518edf4e7ee0fd22b4d3cddc59b8"
              alt="Cream Cheese Rangoon"
            />
            <h3>Cream Cheese Rangoon</h3>
          </div>
          <div className="menu-item">
            <img
              src="https://olo-images-live.imgix.net/ab/ab4e688dea2b4b56b79fa2ff42a31f24.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=4b9d93576ba69591523a4c60034d54d3"
              alt="Apple Pie Roll"
            />
            <h3>Apple Pie Roll</h3>
          </div>
        </div>
      </div>

      {/* Side Choices Section */}
      <div className="menu-section">
        <h2 className="section-title">Side Choices</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Sides_ChowMein.png"
              alt="Chow Mein"
            />
            <h3>Chow Mein</h3>
            <p className="calories">600 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Sides_FriedRice.png"
              alt="Fried Rice"
            />
            <h3>Fried Rice</h3>
            <p className="calories">620 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Vegetables_SuperGreens.png"
              alt="Super Greens"
            />
            <h3>Super Greens</h3>
            <p className="calories">130 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Sides_WhiteSteamedRice.png"
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
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_OrangeChicken.png"
              alt="Orange Chicken"
            />
            <h3>Orange Chicken</h3>
            <p className="calories">510 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_ShanghaiAngusSteak.png"
              alt="Black Pepper Sirloin Steak"
            />
            <h3>Black Pepper Sirloin Steak</h3>
            <p className="calories">180 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Seafood_HoneyWalnutShrimp.png"
              alt="Honey Walnut Shrimp"
            />
            <h3>Honey Walnut Shrimp</h3>
            <p className="calories">430 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_GrilledTeriyakiChicken.png"
              alt="Grilled Teriyaki Chicken"
            />
            <h3>Grilled Teriyaki Chicken</h3>
            <p className="calories">275 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_KungPaoChicken.png"
              alt="Kung Pao Chicken"
            />
            <h3>Kung Pao Chicken</h3>
            <p className="calories">320 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/ChickenBreast_HoneySesameChickenBreast.png"
              alt="Honey Sesame Chicken Breast"
            />
            <h3>Honey Sesame Chicken Breast</h3>
            <p className="calories">340 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_BeijingBeef.png"
              alt="Beijing Beef"
            />
            <h3>Beijing Beef</h3>
            <p className="calories">480 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_MushroomChicken.png"
              alt="Mushroom Chicken"
            />
            <h3>Mushroom Chicken</h3>
            <p className="calories">480 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/ChickenBreast_SweetFireChickenBreast.png"
              alt="SweetFire Chicken Breast"
            />
            <h3>SweetFire Chicken Breast</h3>
            <p className="calories">380 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/ChickenBreast_StringBeanChickenBreast.png"
              alt="String Bean Chicken Breast"
            />
            <h3>String Bean Chicken Breast</h3>
            <p className="calories">210 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_BroccoliBeef.png"
              alt="Broccoli Beef"
            />
            <h3>Broccoli Beef</h3>
            <p className="calories">150 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_BlackPepperChicken.png"
              alt="Black Pepper Chicken"
            />
            <h3>Black Pepper Chicken</h3>
            <p className="calories">280 Cal</p>
          </div>
          <div className="menu-item">
            <img
              src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Vegetables_SuperGreens.png"
              alt="Super Greens"
            />
            <h3>Super Greens</h3>
            <p className="calories">130 Cal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
