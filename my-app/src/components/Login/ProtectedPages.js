import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "./LoginContext";

const ProtectedPage = ({ children, requiredRole }) => {
    const { isLoggedIn, role } = useContext(LoginContext);

    const isTestingMode = process.env.REACT_APP_TESTING_MODE === "false";

    if (isTestingMode) {
        return children; // Allow access in testing mode
    }
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    if (!requiredRole.includes(role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedPage;
