import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="nav">
            <div className="nav-header">
                <Link className="nav-link" to="/">Imperium</Link>
            </div>
            <div className="nav-links-container">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/signin">Sign In</Link>
                <Link className="nav-link" to="/signup">Sign Up</Link>
            </div>
        </nav>
    );
}

export default Navbar;