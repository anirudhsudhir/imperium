import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="Home">
      <div className='home-header'>
        <Navbar />
      </div>

      <div className='home-content'>
        <Outlet />
      </div>

      <div className='home-footer'>
        <Footer />
      </div>
    </div >
  );
}

export default App;
