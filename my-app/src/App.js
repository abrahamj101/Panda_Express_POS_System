import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
        <button className="login-btn">Login</button>
      </header>

      <main className="main-content">
        <div className="carousel">
          <p>
            *Some type of carousel that will show previews of different menu
            items*
          </p>
        </div>

        <Link to="/customer">
          <button className="order-btn">ORDER NOW!</button>
        </Link>
      </main>

      <footer className="footer">
        <p>*Contact Info*</p>
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
