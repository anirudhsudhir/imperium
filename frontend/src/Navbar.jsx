import { Link } from "react-router-dom";
import './Navbar.css';
import { isAuthenticated } from './ProtectedRoute';
import { FEAuthAccountRoute, FEAuthHomeRoute, FEAuthMyBlogsRoute, FEAuthSignOutRoute, FEAuthWriteRoute, FELandingRoute, FESignInRoute, FESignUpRoute } from "./RouteDefinitions";

const Navbar = () => {
    return (
        <nav className="nav">
            <div className="nav-header">
                {
                    !isAuthenticated() ?
                        <Link className="nav-link" to={FELandingRoute}>Imperium</Link> :
                        <Link className="nav-link" to={FEAuthHomeRoute}>Imperium</Link>
                }
            </div>
            <div className="nav-links-container">
                {
                    !isAuthenticated() ?
                        <>
                            <Link className="nav-link" to={FELandingRoute}>Home</Link>
                            <Link className="nav-link" to={FESignInRoute}>Sign In</Link>
                            <Link className="nav-link" to={FESignUpRoute}>Sign Up</Link>
                        </> :
                        <>
                            <Link className="nav-link" to={FEAuthHomeRoute}>All Blogs</Link>
                            <Link className="nav-link" to={FEAuthMyBlogsRoute}>My Blogs</Link>
                            <Link className="nav-link" to={FEAuthWriteRoute}>Write</Link>
                            <Link className="nav-link" to={FEAuthAccountRoute}>Account</Link>
                            <Link className="nav-link" to={FEAuthSignOutRoute}>Sign Out</Link>
                        </>
                }
            </div>
        </nav >
    );
}

export default Navbar;