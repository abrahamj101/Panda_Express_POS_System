import { Link } from 'react-router-dom'; // Import the Link component for client-side navigation

// BackButton Component: Provides a navigation button to return to a specified location
// Props: 
// - location: The URL path to navigate to when the button is clicked
/**
 * BackButton component renders a button that navigates the user back to the specified location.
 * @component
 * @param {{ location: string }} props - The props for the component.
 * @returns {JSX.Element} The rendered BackButton component.
 */
const BackButton = ({ location }) => {
  return (
    // Link component wraps the button to enable navigation without reloading the page
    <Link to={location} style={{ textDecoration: 'none' }}> 
      {/* Inline style to remove the default underline from the link */}
      <button className="button">
        Go Back {/* Text displayed on the button */}
      </button>
    </Link>
  );
};

export default BackButton; // Export the component for use in other parts of the application
