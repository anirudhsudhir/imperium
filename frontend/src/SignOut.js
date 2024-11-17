import { Navigate } from "react-router-dom"
import { FELandingRoute } from "./AppRoutes";

const SignOut = () => {
    localStorage.removeItem('jwt');
    return <>
        <Navigate to={FELandingRoute} replace />
    </>
}

export default SignOut;