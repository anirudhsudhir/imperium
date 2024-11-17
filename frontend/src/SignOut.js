import { Navigate } from "react-router-dom"

const SignOut = () => {
    localStorage.removeItem('jwt');
    return <>
        <Navigate to="/" replace />
    </>
}

export default SignOut;