import { useAuth } from "@features/auth/hooks";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export const AuthRoutes: React.FC = () => {
    const { isAuthenticated /*, isLoading */ } = useAuth();

    console.log("isAuthenticated", isAuthenticated);

    // Optional: show loading screen if auth status is still being determined
    // if (isLoading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
