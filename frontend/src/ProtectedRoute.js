import { Navigate, Outlet } from "react-router-dom";

export const isAuthenticated = () => {
    if (localStorage.getItem('jwt')) {
        return true
    }
    return false
}

const ProtectedRoute = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />
    }
    return <Outlet />
}

export default ProtectedRoute;