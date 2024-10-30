const EndNavbar = () =>{
    return(
        <nav className="endnavbar">
            <div className="links1" style={{ display: 'flex', justifyContent: 'center', gap: '20px' ,          fontFamily: 'Arial, sans-serif', // Change font family here
          fontSize: '16px'}}>
                <a href ="/" style={{
                  color:"grey",
                  textDecoration: "none",  
                }}>Help</a>


                <a href="/create"style={{
                    color:"grey",
                    textDecoration: "none",
                    

                }}>Terms&conditions</a>
                 <a href ="/" style={{
                  color:"grey",
                  textDecoration: "none",
                  
                    
                }}>Privacy</a>
                <a href ="/" style={{
                  color:"grey",
                  textDecoration: "none",
                    
                }}>Guidelines</a>


            </div>
        </nav>


    );
}
export default EndNavbar;