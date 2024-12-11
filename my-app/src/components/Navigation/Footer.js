/**
 * @description Footer component renders the footer section of the page with contact information.
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
      <footer className="footer"> {/* Footer section styled with the "footer" class */}
          <p>
              300 Polo Rd Room 129, College Station, TX 77840 {/* Address */}
          </p>
          <p>
              <b>(979) 773-8811</b> {/* Phone number in bold */}
          </p>
      </footer>
  );
};

export default Footer; // Export the Footer component for reuse in the application
