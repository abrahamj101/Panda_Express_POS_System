import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import CustomerPage from "./Customer";
import "../styles/App.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import ImageCarousel from "../components/Carosuel/ImageCarousel";

function LandingPage() {
  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <ImageCarousel />

        <Link to="/customer">
          <button className="order-btn">ORDER NOW!</button>
        </Link>
      </main>

      <Footer />
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
