import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import CustomerPage from "./Customer";
import logo from "./panda-express-logo-1.svg";
import "./App.css";

function LandingPage() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Panda Express Logo" />
        </div>
        <h1>Panda Express</h1>
        <button className="login-btn">Login</button>
      </header>

      <main className="main-content">
        <div className="carousel-wrapper">
          <Carousel
            className="carousel-container"
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            interval={3000}
          >
            <div className="image-box">
              <img
                className="carousel-image"
                src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_OrangeChicken.png"
                alt="Menu Item 1"
              />
              <p className="legend">Orange Chicken</p>
            </div>
            <div className="image-box">
              <img
                className="carousel-image"
                src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_BeijingBeef.png"
                alt="Menu Item 2"
              />
              <p className="legend">Beijing Beef</p>
            </div>
            <div className="image-box">
              <img
                className="carousel-image"
                src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Seafood_HoneyWalnutShrimp.png"
                alt="Menu Item 3"
              />
              <p className="legend">Honey Walnut Shrimp</p>
            </div>
            {/* Add more carousel items as needed */}
          </Carousel>
        </div>

        <Link to="/customer">
          <button className="order-btn">ORDER NOW!</button>
        </Link>
      </main>

      <footer className="footer">
        <p>300 Polo Rd Room 129, College Station, TX 77840</p>
        <p>
          <b>(979) 773-8811</b>
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customer" element={<CustomerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
