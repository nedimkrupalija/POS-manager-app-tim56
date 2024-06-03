import React, { useState, useEffect } from 'react';
import './CRUDUsers.css';
import Cookies from 'js-cookie';
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/delete.png'
import confirm_icon from '../../assets/confirm.png'
import close_icon from '../../assets/close.png'
import info_icon from '../../assets/info.png'
import error_icon from '../../assets/error.png'
import close_modal_icon from '../../assets/close-modal.png'
import choose_icon from '../../assets/choose.png'
import close_modal_icon from '../../assets/close-modal.png'
import choose_icon from '../../assets/choose.png'
import Home from '../Home/Home';
const CRUDUsers = () => {
    const [tableVisible, settableVisible] = useState(true);
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [locModalVisible, setLocModalVisible] = useState(false);
    const [locations, setLocations] = useState([]);
    const [locationId, setLocationId] = useState('');
    const apiUrl = import.meta.env.VITE_REACT_API_URL;

    const token = () => {
        return Cookies.get("jwt");
    }
    useEffect(() => {
        fetchUsers();
        fetchLocations();
        fetchLocations();
    }, []);

    const fetchUsers = async () => {
        try {
            const headers = {
                'Authorization': token()
            };
            const data = await fetchData('GET', `${apiUrl}/admin/users`, null, headers);
            setUsers(data);
        } catch (error) {
            setErrorMessage(error.message)
        }
    };
    const isDataValid = (username, password, phoneNumber, LocationId) => {
        if (username == '' || password == '' || phoneNumber == '' || LocationId == '') {
    const isDataValid = (username, password, phoneNumber, LocationId) => {
        if (username == '' || password == '' || phoneNumber == '' || LocationId == '') {
            setErrorMessage('All fields must be filled!')
            setInfoMessage('')
            return false;
        }
        if (isNaN(phoneNumber)) {
            setErrorMessage('Phone number must be a number!');
            setInfoMessage('');
            return false;
        }
        return true;

    }
    const createUser = async () => {
        const username = document.getElementById('usernameCreate').value;
        const password = document.getElementById('passwordCreate').value;
        const phoneNumber = document.getElementById('phoneCreate').value;
        const LocationId = document.getElementById('locationCreate').value;
        const role = 'user';
        try {
            if (isDataValid(username, password, phoneNumber, LocationId)) {
                const requestData = { username, password, phoneNumber, role, LocationId };
                const headers = {
                    'Authorization': token()
                };
                await fetchData('POST', `${apiUrl}/admin/users`, requestData, headers);
                setInfoMessage('User created')
                document.getElementById('usernameCreate').value = ''
                document.getElementById('passwordCreate').value = ''
                document.getElementById('phoneCreate').value = ''
                document.getElementById('locationCreate').value = ''
                setLocationId(null)
                setErrorMessage('')
                fetchUsers();
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    const confirmDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
        }
    };
    const fetchLocations = async () => {
        try {
            const headers = {
                'Authorization': token()
            };
            const data = await fetchData('GET', `${apiUrl}/location`, null, headers);
            setLocations(data);
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    const deleteUser = async (id) => {
        try {
            const headers = {
                'Authorization': token()
            };
            await fetchData('DELETE', `${apiUrl}/admin/users/${id}`, null, headers);
            setErrorMessage('')
            fetchUsers();
        } catch (error) {
            setErrorMessage(error.message)
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
            const extendedToken = response.headers.get('Authorization');
            console.log(extendedToken);
            if (extendedToken) {
                Cookies.set("jwt", extendedToken, { expires: 1 / 48 });

            }
            return data;
        } catch (error) {
            throw new Error(error.message || 'Error fetching data');
        }
    };

    const handleSaveClick = async (password) => {
        try {
            if (editingUser) {
                const id = editingUser.id;
                const username = document.getElementById('usernameEdit').value;
                const phoneNumber = document.getElementById('phoneEdit').value;
                const hasLocation = document.getElementById('locationEdit').value !== "not assigned";
                const locationValue = document.getElementById('locationEdit').value
                const LocationId = hasLocation ? locationValue : null;
                const role = document.getElementById('roleEdit').value;
                if (isDataValid(username, phoneNumber, LocationId)) {
                    const requestData = { username,password, phoneNumber, role, LocationId };
                    const headers = {
                        'Authorization': `${Cookies.get('jwt')}`,
                    };

                    await fetchData('PUT', `${apiUrl}/admin/users/${id}`, requestData, headers);
                    setErrorMessage('')
                    fetchUsers();
                    setEditingUser(null);
                }
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    return (
        <Home>
            <>
                <div className='list'>
                    <h2 className='users-title'>{tableVisible ? "USERS" : "CREATE NEW USER"}</h2>
                    <div className="buttons-container">
                        <button disabled={tableVisible} className={tableVisible ? 'buttons' : 'buttons1'} onClick={() => { settableVisible(true); fetchUsers(); setInfoMessage(''); setErrorMessage('') }}>LIST USERS</button>
                        <button disabled={!tableVisible} className={tableVisible ? 'buttons1' : 'buttons'} onClick={() => { settableVisible(false); setErrorMessage(''); setLocationId(null) }}>CREATE NEW</button>
                    </div>
                    {tableVisible && (
                        <>
                            {errorMessage && (
                                <div className="error-message-users">
                                    <img src={error_icon} alt='error' className='error-icon' />
                                    <span>{errorMessage}</span>
                                </div>
                            )}
                            <div className='table'>
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Phone Number</th>
                                            <th>Role</th>
                                            <th>Location ID</th>
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
                                                        <input id="phoneEdit" type="number" defaultValue={user.phoneNumber} className="editable-input" />
                                                    ) : (
                                                        user.phoneNumber
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
                                                    {editingUser === user ? (
                                                        <>
                                                            <input id="locationEdit" type="text" value={locationId || "not assigned"} onChange={(e) => setLocationId(e.target.value)} readOnly className="editable-input" />
                                                            <button className='buttons1' onClick={() => { setLocModalVisible(true); fetchLocations(); }}>Find Location</button>
                                                        </>
                                                    ) : (
                                                        user.LocationId || "not assigned"
                                                    )}

                                                </td>
                                                <td>
                                                    <div className='actions-containter'>
                                                        {
                                                            editingUser === user
                                                                ? <img onClick={() => handleSaveClick(user.password)} src={confirm_icon} alt="Confirm" className='confirm-icon' />
                                                                : <img onClick={() => { setEditingUser(user); setLocationId(user.LocationId) }} src={edit_icon} alt="Edit" className='edit-icon' />
                                                        }
                                                        {
                                                            editingUser === user
                                                                ? <img onClick={() => { setEditingUser(null); setLocationId(null); setErrorMessage(''); }} src={close_icon} alt="Close" className='close-icon' />
                                                                : <img onClick={() => confirmDelete(user.id)} src={delete_icon} alt="Delete" className='delete-icon' />
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> </>
                    )}
                </div>

                {!tableVisible && <div className='create'>
                    {infoMessage && (
                        <div className="info-message-users">
                            <img src={info_icon} alt='info' className='info-icon' />
                            <span>{infoMessage}</span>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="error-message-users">
                            <img src={error_icon} alt='error' className='error-icon' />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                    <div className='createFields'>
                        <label htmlFor="username" className='fields'>Username:</label>
                        <input type="text" id="usernameCreate" className="username-input" onChange={() => { setInfoMessage('') }} />
                        <br />
                        <label htmlFor="password" className='fields'>Password:</label>
                        <input type="password" id="passwordCreate" className="password-input" onChange={() => { setInfoMessage('') }} />
                        <br />
                        <label htmlFor="phone" className='fields'>Phone Number:</label>
                        <input type="text" id="phoneCreate" className="phone-input" onChange={() => { setInfoMessage('') }} />
                        <br />
                        <label htmlFor="location" className='fields'>Location:</label>
                        <div className="location-container">
                            <input
                                type="text"
                                readOnly
                                id="locationCreate"
                                className="location-id-input"
                                value={locationId}
                                onChange={(e) => setLocationId(e.target.value)}
                            />
                            <button className='find-loc-button' onClick={() => { setLocModalVisible(true); fetchLocations(); }}>Find Location</button>
                        </div>

                    </div>
                    <button className='button2' onClick={createUser}>CREATE</button>
                </div>
                }
                {locModalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <img src={close_modal_icon} onClick={() => setLocModalVisible(false)} alt="Close" className="close-modal-icon" />
                            <h2 className='select-loc-title'>SELECT LOCATION</h2>
                            <div className='table'>
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {locations.map(location => (
                                            <tr key={location.id}>
                                                <td>{location.id}</td>
                                                <td>{location.name}</td>
                                                <td>{location.adress}</td>
                                                <td><img onClick={() => { setLocationId(location.id); setLocModalVisible(false); setInfoMessage('') }} src={choose_icon} alt="Choose" className='choose-icon' /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </Home>
    );
};

export default CRUDUsers;