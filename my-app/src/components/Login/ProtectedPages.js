import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "./LoginContext";

const ProtectedPage = ({ children, requiredRole }) => {
    const { isLoggedIn, role } = useContext(LoginContext);

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    if (role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedPage;
