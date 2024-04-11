import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import {BsCart3, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsPercent} from 'react-icons/bs';
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
        if(role === "superadmin")
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
                                 <Link to="/items"> 
   <li className='sidebar-list-item'>
                        <BsFillArchiveFill className='icon'/> Products
                </li>                        </Link>
                <Link to="/users"> 

                <li className='sidebar-list-item'>
                        <BsPeopleFill className='icon'/> Users
                </li>                     </Link>

                {userRole() && (           
                                 <Link to="/administrators"> 

                    <li className='sidebar-list-item'>
                            <BsMenuButtonWideFill className='icon'/> Administrators
                    </li>                        </Link>

                )}  <Link to="/orders"> 
                <li className='sidebar-list-item'>
                  
                        <BsListCheck className='icon'/> Orders
                </li>            
                        </Link>
                    <Link to="/locations"> 

                <li className='sidebar-list-item'>
                        <BsMenuButtonWideFill className='icon'/> Storage places, locations and POS
                </li>                    </Link>
                    <Link to="/vat">

                <li className='sidebar-list-item'>
                        <BsPercent className='icon'/> VAT groups
                </li>     
                               </Link>

            </ul>
        </aside>
    );
}

export default Sidebar;
