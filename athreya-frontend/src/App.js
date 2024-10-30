import Navbar from './navbar';
import Home from './home';
import Signup from './signup';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
function App() {
  /*const temp='Welcome to my New Blog';
  const ll="http://www.google.com";*/
  
  return (
    <Router>
     <div className="App">
      <Navbar />
      <hr></hr>
     <div className='content'>
      <Switch>
        <Route exact path="/">
        <Home />
        </Route>
        <Route path="/signup">
        <Signup />
        </Route>
      </Switch>
     </div>
     <hr></hr>
     <p1>Help</p1>
     <p2>Status</p2>
     <a>About</a>
     <p4>Blog</p4>
     </div>
     </Router>
  );
}

export default App;
