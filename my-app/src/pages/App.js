import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MenuPage from "./Menu";
import FoodPage from "./Food";
import OrderHistoryPage from "./OrderHistory";
import ManagerPage from "./Manager/Manager";
import FoodItemPage from "./Manager/Fooditem";
import MenuItemPage from "./Manager/Menuitem";
import OrderPage from "./Manager/Order";
import CheckoutPage from "./Checkout";
import InventoryPage from "./Manager/Inventory";
import EmployeePage from "./Manager/Employee"
import "../styles/Pages/default.css";
import "../styles/Accessibility/Weather.css";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import ImageCarousel from "../components/Carosuel/ImageCarousel";
import { CartContextProvider } from "../components/Cart/CartContext";
import useWeather from "./api/weather/weatherApi";
import WeatherWidget from "../components/weather/WeatherWidget";
import { ZoomProvider, useZoom } from "../components/Zoom/ZoomContext";
import AccessibilityButton from "../components/Navigation/AccessibilityButton";
import { LoginProvider } from "../components/Login/LoginContext";
import LoginContext from "../components/Login/LoginContext";
import { useContext } from "react";


function LandingPage() {
  const { weather, error } = useWeather("College Station");
  const { zoomLevel } = useZoom();
  const { isLoggedIn, role} = useContext(LoginContext);

  return (
    <div
      className="App"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <div className="main-content">
        <WeatherWidget weather={weather} error={error} />
        <ImageCarousel />
        <div className="button-container">
          <Link to="/menu">
            <button className="order-btn">ORDER NOW!</button>
          </Link>
          { isLoggedIn && (role === "manager" || role === "admin") ? (
            <Link to="/manager">
              <button className="order-btn">MANAGER BRUH!</button>
            </Link>
            ) : (
              <></>
            )}
          </div>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LoginProvider>
      <ZoomProvider>
        <CartContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/food" element={<FoodPage />} />
              <Route path="/order-history" element={<OrderHistoryPage />} />
              <Route path="/manager" element={<ManagerPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Manager pages */}
              <Route path="/manager/employee" element={<EmployeePage />} />
              <Route path="/manager/order" element={<OrderPage />} />
              <Route path="/manager/fooditem" element={<FoodItemPage />} />
              <Route path="/manager/menuitem" element={<MenuItemPage />} />
              <Route path="/manager/inventory" element={<InventoryPage />} />
            </Routes>
            <AccessibilityButton />
          </Router>
        </CartContextProvider>
      </ZoomProvider>
    </LoginProvider>
  );
}

export default App;