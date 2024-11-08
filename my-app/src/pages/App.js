import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import MenuPage from "./Menu";
import FoodPage from "./Food"
import "../styles/default.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import ImageCarousel from "../components/Carosuel/ImageCarousel";

function LandingPage() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
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
      </Routes>
    </Router>
  );
}

export default App;
