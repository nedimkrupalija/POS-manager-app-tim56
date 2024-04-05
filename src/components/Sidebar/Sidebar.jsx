import React, { useState, useEffect } from 'react';
import 
{BsCart3, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs';
 import './Sidebar.css';
 import { jwtDecode } from "jwt-decode";
 import Cookies from 'js-cookie';

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const [role, setRole] = React.useState("");
    useEffect(() => {
        const token = Cookies.get("jwt");
        const decodedToken = jwtDecode(token);
     setRole(decodedToken.role);
  },[]);
  const userRole=()=>{
    if(role=="superadmin")
    return true;
return false;
  };
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> Point of Sale software
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
          
            <li className='sidebar-list-item'>
                <a href="./items">
                    <BsFillArchiveFill className='icon'/> Products
                </a>
            </li>
          
            <li className='sidebar-list-item'>
                <a href="./users">
                    <BsPeopleFill className='icon'/> Users
                </a>
            </li> 
             {
                userRole() && (
                    <li className='sidebar-list-item'>
                    <a href="./administrators">
                        <BsMenuButtonWideFill className='icon'/> Administrators
                    </a>
                </li>
                )
            }
            <li className='sidebar-list-item'>
                <a href="./orders">
                    <BsListCheck className='icon'/> Orders
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="./locations">
                    <BsMenuButtonWideFill className='icon'/> Storage places, locations and POS
                </a>
            </li>
          
            
        </ul>
    </aside>
  )
}

export default Sidebar