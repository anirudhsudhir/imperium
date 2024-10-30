import React from 'react';
import { useNavigate } from "react-router-dom";




const Home = () => {
    //let name1 = "Kratos"; // this value isnt reactive hence it doesn't change on template

    const navigate = useNavigate()

    const handleClick = () => {
      
        navigate("/signin");     // Navigate to the sign-in page
    };
    

    
    return (
        <div className="Home">
            <h2>Imagination is vocalized <br></br>
            through text</h2>
            <br></br>
    
            <p>Dear User, Welcome to our Blog-website.<br></br> A place to read ,write and access information about the growing World</p>
            <br></br>
            <button onClick = {()=>handleClick(1)}>Start your Journey</button>
            

            
            

        </div>
      );
}
 
export default Home;
