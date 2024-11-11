// App.js
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CustomerPage from "./Customer";
import ManagerPage from "./Manager";
import logo from "./panda-express-logo-1.svg";
import AuthButton from "./AuthButton";
import "./App.css";

function MainPage({ clientId, isSignedIn, setIsSignedIn, setUser }) {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Panda Express Logo" />
          </a>
        </div>
        <h1>Panda Express</h1>

        <AuthButton
          clientId={clientId}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
          setUser={setUser}
        />
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
          </Carousel>
        </div>

        <div className="buttons">
          <span>
            <Link to="/customer">
              <button className="order-btn">ORDER NOW!</button>
            </Link>
          </span>
          <span>
            <Link to="/manager">
              <button className="order-btn">MANAGER</button>
            </Link>
          </span>
        </div>
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
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Routes>
      {}
      <Route
        path="/"
        element={
          <MainPage
            clientId={clientId}
            isSignedIn={isSignedIn}
            setIsSignedIn={setIsSignedIn}
            setUser={setUser}
          />
        }
      />
      
      {}
      <Route path="/customer" element={<CustomerPage />} />
      
      {}
      <Route path="/manager" element={<ManagerPage />} />
    </Routes>
  );
}

export default App;
