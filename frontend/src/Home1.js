const Home = () => {
    
    const handleClick = (e) => {
        console.log('Hello, Welcome to the new React based website',e);
    }
    const handleClickagain = (name,e) =>{
        console.log("Ah! You are the bloody "+ name,e.target);
    }
    return (
        <div className="Home">
            <h2>This is Homepage</h2>
            <button onClick = {handleClick }>Click me</button>
            <button onClick ={(e)=>handleClickagain("Ghost of Sparta!!",e)}>Click me again</button>

        </div>
      );
}
 
export default Home;
