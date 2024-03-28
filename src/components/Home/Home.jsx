import React, { useState } from 'react';
import './Home.css';
import Cookies from 'js-cookie';
import Login from '../Login/Login';

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(true);

    const handleLogout = () => {
        Cookies.remove('jwt');
        setLoggedIn(false);
    };
    if (!loggedIn) {
        return <Login />;
    }
    const handleClientApp = () => {
        Cookies.remove('jwt');
        window.location.href = "https://pos-employees-app-tim56.vercel.app";
    }

    return (
        <div className="button-container">
            <button onClick={handleClientApp}>
                Client app
            </button>
            <button onClick={handleLogout}>Odjava</button>
        </div>
    );
};

export default Home;
