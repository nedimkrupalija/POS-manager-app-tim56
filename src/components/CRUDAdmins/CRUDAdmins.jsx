import React, { useState, useEffect } from 'react';
import './CRUDAdmins.css';
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/delete.png'
import {Link} from "react-router-dom"


const CRUDAdmins = () => {
    const [tableVisible, settableVisible] = useState(true);

const fetchAdmins = async () => {
    try {
        const response = await fetch('http://localhost:3000/admin/administators', {
            headers: {
                'Authorization': `${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error fetching administators');
        }
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error(error);
    }
};
    return (
        <>
            <div className='list'>
                <h2 className='users-title'>{tableVisible ? "ADMINS" : "Create new admin"}</h2>
                <div className="buttons-container">
                    <button disabled={tableVisible} className={tableVisible ? 'buttons' : 'buttons1'} onClick={() => { settableVisible(true); fetchAdmins(); }}>List admins</button>
                    <button disabled={!tableVisible} className={tableVisible ? 'buttons1' : 'buttons'} onClick={() => { settableVisible(false) }}>Create new</button>
                </div>
                {tableVisible && <div className='table'>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Phone Number</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                }
            </div>

            {!tableVisible && <div className='create'>
                <div className='createFields'>
                    <label htmlFor="username" className='fields'>Username:</label>
                    <input type="text" id="usernameCreate" className="username-input" placeholder="Username" />
                    <br />
                    <label htmlFor="password" className='fields'>Password:</label>
                    <input type="password" id="passwordCreate" className="password-input" placeholder="Password" />
                    <br />
                    <label htmlFor="phone" className='fields'>Phone Number:</label>
                    <input type="text" id="phoneCreate" className="phone-input" placeholder="Phone Number" />
                </div>
                <button className='button2'>Create</button>
            </div>
            }

            {/*  <div className='edit'>
                <h2>Edit admin</h2>
                <button className='buttons1'>List admins</button>
                <div className='createFields'>
                    <label htmlFor="username" className='fields'>Username:</label>
                    <input type="text" id="usernameEdit" className="username-input" placeholder="Username" />
                    <br />
                    <label htmlFor="password" className='fields'>Password:</label>
                    <input type="password" id="passwordEdit" className="password-input" placeholder="Password" />
                    <br />
                    <label htmlFor="phone" className='fields'>Phone Number:</label>
                    <input type="text" id="phoneEdit" className="phone-input" placeholder="Phone Number" />
                </div>
                <button className='button2'>EDIT</button>
        </div> */}

        </>
    );
};

export default CRUDAdmins;