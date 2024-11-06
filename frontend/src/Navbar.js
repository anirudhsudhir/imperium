const  Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>IMPERIUM</h1>
            <div className="links" style = {{fontSize:"20px"}}>
                <a href="/signin" style={{ color: "black" }} >
                <img
                        src="home_app_logo_25dp_696969_FILL0_wght400_GRAD0_opsz24.ico" 
                        alt="Home Icon"
                        style={{ width: "30px", height: "30px" , verticalAlign: "middle"  }} 
                    />
                       Home </a>

                
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