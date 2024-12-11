// Header.js

import CartIcon from "../Cart/CartIcon.js"; // Component for displaying the cart icon
import CartModal from "../Cart/CartModal.js"; // Modal component for viewing cart details
import "../../styles/Header.css"; // CSS file for styling the header
import AuthButton from "../Login/AuthButton.js"; // Button for authentication (login/logout)
import HomeButton from "./homeButton.js"; // Button to navigate to the home page
import OrderHistory from "./orderHistory.js"; // Component to view order history
import ManagerButton from "./ManagerButton.js"; // Button for manager/admin specific options
import LoginContext from "../Login/LoginContext.js"; // Context for managing login state
import { useContext } from "react"; // React hook to access context

// Header Component: Renders the top navigation bar with dynamic buttons based on login state and user role
function Header() {
  // Destructure the login state and role from LoginContext
  const { isLoggedIn, role } = useContext(LoginContext);

  return (
    <header className="header"> {/* Main header container with styling */}
      <HomeButton /> {/* Always display the Home button */}

      {/* Container for header buttons */}
      <div className="header-buttons">
        {/* Conditional rendering based on login state and user role */}
        {isLoggedIn ? ( // Check if the user is logged in
          role === "manager" || role === "admin" ? ( // If role is manager/admin
            <ManagerButton /> // Display Manager options
          ) : (
            <OrderHistory /> // Otherwise, display the Order History button
          )
        ) : (
          <></> // If not logged in, display nothing
        )}

        {/* Empty div elements for spacing or layout adjustment */}
        <div></div>
        <div></div>
        <div></div>

        {/* Render Cart components only for customers */}
        {isLoggedIn && role !== "customer" ? ( 
          <></> // If logged in but not a customer, display nothing
        ) : (
          <>
            <CartIcon /> {/* Display cart icon */}
            <CartModal /> {/* Display cart modal */}
          </>
        )}

        <AuthButton /> {/* Always display the authentication button */}
      </div>
    </header>
  );
}

export default Header; // Export the Header component for use in other parts of the app