import React, { useState, useEffect } from 'react';
import './CRUDUsers.css';
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/delete.png'

const CRUDUsers = () => {
    const [tableVisible, settableVisible] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("Effecttt")
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/users', {
                headers: {
                    // This token is used for testing purposes
                    'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTI1Mjc5LCJleHAiOjE3MTE5MjcwNzl9.Pd6la-fXxv8fIhrWZPfLsXV0aj-tGLay-Xe6YJZbg38`
                }
            });
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            const data = await response.json();
            setUsers(data)
        } catch (error) {
            console.error(error);
        }
    };

    const createUser = async () => {
        const username = document.getElementById('usernameCreate').value;
        const password = document.getElementById('passwordCreate').value;
        const phoneNumber = document.getElementById('phoneCreate').value;
        const role = 'user';

        try {
            const response = await fetch('http://localhost:3000/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTI1Mjc5LCJleHAiOjE3MTE5MjcwNzl9.Pd6la-fXxv8fIhrWZPfLsXV0aj-tGLay-Xe6YJZbg38`
                },
                body: JSON.stringify({ username, password, phoneNumber, role })
            });
            if (!response.ok) {
                throw new Error('Error creating user');
            }
            const responseData = await response.json();
            console.log(responseData);
            fetchUsers(); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='list'>
                <h2 className='users-title'>{tableVisible ? "USERS" : "CREATE NEW USER"}</h2>
                <div className="buttons-container">
                    <button disabled={tableVisible} className={tableVisible ? 'buttons' : 'buttons1'} onClick={() => { settableVisible(true); fetchUsers(); }}>LIST USERS</button>
                    <button disabled={!tableVisible} className={tableVisible ? 'buttons1' : 'buttons'} onClick={() => { settableVisible(false) }}>CREATE NEW</button>
                </div>
                {tableVisible && (
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
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.password}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <div className='actions-containter'>
                                                <img src={edit_icon} alt="Edit" className='edit-icon' />
                                                <img src={delete_icon} alt="Delete" className='delete-icon' />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
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
                <button className='button2' onClick={createUser}>CREATE</button>
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

export default CRUDUsers;