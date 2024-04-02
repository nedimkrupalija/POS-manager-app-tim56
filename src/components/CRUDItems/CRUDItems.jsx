import React, { useState, useEffect } from 'react';
import './CRUDItems.css';
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/delete.png'
import confirm_icon from '../../assets/confirm.png'
import close_icon from '../../assets/close.png'
import info_icon from '../../assets/info.png'
import error_icon from '../../assets/error.png'

const CRUDItems = () => {
    const [tableVisible, settableVisible] = useState(true);
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /*useEffect(() => {
        console.log("Effecttt")
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const headers = {
                'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzEyMDAwMDgwLCJleHAiOjE3MTIwMDE4ODB9.OFuUtQUs-Mqtf_qNorkw-0_Ct6fD6h9HJdyBM7PXCUU`
            };
            const data = await fetchData('GET', 'http://localhost:3000/admin/users', null, headers);
            setUsers(data);
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    const createUser = async () => {
        const username = document.getElementById('usernameCreate').value;
        const password = document.getElementById('passwordCreate').value;
        const phoneNumber = document.getElementById('phoneCreate').value;
        const role = 'user';
        try {
            if (username == '' || password == '' || phoneNumber == '') {
                setErrorMessage('All fields must be filled!')
                setInfoMessage('')
            }
            else if (isNaN(phoneNumber)) {
                setErrorMessage('Phone number must be a number!');
                setInfoMessage('');
            }
            else {
                const requestData = { username, password, phoneNumber, role };
                const headers = {
                    'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzEyMDAwMDgwLCJleHAiOjE3MTIwMDE4ODB9.OFuUtQUs-Mqtf_qNorkw-0_Ct6fD6h9HJdyBM7PXCUU`
                };
                await fetchData('POST', 'http://localhost:3000/admin/users', requestData, headers);
                setInfoMessage('User created')
                document.getElementById('usernameCreate').value = ''
                document.getElementById('passwordCreate').value = ''
                document.getElementById('phoneCreate').value = ''
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

    const deleteUser = async (id) => {
        try {
            const headers = {
                'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzEyMDAwMDgwLCJleHAiOjE3MTIwMDE4ODB9.OFuUtQUs-Mqtf_qNorkw-0_Ct6fD6h9HJdyBM7PXCUU`
            };
            await fetchData('DELETE', `http://localhost:3000/admin/users/${id}`, null, headers);
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
            return data;
        } catch (error) {
            throw new Error(error.message || 'Error fetching data');
        }
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
                    'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzEyMDAwMDgwLCJleHAiOjE3MTIwMDE4ODB9.OFuUtQUs-Mqtf_qNorkw-0_Ct6fD6h9HJdyBM7PXCUU`,
                };

                await fetchData('PUT', `http://localhost:3000/admin/users/${id}`, requestData, headers);
                setErrorMessage('')
                fetchUsers();
                setEditingUser(null);
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    };*/

    return (
        <>
            <div className='list'>
                <h2 className='items-title'>{tableVisible ? "ITEMS" : "CREATE NEW ITEM"}</h2>
                <div className="buttons-container">
                    <button disabled={tableVisible} className={tableVisible ? 'buttons' : 'buttons1'} /*onClick={() => { settableVisible(true); fetchUsers(); setInfoMessage(''); setErrorMessage('') }}*/>LIST ITEMS</button>
                    <button disabled={!tableVisible} className={tableVisible ? 'buttons1' : 'buttons'} /*onClick={() => { settableVisible(false); setErrorMessage('') }}*/>CREATE NEW</button>
                </div>
                {tableVisible && (
                    <>
                        {errorMessage && (
                            <div className="error-message">
                                <img src={error_icon} alt='error' className='error-icon' />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                        <div className='table'>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Service</th>
                                        <th>BAR-code</th>
                                        <th>Measurement</th>
                                        <th>Purchase Price</th>
                                        <th>Selling Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/*{users.map(user => (
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
                                                            : <img onClick={() => setEditingUser(user)} src={edit_icon} alt="Edit" className='edit-icon' />
                                                    }
                                                    {
                                                        editingUser === user
                                                            ? <img onClick={() => setEditingUser(null)} src={close_icon} alt="Close" className='close-icon' />
                                                            : <img onClick={() => confirmDelete(user.id)} src={delete_icon} alt="Delete" className='delete-icon' />
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))}*/}
                                </tbody>
                            </table>
                        </div> </>
                )}
            </div>

            {!tableVisible && <div className='create'>
                {infoMessage && (
                    <div className="info-message">
                        <img src={info_icon} alt='info' className='info-icon' />
                        <span>{infoMessage}</span>
                    </div>
                )}
                {errorMessage && (
                    <div className="error-message">
                        <img src={error_icon} alt='error' className='error-icon' />
                        <span>{errorMessage}</span>
                    </div>
                )}
                <div className='createFields'>
                    <label htmlFor="product" className='fields'>Product:</label>
                    <input type="text" id="productCreate" className="product-input" placeholder="Product" onChange={() => {setInfoMessage('')}}/>
                    <br />
                    <label htmlFor="service" className='fields'>Service:</label>
                    <input type="text" id="serviceCreate" className="service-input" placeholder="Service" onChange={() => {setInfoMessage('')}}/>
                    <br />
                    <label htmlFor="barcode" className='fields'>BAR-code:</label>
                    <input type="text" id="barcodeCreate" className="barcode-input" placeholder="BAR-code" onChange={() => {setInfoMessage('')}}/>
                    <br />
                    <label htmlFor="measurement" className='fields'>Measurement:</label>
                    <input type="text" id="measurementCreate" className="measurement-input" placeholder="Measurement" onChange={() => {setInfoMessage('')}}/>
                    <br />
                    <label htmlFor="purchasePrice" className='fields'>Purchase Price:</label>
                    <input type="text" id="purchaseCreate" className="purchase-input" placeholder="Purchase Price" onChange={() => {setInfoMessage('')}}/>
                    <br />
                    <label htmlFor="sellingPrice" className='fields'>Selling Price:</label>
                    <input type="text" id="sellingCreate" className="selling-input" placeholder="Selling Price" onChange={() => {setInfoMessage('')}}/>
                </div>
                <button className='button2' onClick={createUser}>CREATE</button>
            </div>
            }
        </>
    );
};

export default CRUDItems;