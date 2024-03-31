import React, { useState } from 'react';
import './CRUDUsers.css';
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/delete.png'

const CRUDUsers = () => {
    const [tableVisible, settableVisible] = useState(true);
    const [token, setToken] = useState(''); ///////////////////// OBRISAT

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/users', {
                headers: {
                    'Authorization': `${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogin = () => { ////////////////// OBRISAT
        const requestBody = { username: "amina", password: "test", role: "admin" }
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
            })
            .then(data => {
                console.log(data.token)
                setToken(data.token);
               // console.log("Token ", tokenn)
               /* const expiresIn = 30 * 60;
                Cookies.set('jwt', data.token, { expires: expiresIn, path: '/' });*/
            })
            .catch(error => {
            });
    };
    return (
        <>
        <button onClick={handleLogin}>Proba login</button> {/* OBRISAT */}
            <div className='list'>
                <h2 className='users-title'>{tableVisible ? "USERS" : "CREATE NEW USER"}</h2>
                <div className="buttons-container">
                    <button disabled={tableVisible} className={tableVisible ? 'buttons' : 'buttons1'} onClick={() => { settableVisible(true); fetchUsers(); }}>LIST USERS</button>
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
                                <td>tajra</td>
                                <td>060111333</td>
                                <td>tajra</td>
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
                                <td>amina</td>
                                <td>060111333</td>
                                <td>amina</td>
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

export default CRUDUsers;