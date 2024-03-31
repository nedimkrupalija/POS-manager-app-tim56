import React, { useState } from 'react';
import './CRUDUsers.css';

const CRUDUsers = () => {
    return (
        <>
        <div className='list'>
            <h2>USERS</h2>
            <button className='buttons1'>CREATE NEW</button>
            <div className='table'>
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
                        <tr>
                            <td>1</td>
                            <td>tajra</td>
                            <td>060111333</td>
                            <td>tajra</td>
                            <td>Admin</td>
                            <td>
                                <button className='buttons'>EDIT</button>
                                <button className='buttons'>DELETE</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>amina</td>
                            <td>060111333</td>
                            <td>amina</td>
                            <td>Admin</td>
                            <td>
                                <button className='buttons'>EDIT</button>
                                <button className='buttons'>DELETE</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className='create'>
            <h2>CREATE NEW USER</h2>
            <button className='buttons1'>LIST USERS</button>
            <div className='createFields'>
                <label htmlFor="username" className='fields'>Username:</label>
                <input type="text" id="usernameCreate" className="username-input" placeholder="Username" />
                <br />
                <label htmlFor="password" className='fields'>Password:</label>
                <input type="text" id="passwordCreate" className="password-input" placeholder="Password" />
                <br />
                <label htmlFor="phone" className='fields'>Phone Number:</label>
                <input type="text" id="phoneCreate" className="phone-input" placeholder="Phone Number" />
            </div>
            <button className='button2'>CREATE</button>
        </div>

        <div className='edit'>
        <h2>EDIT USER</h2>
            <button className='buttons1'>LIST USERS</button>
            <div className='createFields'>
                <label htmlFor="username" className='fields'>Username:</label>
                <input type="text" id="usernameEdit" className="username-input" placeholder="Username" />
                <br />
                <label htmlFor="password" className='fields'>Password:</label>
                <input type="text" id="passwordEdit" className="password-input" placeholder="Password" />
                <br />
                <label htmlFor="phone" className='fields'>Phone Number:</label>
                <input type="text" id="phoneEdit" className="phone-input" placeholder="Phone Number" />
            </div>
            <button className='button2'>EDIT</button>
        </div>

        </>
    );
};

export default CRUDUsers;