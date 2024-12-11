import { Link } from "react-router-dom"; // Import Link component for navigation
import LoginContext from "../Login/LoginContext"; // Import LoginContext to check login status
import { useContext } from "react"; // Import useContext to use context API

// Component to conditionally render the "Order History" link based on login status
/**
 * @description OrderHistory component that conditionally renders a link to the Order History page.
 * The button is only displayed if the user is logged in.
 * @component
 * @returns {JSX.Element} The rendered OrderHistory component.
 */
const OrderHistory = () => {
  // Retrieve the 'isLoggedIn' state from LoginContext
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <div>
      {/* Check if the user is logged in */}
      {isLoggedIn ? (
        <>
          {/* If logged in, display a link to the Order History page */}
          <Link to="/order-history" className="header-buttons">
            <p>Order History</p>
          </Link>
        </>
      ) : (
        // If not logged in, render nothing (empty fragment)
        <></>
      )}
    </div>
  );
};

export default OrderHistory; // Export the component for use in other parts of the app
