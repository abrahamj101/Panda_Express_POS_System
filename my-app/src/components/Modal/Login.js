import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Modal.css"; // Add styles for the modal

const Login = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        <form>
          <Link to="/manager">
            <button type="button">Manager</button>
          </Link>
          <Link to="/cashier">
            <button>Cashier</button>
          </Link>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Login;
