import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth.ts";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, checkAuth } = useAuth();

    const isAuth = isAuthenticated || checkAuth();

    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
