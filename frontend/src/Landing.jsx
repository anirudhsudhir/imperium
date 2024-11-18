import React from 'react';
import { Link } from "react-router-dom";
import { FEAuthHomeRoute, FESignInRoute } from './RouteDefinitions';
import { isAuthenticated } from './ProtectedRoute';

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
                    {
                        !isAuthenticated() ?
                            <Link to={FESignInRoute}>Start your journey!</Link> :
                            <Link to={FEAuthHomeRoute}>Start your journey!</Link>
                    }
                </div>
            </div>
        </div>
    );
}

export default Landing;
