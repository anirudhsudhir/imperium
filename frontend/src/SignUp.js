import React, { useState } from 'react';
import './signin.css';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const back = () => {
        navigate('/');
    };

    // Validation function
    const validateSignIn = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            alert('Please enter a valid email address.');
            return false;
        }
        if (password.length < 10) {
            alert('Password must be at least 10 characters long.');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleSign = (event) => {
        event.preventDefault();

        if (!validateSignIn()) {
            return; 
        }

        setIsLoading(true); 
        setTimeout(() => {
            setIsLoading(false);
            navigate('/main');
        }, 3500);
    };

    return (
        <div className="main-container">
            {isLoading && (
                <div className="loading-screen">
                    <div className="loading-content">
                        <RingLoader
                            className='ring1'
                            color="#6373CE"
                            speedMultiplier={1.5}
                            size={240}
                            css={{ backgroundColor: 'rgb(255, 255,255)' }}
                        />
                        <br />
                        <br />
                        <p className='txt1'>We are Signing you in...!</p>
                    </div>
                </div>
            )}

            <div className="sign-in">
                <h2>Login To Your Account</h2>
                <h4>Login using Social networks</h4>
                <br />
                <div className="social-buttons">
                    <button id="B2">G+</button>
                    <button id="B4">f</button>
                    <button id="B5">in</button>
                </div>

                <form id="h" onSubmit={handleSign}>
                    <div className="divider">
                        <hr />
                        <span className="divider-text">OR</span>
                    </div>
                    <br />
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error message */}
                    <label htmlFor="username">Username: </label>
                    <input
                        type="email"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                    <i
                        className="far fa-eye"
                        id="togglePassword"
                        onClick={togglePasswordVisibility}
                        style={{ marginLeft: '-30px', cursor: 'pointer', backgroundColor: '#BEECE6' }}
                    ></i>
                    <br />
                    <div className="form-buttons">
                        <button type="button" id="sign-in" onClick={back}>
                            Go Back
                        </button>
                        <button
                            type="submit"
                            id="go-back"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign-in'}
                        </button>
                        <button type="button" id="create_acc">
                            Don't have an Account?
                        </button>
                    </div>
                </form>
            </div>

            <div className="other-container">
                {/* Background image will still be visible even when loading */}
            </div>
        </div>
    );
};

export default SignIn;

