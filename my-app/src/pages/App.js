import React, { useState, useEffect } from "react";
import axios from "axios";
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

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "c220ff896e58679f4db0dfb56f67ec99";
        const city = "College Station";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
        );
        setWeather(response.data);
      } catch (err) {
        setError("Failed to fetch weather data.");
        console.error("Error details:", err);
      }
    };

    fetchWeather();
  }, []);

  if (error) {
    return <div className="weather-error">{error}</div>;
  }

  if (!weather) {
    return <div className="weather-loading">Loading weather...</div>;
  }

  return (
    <div className="weather-widget">
      <h3 className="weather-city">{weather.name}</h3>
      <div className="weather-info">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <div className="weather-details">
          <p className="weather-temp">{Math.round(weather.main.temp)}°F</p>
          <p className="weather-description">
            {weather.weather[0].description}
          </p>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <WeatherWidget></WeatherWidget>
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
