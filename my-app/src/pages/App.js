import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import MenuPage from "./Menu";
import FoodPage from "./Food";
import CashierPage from "./Cashier";
import ManagerPage from "./Manager";
import "../styles/default.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import ImageCarousel from "../components/Carosuel/ImageCarousel";

function LandingPage() {
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
        console.error(err);
      }
    };

    fetchWeather();
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <div className="weather-section">
          {error && <p>{error}</p>}
          {weather ? (
            <div>
              <h2>Current Weather in {weather.name}</h2>
              <p>Temperature: {weather.main.temp} °F</p>
              <p>Weather: {weather.weather[0].description}</p>
            </div>
          ) : (
            <p>Loading weather...</p>
          )}
        </div>
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
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/cashier" element={<CashierPage />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
