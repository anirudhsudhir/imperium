import Navbar from './Navbar';
import Home from './Home';
import EndNavbar from './endNavbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Main from './main';



function App() {
// react cannot output Objects or boolean values
  
  return (
    <Router>
  
    <div className="App">
      <Navbar/>
      <br></br>
  
      <hr></hr>
      <br></br>
      <br></br>
      <div className="content">
      
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/main" element={<Main />} />
                
            </Routes>
        
        <br></br>
        <br></br>
      </div>
      <br></br>
      <br></br>
    
      <hr></hr>
      <br></br>
      
      
     <EndNavbar/>
      

    </div>
    </Router>
    
  ); 
}

export default App;
