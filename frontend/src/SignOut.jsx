import { Navigate } from "react-router-dom";
import { FELandingRoute } from "./RouteDefinitions";

const SignOut = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  return (
    <>
      <Navigate to={FELandingRoute} replace />
    </>
  );
};

export default SignOut;
