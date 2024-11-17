import { Navigate } from "react-router-dom";
import { FEAuthHomeRoute, FELandingRoute } from "./AppRoutes";
import App from "./App";

export const isAuthenticated = () => {
    if (localStorage.getItem('jwt')) {
        return true
    }
    return false
}

export const UnProtectedRoute = () => {
    if (!isAuthenticated()) {
        return <App />
    }
    return <Navigate to={FEAuthHomeRoute} replace />
}

export const ProtectedRoute = () => {
    if (!isAuthenticated()) {
        return <Navigate to={FELandingRoute} replace />
    }
    return <App />
}