import React, { useState } from 'react';
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
