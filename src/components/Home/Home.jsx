import React, { useState } from 'react';
import './Home.css';
import Cookies from 'js-cookie';
import Login from '../Login/Login';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(true);
 
 
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
      }

    return (
        <div>
           <div className='grid-container'>
           <Header OpenSidebar={OpenSidebar}/>
    </div>
        <div className='grid-container'>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    </div>
   
      </div>
    );
      
  
};

export default Home;
