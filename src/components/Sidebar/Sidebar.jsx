import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { BsCart3, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill} from 'react-icons/bs';
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
                    <Link to="/items"> {/* Change href to 'to' */}
                        <BsFillArchiveFill className='icon'/> Products
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/users"> {/* Change href to 'to' */}
                        <BsPeopleFill className='icon'/> Users
                    </Link>
                </li> 
                {userRole() && (
                    <li className='sidebar-list-item'>
                        <Link to="/administrators"> {/* Change href to 'to' */}
                            <BsMenuButtonWideFill className='icon'/> Administrators
                        </Link>
                    </li>
                )}
                <li className='sidebar-list-item'>
                    <Link to="/orders"> {/* Change href to 'to' */}
                        <BsListCheck className='icon'/> Orders
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/locations"> {/* Change href to 'to' */}
                        <BsMenuButtonWideFill className='icon'/> Storage places, locations and POS
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
