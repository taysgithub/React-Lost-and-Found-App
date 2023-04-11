// React
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
// Hook
import useAuth from "../Hook/useAuth";

export const RequireAuth = () => {
    const {user} = useAuth();
    const location = useLocation();

    useEffect(() => {

    }, [user]);

    return (
        user ? <Outlet /> : <Navigate to={'/auth'} state={{ from: location}} replace />
    )
}