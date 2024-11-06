import { useState , useEffect ,useRef } from "react";

const Mnavbar = () =>{
    const [showDropdown , SetShowdropdown] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () =>{
        SetShowdropdown(!showDropdown);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                SetShowdropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="NAV2" style={{ display: 'flex', alignItems: 'center' }}>
            <h2>IMPERIUM</h2>
            <input
                    type="text"
                    id='in'
                    placeholder="Search..."
                    style={{
                        padding: '5px 5px 5px 30px',
                        marginLeft: '15px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #F4F0D6',
                        outline: 'none',
                        backgroundColor: '#F3EFD7',
                        backgroundImage: 'url(search_27dp_696969_FILL0_wght400_GRAD0_opsz24.png)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '5px center',  
                        backgroundRepeat: 'no-repeat'

                    }}
                />
     <div className="Mnav" style = {{fontSize : '18px'}}>

     
     <a href="/signin" style={{ color: "black",marginRight: '23px' }} >
     <img
                        src="edit_square_30dp_000000_FILL0_wght300_GRAD0_opsz24.png" 
                        alt="Home Icon"
                        style={{ width: "23px", height: "23px" , verticalAlign: "middle" ,backgroundColor:'#F5F4EC' }} 
                    />
                       Write </a>   

                
            
                <a href = "/signin" style= {{
                    color:"black",marginRight: '23px'

                }}><img
                src="notifications_30dp_00_FILL0_wght300_GRAD0_opsz24.png" 
                alt="Home Icon"
                style={{ width: "29px", height: "29px" , verticalAlign: "middle" ,backgroundColor:'#F5F4EC' }} 
            />
                    </a>
                    <div style={{ position: 'relative', display: 'inline-block' }}>   
                <a href = "#!" onClick={toggleDropdown} style= {{color:"black"}}>
                    <img
                        src="account_circle_30dp_000000_FILL0_wght300_GRAD0_opsz24.png" 
                        alt="Home Icon"
                        style={{ width: "29px", height: "29px" , verticalAlign: "middle" ,backgroundColor:'#F5F4EC' }} 
                    />
                   </a>

                   {showDropdown && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                backgroundColor: '#F5F4EC',
                                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                                zIndex: 1,
                                padding: '10px',
                                borderRadius: '5px',
                                padding: '0px',
                                width: '180px',
                                height: '400px',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <a href="/profile" style={{ color: 'black', display: 'block', padding: '8px 0',backgroundColor: '#F5F4EC',fontSize:'15px' ,paddingLeft: '15px'}}>
                            <img
                        src="person_30dp_696969_FILL0_wght300_GRAD0_opsz24.png" 
                        alt="Home Icon"
                        style={{ width: "25px", height: "25px" , verticalAlign: "middle" ,backgroundColor:'#F5F4EC',marginRight: '8px' }} 
                    />Profile</a>
                            <a href="/settings" style={{ color: 'black', display: 'block', padding: '8px 0',backgroundColor: '#F5F4EC',fontSize:'15px' ,paddingLeft: '15px'}}>
                            <img
                        src="settings_30dp_696969_FILL0_wght300_GRAD0_opsz24.png" 
                        alt="Home Icon"
                        style={{ width: "25px", height: "25px" , verticalAlign: "middle" ,backgroundColor:'#F5F4EC',marginRight: '8px'  }} 
                    />Settings</a>
                    <a href="/signin" style={{ color: 'black', display: 'block', padding: '8px 0',backgroundColor: '#F5F4EC',fontSize:'15px',paddingLeft: '15px' }}>
                            <img
                        src="monitoring_30dp_696969_FILL0_wght300_GRAD0_opsz24.png" 
                        alt="Home Icon"
                        style={{ width: "25px", height: "25px" , verticalAlign: "middle" ,backgroundColor:'#F5F4EC',marginRight: '8px' }} 
                    />Stats</a>
                       
                   
                            <a href="/signin" style={{ color: 'black', display: 'block', padding: '8px 0',backgroundColor: '#F5F4EC',fontSize:'15px',paddingLeft: '15px' }}>
                            <img
                        src="logout_30dp_696969_FILL0_wght400_GRAD0_opsz24 (1).png" 
                        alt="Home Icon"
                        style={{ width: "25px", height: "25px" , verticalAlign: "middle" ,backgroundColor:'#F5F4EC',marginRight: '8px' }} 
                    />Logout</a>
                     </div>
                     )}
                    


     </div>
     </div>
     </div>

    );
};

export default  Mnavbar;