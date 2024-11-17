import React from 'react';
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="Landing" style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div className='landing-header'>
                <h2>Imagination is vocalized through text</h2>
            </div>

            <div className='landing-content' style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em'
            }}>
                Welcome to Imperium. A place to read, write and access information about the growing world.
                <div className='landing-links'>
                    <Link to="/signin">Start your journey!</Link>
                </div>
            </div>
        </div>
    );
}

export default Landing;
