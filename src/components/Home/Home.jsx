import React, { useState, useEffect } from 'react';
import './Home.css';
import Cookies from 'js-cookie';
import Login from '../Login/Login';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Home = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    useEffect(() => {
        Cookies.set("jwt","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjMxMTA3NSwiZXhwIjoxNzEyMzEyODc1fQ.y1uNJz9H6Hh_mXavgUMiu-s1w-UjZ4XARNje_wb8js8");
    }, []);
    return (
        <div>
            <Header OpenSidebar={OpenSidebar}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Home;