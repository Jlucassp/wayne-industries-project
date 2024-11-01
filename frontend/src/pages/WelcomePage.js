import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/WelcomePage.css'

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-page">
            <h1>Indústrias Wayne</h1>
            <div className="buttons">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Registro</button>
            </div>
        </div>
    );
}

export default WelcomePage;