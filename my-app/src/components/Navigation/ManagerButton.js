import { Link } from "react-router-dom"; // Import Link for navigation
import LoginContext from "../Login/LoginContext"; // Import LoginContext to access login state
import { useContext } from "react"; // Import useContext hook to consume context

// ManagerButton Component: Displays a "Manager" link if the user is logged in
const ManagerButton = () => {
  const { isLoggedIn } = useContext(LoginContext); // Destructure isLoggedIn state from LoginContext

  return (
    <div>
      {/* Conditional rendering: Only show the Manager link if the user is logged in */}
      {isLoggedIn ? (
        <>
          {/* Link to the Manager page */}
          <Link to="/Manager" className="header-buttons">
            <p>Manager</p> {/* Text displayed as "Manager" */}
          </Link>
        </>
      ) : (
        <></> // Render nothing if the user is not logged in
      )}
    </div>
  );
};

export default ManagerButton; // Export the ManagerButton component for reuse
