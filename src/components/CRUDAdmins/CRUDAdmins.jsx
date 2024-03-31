import React, { useState } from 'react';
import './CRUDAdmins.css';
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/delete.png'

const CRUDAdmins = () => {
    const [tableVisible, settableVisible] = useState(true);
    return (
        <>
            <div className='list'>
                <h2 className='users-title'>{tableVisible ? "ADMINS" : "CREATE NEW ADMIN"}</h2>
                <div className="buttons-container">
                    <button disabled={tableVisible} className={tableVisible ? 'buttons' : 'buttons1'} onClick={() => { settableVisible(true); fetchUsers(); }}>LIST ADMINS</button>
                    <button disabled={!tableVisible} className={tableVisible ? 'buttons1' : 'buttons'} onClick={() => { settableVisible(false) }}>CREATE NEW</button>
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
                            <tr>
                                <td>1</td>
                                <td>admin1</td>
                                <td>060111333</td>
                                <td>admin1</td>
                                <td>Admin</td>
                                <td>
                                    <div className='actions-containter'>
                                        <img src={edit_icon} alt="Edit" className='edit-icon' />
                                        <img src={delete_icon} alt="Delete" className='delete-icon' />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>admin2</td>
                                <td>060111333</td>
                                <td>admin2</td>
                                <td>Admin</td>
                                <td>
                                    <div className='actions-containter'>
                                        <img src={edit_icon} alt="Edit" className='edit-icon' />
                                        <img src={delete_icon} alt="Delete" className='delete-icon' />
                                    </div>
                                </td>
                            </tr>
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
                    <input type="text" id="passwordCreate" className="password-input" placeholder="Password" />
                    <br />
                    <label htmlFor="phone" className='fields'>Phone Number:</label>
                    <input type="text" id="phoneCreate" className="phone-input" placeholder="Phone Number" />
                </div>
                <button className='button2'>CREATE</button>
            </div>
            }

            {/*  <div className='edit'>
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
        </div> */}

        </>
    );
};

export default CRUDAdmins;