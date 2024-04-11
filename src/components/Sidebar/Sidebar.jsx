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
                <li className='sidebar-list-item'>
                    <Link to="/items"> 
                        <BsFillArchiveFill className='icon'/> Products
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/users"> 
                        <BsPeopleFill className='icon'/> Users
                    </Link>
                </li> 
                {userRole() && (
                    <li className='sidebar-list-item'>
                        <Link to="/administrators"> 
                            <BsMenuButtonWideFill className='icon'/> Administrators
                        </Link>
                    </li>
                )}
                <li className='sidebar-list-item'>
                    <Link to="/orders"> 
                        <BsListCheck className='icon'/> Orders
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/locations"> 
                        <BsMenuButtonWideFill className='icon'/> Storage places, locations and POS
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/vat">
                        <BsPercent className='icon'/> VAT groups
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
