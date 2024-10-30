const  Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>IMPERIUM</h1>
            <div className="links" style = {{fontSize:"20px"}}>
                <a href="/signin" style = {{
                    color:"black",
                    
                }}>Home</a>

                
                <a href = "/create" style= {{
                    color:"black",

                }}>Sign-up</a>
                <a href = "/signin" style= {{
                    color:"black",

                }}>Login</a>

             </div>
        </nav>
     );
}
 
export default  Navbar;