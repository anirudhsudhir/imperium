import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='app-header'>
        <Navbar />
      </div>

      <div className='app-content'>
        <Outlet />
      </div>

      <div className='app-footer'>
        <Footer />
      </div>
    </div >
  );
}

export default App;
