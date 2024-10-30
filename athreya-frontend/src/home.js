 import { useState } from "react"
const Home = () => {
   const [name,setname]=useState('mario')
   const [age,setage]=useState(21)
    const handleclick=() => {
        setname('dojo')
        setage(25)
    }
    return (
        <div className="home">
            <h1>The Best Headlines😊</h1>
            <p>What you do after you create your content is what truly counts</p>
            <button href='\'>Start Reading</button>
        </div>
      );
 
    }
export default Home;
