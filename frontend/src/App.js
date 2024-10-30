import Navbar from './Navbar';
import Home from './Home';
import EndNavbar from './endNavbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';



function App() {
// react cannot output Objects or boolean values
  
  return (
  
    <div className="App">
      <Navbar/>
      <br></br>
  
      <hr></hr>
      <div className="content">
      <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </Router>
        <br></br>
        <br></br>
      </div>
      <hr></hr>
      <br></br>
      
     <EndNavbar/>
      

    </div>
    
  ); 
}

export default App;
