import React, { useState } from 'react';
import './signin.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false); // State to track password visibility

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();
    const back = () => {
        navigate(-1); // Navigates to the previous page
    }
    
    return (
        <div className="main-container">
        <div className="sign-in">
            <h2>Login To Your Account</h2>
            <h4>Login using Social networks</h4>
            <br></br>
            <div className="social-buttons">
                <button id="B2">G+</button>
                <button id="B4">f</button>
                <button id="B5">in</button>
            </div>

            <form id="h">
            <div className="divider">
                <hr></hr>
               
                <span className="divider-text">OR</span>
            </div>
            <br></br>
                <label htmlFor="username">Username:  </label>
                <input type="email" id="username" name="username" required />
                <br />
                <label htmlFor="password">Password:   </label>
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" autocomplete="current-password"  required />
                <i className="far fa-eye" id="togglePassword" onClick={togglePasswordVisibility} style={{ marginLeft: '-30px', cursor: 'pointer' ,backgroundColor:'#ECC7BE' }}></i>
                <br />
                <div className="form-buttons">
                    <button type="submit" id="sign-in" onClick={back}>Go Back</button>
                    <button type="button" id="go-back" >Sign-in</button>
                    <button type="button" id="create_acc">Don't have an Account ?</button>
                </div>

            </form>
        </div>
        <div className="other-container">
            </div>
        </div>
    );
};

export default SignIn;

