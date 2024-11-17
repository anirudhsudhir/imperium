import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { isAuthenticated, handleSignOut } from './ProtectedRoute';

const Navbar = () => {
    return (
        <nav className="nav">
            <div className="nav-header">
                <Link className="nav-link" to="/">Imperium</Link>
            </div>
            <div className="nav-links-container">
                {
                    !isAuthenticated() ?
                        <>
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/signin">Sign In</Link>
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </> :
                        <>
                            <Link className="nav-link" to="/user">All Blogs</Link>
                            <Link className="nav-link" to="/user/myblogs">My Blogs</Link>
                            <Link className="nav-link" to="/user/newblog">Write</Link>
                            <Link className="nav-link" to="/user/account">Account</Link>
                            <Link className="nav-link" to="/user/signout">Sign Out</Link>
                        </>
                }
            </div>
        </nav >
    );
}

export default Navbar;