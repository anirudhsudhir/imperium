import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        fontSize: '16px'
      }}>

        <Link to="/"> Help</Link>

      </div>
    </footer>
  );
}
export default Footer;