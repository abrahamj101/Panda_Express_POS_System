import logo from "../../images/panda-express-logo-1.svg"; // Import the Panda Express logo image
import { Link } from "react-router-dom"; // Import Link for navigation without page reloads

/**
 * HomeButton component that displays the logo and name of the application.
 * Navigates to the home page when clicked.
 * @component
 * @returns {JSX.Element} The rendered HomeButton component.
 */
const HomeButton = () => {
    return (
        <div className="logo"> {/* Container for the logo and name */}
            <Link to="/"> {/* Link component navigates to the home page ("/") */}
                {/* Logo Image */}
                <img src={logo} alt="Panda Express Logo" /> {/* Add alternative text for accessibility */}
                {/* Company Name */}
                <h1 className="panda-name">Panda Express</h1> {/* Styled company name */}
            </Link>
        </div>
    );
};

export default HomeButton; // Export the HomeButton component for use in other parts of the application
