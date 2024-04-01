import React, { useState, useEffect } from 'react';
import './CRUDUsers.css';
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/delete.png'
import confirm_icon from '../../assets/confirm.png'
import close_icon from '../../assets/close.png'

const CRUDUsers = () => {
    const [tableVisible, settableVisible] = useState(true);
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        console.log("Effecttt")
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const headers = {
                'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTMyNDE4LCJleHAiOjE3MTE5MzQyMTh9.ZnwMu2WBEkl1dCI4uUQPRFU26iRuAWbajFvvkGemDLk`
            };
            const data = await fetchData('GET', 'http://localhost:3000/admin/users', null, headers);
            setUsers(data);
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
            const requestData = { username, password, phoneNumber, role };
            const headers = {
                'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTMyNDE4LCJleHAiOjE3MTE5MzQyMTh9.ZnwMu2WBEkl1dCI4uUQPRFU26iRuAWbajFvvkGemDLk`
            };
            await fetchData('POST', 'http://localhost:3000/admin/users', requestData, headers);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const confirmDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
        }
    };

    const deleteUser = async (id) => {
        try {
            const headers = {
                'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTMyNDE4LCJleHAiOjE3MTE5MzQyMTh9.ZnwMu2WBEkl1dCI4uUQPRFU26iRuAWbajFvvkGemDLk`
            };
            await fetchData('DELETE', `http://localhost:3000/admin/users/${id}`, null, headers);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async (method, url, requestData = null, headers = {}) => {
        try {
            const options = {
                method: method,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                }
            };

            if (requestData) {
                options.body = JSON.stringify(requestData);
            }

            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error fetching data');
            }

            return data;
        } catch (error) {
            throw new Error(error.message || 'Error fetching data');
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
    };

    const handleSaveClick = async () => {
        try {
            if (editingUser) {
                const id = editingUser.id;
                const username = document.getElementById('usernameEdit').value;
                const password = document.getElementById('passwordEdit').value;
                const phoneNumber = document.getElementById('phoneEdit').value;
                const role = document.getElementById('roleEdit').value;

                const requestData = { username, password, phoneNumber, role };
                const headers = {
                    'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTMyNDE4LCJleHAiOjE3MTE5MzQyMTh9.ZnwMu2WBEkl1dCI4uUQPRFU26iRuAWbajFvvkGemDLk`,
                };

                await fetchData('PUT', `http://localhost:3000/admin/users/${id}`, requestData, headers);
                fetchUsers();
                setEditingUser(null);
            }
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
                                        <td className="editable-cell">
                                            {editingUser === user ? (
                                                <input id="usernameEdit" type="text" defaultValue={user.username} className="editable-input" />
                                            ) : (
                                                user.username
                                            )}
                                        </td>
                                        <td className="editable-cell">
                                            {editingUser === user ? (
                                                <input id="phoneEdit" type="text" defaultValue={user.phoneNumber} className="editable-input" />
                                            ) : (
                                                user.phoneNumber
                                            )}
                                        </td>
                                        <td className="editable-cell">
                                            {editingUser === user ? (
                                                <input id="passwordEdit" type="text" defaultValue={user.password} className="editable-input" />
                                            ) : (
                                                user.password
                                            )}
                                        </td>
                                        <td className="editable-cell">
                                            {editingUser === user ? (
                                                <select id="roleEdit" defaultValue={user.role} className="editable-input">
                                                    <option value="admin">admin</option>
                                                    <option value="user">user</option>
                                                </select>
                                            ) : (
                                                user.role
                                            )}
                                        </td>
                                        <td>
                                            <div className='actions-containter'>
                                                {
                                                    editingUser === user
                                                        ? <img onClick={() => handleSaveClick()} src={confirm_icon} alt="Confirm" className='confirm-icon' />
                                                        : <img onClick={() => handleEditClick(user)} src={edit_icon} alt="Edit" className='edit-icon' />
                                                }
                                                {
                                                    editingUser === user
                                                        ? <img onClick={() => setEditingUser(null)} src={close_icon} alt="Close" className='close-icon' />
                                                        : <img onClick={() => confirmDelete(user.id)} src={delete_icon} alt="Delete" className='delete-icon' />
                                                }
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