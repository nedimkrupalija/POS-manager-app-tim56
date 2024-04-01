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
            const headers = {
                'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTI5MDQ4LCJleHAiOjE3MTE5MzA4NDh9.AG6q-SVM0Eb3UpqDEPf4lbyRErpZNTdcOzw0ZJ-9HkI`
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
                'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTI5MDQ4LCJleHAiOjE3MTE5MzA4NDh9.AG6q-SVM0Eb3UpqDEPf4lbyRErpZNTdcOzw0ZJ-9HkI`
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
                'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTI5MDQ4LCJleHAiOjE3MTE5MzA4NDh9.AG6q-SVM0Eb3UpqDEPf4lbyRErpZNTdcOzw0ZJ-9HkI`
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
                                                <img onClick={() => confirmDelete(user.id)} src={delete_icon} alt="Delete" className='delete-icon' />
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