import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import MenuPage from "./Menu";
import FoodPage from "./Food";
import CashierPage from "./Cashier";
import ManagerPage from "./Manager";
import "../styles/default.css";
import "../styles/Weather.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import ImageCarousel from "../components/Carosuel/ImageCarousel";
import { CartContextProvider } from "../components/Cart/CartContext";
import useWeather from "./api/weather/weatherApi";
import WeatherWidget from "../components/weather/WeatherWidget";


function LandingPage() {
  const { weather, error } = useWeather("College Station"); // Using the custom hook

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <WeatherWidget weather={weather} error={error} />
        <ImageCarousel />
        <Link to="/menu">
          <button className="order-btn">ORDER NOW!</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/cashier" element={<CashierPage />} />
          <Route path="/manager" element={<ManagerPage />} />
        </Routes>
      </Router>
    </CartContextProvider>
  );
}

export default App;
