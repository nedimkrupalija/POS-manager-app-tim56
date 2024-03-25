import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ onClientApp }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Izvršava se redirekcija na Login stranicu
        navigate('/');
    };

    return (
        <div className="button-container">
            <button onClick={() => window.location.href = "https://pos-employees-app-tim56.vercel.app"}>
                Client app
            </button>
            <button onClick={handleLogout}>Odjava</button>
        </div>
    );
};

export default Home;
